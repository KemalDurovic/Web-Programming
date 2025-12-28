var BookingService = {

    init: function () {
        this.setupModalHandlers();
    },

    setupModalHandlers: function () {
        $(document).on('click', '.close-modal', function() {
            $('#bookingModal').fadeOut();
        });
        
        $(document).on('click', '.modal-overlay', function(e) {
            if (e.target === this) {
                $('#bookingModal').fadeOut();
            }
        });

        $(document).on('click', '#submitBooking', function() {
            BookingService.createBooking();
        });

        $(document).on('change', '#number_of_people', function() {
            let basePrice = parseFloat($('#package_price_display').text().replace('$', '').replace(',', ''));
            BookingService.calculateTotalPrice(basePrice);
        });
    },

    loadBookings: function () {
        RestClient.get("bookings", function (response) {
            if (typeof Utils !== 'undefined' && typeof Utils.datatable === 'function') {
                let columns = [
                    { data: "user_id", title: "User ID" },
                    { data: "package_id", title: "Package ID" },
                    { data: "booking_date", title: "Booking Date" },
                    { data: "number_of_people", title: "People" },
                    { data: "total_price", title: "Total Price" },
                    { data: "status", title: "Status" },
                    { data: "created_at", title: "Created At" },
                    {
                        data: null,
                        title: "Actions",
                        render: function (row) {
                            return `
                                <button class="btn btn-primary btn-sm" onclick="BookingService.editBooking(${row.id})">Edit</button>
                                <button class="btn btn-danger btn-sm" onclick="BookingService.deleteBooking(${row.id})">Delete</button>
                            `;
                        }
                    }
                ];

                Utils.datatable("bookings-table", columns, response);
            } else {
                console.log("Bookings loaded:", response);
            }
        });
    },

    loadBookingsByUser: function (userId) {
        RestClient.get("bookings?user_id=" + userId, function (response) {
            if (typeof Utils !== 'undefined' && typeof Utils.datatable === 'function') {
                let columns = [
                    { data: "package_id", title: "Package" },
                    { data: "booking_date", title: "Date" },
                    { data: "number_of_people", title: "People" },
                    { data: "total_price", title: "Price" },
                    { data: "status", title: "Status" },
                    {
                        data: null,
                        title: "Actions",
                        render: function (row) {
                            return `
                                <button class="btn btn-danger btn-sm" onclick="BookingService.deleteBooking(${row.id})">Cancel</button>
                            `;
                        }
                    }
                ];

                Utils.datatable("bookings-table", columns, response);
            } else {
                console.log("User bookings loaded:", response);
            }
        });
    },

    showBookingModal: function (packageId, packageName, packagePrice) {
        // Store package info
        $('#booking_package_id').val(packageId);
        $('#package_name_display').text(packageName);
        $('#booking_id').val('');
        $('#booking_date').val('');
        $('#number_of_people').val('1');
        $('#special_requests').val('');
        
        BookingService.calculateTotalPrice(packagePrice);
        
        $('#bookingModal').fadeIn();
    },

    calculateTotalPrice: function (basePrice) {
        let numberOfPeople = parseInt($('#number_of_people').val()) || 1;
        let totalPrice = basePrice * numberOfPeople;
        $('#total_price_display').text('$' + totalPrice.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}));
        $('#booking_total_price').val(totalPrice.toFixed(2));
    },

    createBooking: function () {
        let currentUser = Utils.getCurrentUser();
        if (!currentUser) {
            toastr.error("Please login to make a booking!");
            setTimeout(function() {
                window.location.hash = "#login";
            }, 1500);
            return;
        }

        let bookingDate = $('#booking_date').val();
        let numberOfPeople = $('#number_of_people').val();
        let specialRequests = $('#special_requests').val();
        let packageId = $('#booking_package_id').val();
        let totalPrice = $('#booking_total_price').val();

        // Validation
        if (!bookingDate) {
            toastr.error("Please select a booking date!");
            return;
        }
        if (!numberOfPeople || numberOfPeople < 1) {
            toastr.error("Number of people must be at least 1!");
            return;
        }

        let data = {
            user_id: currentUser.id,
            package_id: parseInt(packageId),
            booking_date: bookingDate,
            number_of_people: parseInt(numberOfPeople),
            total_price: parseFloat(totalPrice),
            status: 'pending',
            special_requests: specialRequests || ''
        };

        console.log("Sending booking data:", data);

        RestClient.post("bookings", data, function (response) {
            toastr.success("Booking created successfully! We'll contact you soon.");
            $('#bookingModal').fadeOut();
            $('#booking_id').val('');
            $('#booking_package_id').val('');
            $('#booking_date').val('');
            $('#number_of_people').val('1');
            $('#special_requests').val('');
            $('#booking_total_price').val('');
        }, function(error) {
            console.error("Booking error:", error);
            if (error.responseJSON && error.responseJSON.message) {
                toastr.error(error.responseJSON.message);
            } else {
                toastr.error("Failed to create booking. Please try again.");
            }
        });
    },

    editBooking: function (id) {
        RestClient.get("bookings/" + id, function (response) {
            $('#booking_id').val(response.id);
            $('#booking_package_id').val(response.package_id);
            $('#booking_date').val(response.booking_date);
            $('#number_of_people').val(response.number_of_people);
            $('#booking_total_price').val(response.total_price);
            $('#special_requests').val(response.special_requests || '');
            
            // Calculate and display total
            let basePrice = parseFloat(response.total_price) / parseInt(response.number_of_people);
            $('#package_price_display').text('$' + basePrice.toFixed(2));
            $('#total_price_display').text('$' + parseFloat(response.total_price).toFixed(2));
            
            $('#bookingModal').fadeIn();
        });
    },

    updateBooking: function () {
        let id = $('#booking_id').val();
        let data = {
            user_id: Utils.getCurrentUser().id,
            package_id: $('#booking_package_id').val(),
            booking_date: $('#booking_date').val(),
            number_of_people: $('#number_of_people').val(),
            total_price: $('#booking_total_price').val(),
            special_requests: $('#special_requests').val()
        };

        RestClient.put("bookings/" + id, data, function () {
            toastr.success("Booking updated successfully!");
            BookingService.loadBookings();
            $('#bookingModal').fadeOut();
        });
    },

    deleteBooking: function (id) {
        if (confirm("Are you sure you want to cancel this booking?")) {
            RestClient.delete("bookings/" + id, {}, function () {
                toastr.success("Booking cancelled successfully!");
                BookingService.loadBookings();
            });
        }
    }
};