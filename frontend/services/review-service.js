var ReviewService = {

    init: function () {
        this.loadReviews();
    },

    loadReviews: function () {
        RestClient.get("reviews", function (response) {
            let columns = [
                { data: "user_id", title: "User ID" },
                { data: "destination_id", title: "Destination ID" },
                { data: "package_id", title: "Package ID" },
                { data: "rating", title: "Rating" },
                { data: "title", title: "Title" },
                { data: "comment", title: "Comment" },
                { data: "is_verified", title: "Verified" },
                { data: "created_at", title: "Created At" },
                {
                    data: null,
                    title: "Actions",
                    render: function (row) {
                        return `
                            <button class="btn btn-primary btn-sm" onclick="ReviewService.editReview(${row.id})">Edit</button>
                            <button class="btn btn-danger btn-sm" onclick="ReviewService.deleteReview(${row.id})">Delete</button>
                        `;
                    }
                }
            ];

            Utils.datatable("reviews-table", columns, response);
        });
    },

    loadReviewsByUser: function (userId) {
        RestClient.get("reviews?user_id=" + userId, function (response) {
            let columns = [
                { data: "destination_id", title: "Destination ID" },
                { data: "package_id", title: "Package ID" },
                { data: "rating", title: "Rating" },
                { data: "title", title: "Title" },
                { data: "comment", title: "Comment" },
                { data: "created_at", title: "Created At" },
                {
                    data: null,
                    title: "Actions",
                    render: function (row) {
                        return `
                            <button class="btn btn-primary btn-sm" onclick="ReviewService.editReview(${row.id})">Edit</button>
                            <button class="btn btn-danger btn-sm" onclick="ReviewService.deleteReview(${row.id})">Delete</button>
                        `;
                    }
                }
            ];

            Utils.datatable("reviews-table", columns, response);
        });
    },

    createReview: function () {
        // Get form values
        let name = $("#name").val();
        let email = $("#email").val();
        let subject = $("#subject").val();
        let message = $("#message").val();
        
        // Validation
        if (!name || !email || !subject || !message) {
            toastr.error("Please fill in all fields!");
            return;
        }

        let data = {
            user_id: 1, // Hardcoded for now - update based on logged-in user
            rating: 5, // Default rating
            title: subject,
            comment: message + " - From: " + name + " (" + email + ")"
        };
        
        // Remove any undefined, null, or empty string values
        Object.keys(data).forEach(key => {
            if (data[key] === undefined || data[key] === null || data[key] === '') {
                delete data[key];
            }
        });

        RestClient.post("reviews", data, function (response) {
            toastr.success("Your message has been sent successfully!");
            // Clear form
            $("#contactForm")[0].reset();
        }, function(error) {
            toastr.error("Failed to send message. Please try again.");
        });
    },

    editReview: function (id) {
        RestClient.get("reviews/" + id, function (response) {
            $("#review_id").val(response.id);
            $("#user_id").val(response.user_id);
            $("#destination_id").val(response.destination_id);
            $("#package_id").val(response.package_id);
            $("#rating").val(response.rating);
            $("#title").val(response.title);
            $("#comment").val(response.comment);
            $("#reviewModal").modal("show");
        });
    },

    updateReview: function () {
        let id = $("#review_id").val();
        let data = {
            user_id: $("#user_id").val(),
            destination_id: $("#destination_id").val(),
            package_id: $("#package_id").val(),
            rating: $("#rating").val(),
            title: $("#title").val(),
            comment: $("#comment").val()
        };

        RestClient.put("reviews/" + id, data, function () {
            toastr.success("Review updated successfully!");
            ReviewService.loadReviews();
            $("#reviewModal").modal("hide");
        });
    },

    deleteReview: function (id) {
        if (confirm("Are you sure you want to delete this review?")) {
            RestClient.delete("reviews/" + id, {}, function () {
                toastr.success("Review deleted successfully!");
                ReviewService.loadReviews();
            });
        }
    }
};