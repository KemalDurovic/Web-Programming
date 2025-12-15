var PackageService = {
    init: function() {
        console.log('PackageService initialized');
        // Load destinations for dropdown when packages tab is shown
        this.setupTabListener();
    },

    setupTabListener: function() {
        // Load destinations when packages tab becomes active
        $(document).on('click', '.admin-tab', function() {
            const tabName = $(this).text().trim().toLowerCase();
            if (tabName === 'packages') {
                setTimeout(function() {
                    PackageService.loadDestinationsDropdown();
                }, 100);
            }
        });
    },

    loadDestinationsDropdown: function() {
        RestClient.get("destinations", function(response) {
            const select = $('#pkg-destination');
            if (select.length > 0) {
                select.empty();
                select.append('<option value="">Select Destination</option>');
                if (response && response.length > 0) {
                    response.forEach(function(dest) {
                        select.append(`<option value="${dest.id}">${dest.name}</option>`);
                    });
                    console.log('Destinations loaded into dropdown:', response.length);
                } else {
                    console.log('No destinations found');
                }
            } else {
                console.log('Destination dropdown not found in DOM');
            }
        }, function(error) {
            console.error("Error loading destinations for dropdown:", error);
        });
    },

    getAll: function(callback, errorCallback) {
        RestClient.get("packages", callback, errorCallback);
    },

    getById: function(id, callback, errorCallback) {
        RestClient.get("packages/" + id, callback, errorCallback);
    },

    create: function(data, callback, errorCallback) {
        RestClient.post("packages", data, callback, errorCallback);
    },

    addPackage: function(packageData) {
        console.log("Adding package:", packageData);
        
        const data = {
            destination_id: parseInt(packageData.destination_id),
            name: packageData.name,
            category: packageData.category,
            duration_days: parseInt(packageData.duration_days),
            duration_nights: parseInt(packageData.duration_nights),
            price: parseFloat(packageData.price),
            what_includes: packageData.features,
            tags: packageData.ribbon || null
        };

        console.log("Sending package data to API:", data);

        this.create(data, 
            function(response) {
                console.log("Package added successfully:", response);
                
                // Show success message
                $('#package-success').fadeIn().delay(3000).fadeOut();
                
                // Clear the form
                $('#package-form')[0].reset();
                
                // Reload the dropdown
                PackageService.loadDestinationsDropdown();
            }, 
            function(xhr, status, error) {
                console.error("Error adding package:", error);
                console.error("Status:", status);
                console.error("Response:", xhr.responseText);
                alert("Error adding package: " + (xhr.responseText || error));
            }
        );
    },

    update: function(id, data, callback, errorCallback) {
        RestClient.put("packages/" + id, data, callback, errorCallback);
    },

    delete: function(id, callback, errorCallback) {
        RestClient.delete("packages/" + id, {}, callback, errorCallback);
    },

    deletePackage: function(id) {
        if (!id) {
            console.error("Invalid package ID");
            return;
        }
        
        if (confirm('Are you sure you want to delete this package?')) {
            this.delete(id, 
                function(response) {
                    console.log("Package deleted:", response);
                    // Optionally reload packages list if you have one
                }, 
                function(xhr, status, error) {
                    console.error("Error deleting package:", error);
                    alert("Error deleting package: " + (xhr.responseText || error));
                }
            );
        }
    },

    loadPackagesList: function() {
        console.log("loadPackagesList called but disabled");
    }
};

// Initialize Package Service when document is ready
$(document).ready(function() {
    if (typeof PackageService !== 'undefined') {
        PackageService.init();
        console.log('PackageService initialized on document ready');
        
        // Handle package form submission
        $(document).on('submit', '#package-form', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log("Package form submitted!");
            
            // Parse duration to get days and nights
            const durationText = $('#pkg-duration').val(); // e.g., "7 Days / 6 Nights"
            const durationMatch = durationText.match(/(\d+)\s*Days?\s*\/\s*(\d+)\s*Nights?/i);
            
            let durationDays = 7;
            let durationNights = 6;
            
            if (durationMatch) {
                durationDays = parseInt(durationMatch[1]);
                durationNights = parseInt(durationMatch[2]);
            }
            
            const packageData = {
                destination_id: $('#pkg-destination').val(),
                name: $('#pkg-name').val(),
                category: $('#pkg-category').val(),
                duration_days: durationDays,
                duration_nights: durationNights,
                price: $('#pkg-price').val(),
                ribbon: $('#pkg-ribbon').val(),
                features: $('#pkg-features').val()
            };
            
            console.log("Package form data:", packageData);
            
            // Validate destination is selected
            if (!packageData.destination_id) {
                alert("Please select a destination for this package");
                return false;
            }
            
            PackageService.addPackage(packageData);
            
            return false;
        });
    }
});var PackageService = {
    init: function() {
        console.log('PackageService initialized');
        // Load destinations for dropdown
        this.loadDestinationsDropdown();
    },

    loadDestinationsDropdown: function() {
        RestClient.get("destinations", function(response) {
            const select = $('#pkg-destination');
            if (select.length > 0) {
                select.empty();
                select.append('<option value="">Select Destination</option>');
                if (response && response.length > 0) {
                    response.forEach(function(dest) {
                        select.append(`<option value="${dest.id}">${dest.name}</option>`);
                    });
                }
            }
        }, function(error) {
            console.error("Error loading destinations for dropdown:", error);
        });
    },

    getAll: function(callback, errorCallback) {
        RestClient.get("packages", callback, errorCallback);
    },

    getById: function(id, callback, errorCallback) {
        RestClient.get("packages/" + id, callback, errorCallback);
    },

    addPackage: function(packageData) {
        console.log("Adding package:", packageData);
        
        const data = {
            destination_id: parseInt(packageData.destination_id),
            name: packageData.name,
            category: packageData.category,
            duration_days: parseInt(packageData.duration_days),
            duration_nights: parseInt(packageData.duration_nights),
            price: parseFloat(packageData.price),
            what_includes: packageData.features,
            tags: packageData.ribbon || null
        };

        console.log("Sending package data to API:", data);

        RestClient.post("packages", data, 
            function(response) {
                console.log("Package added successfully:", response);
                
                // Show success message
                $('#package-success').fadeIn().delay(3000).fadeOut();
                
                // Clear the form
                $('#package-form')[0].reset();
                
                // Reload the dropdown
                PackageService.loadDestinationsDropdown();
            }, 
            function(xhr, status, error) {
                console.error("Error adding package:", error);
                console.error("Status:", status);
                console.error("Response:", xhr.responseText);
                alert("Error adding package: " + (xhr.responseText || error));
            }
        );
    },

    update: function(id, data, callback, errorCallback) {
        RestClient.put("packages/" + id, data, callback, errorCallback);
    },

    delete: function(id, callback, errorCallback) {
        RestClient.delete("packages/" + id, {}, callback, errorCallback);
    },

    deletePackage: function(id) {
        if (!id) {
            console.error("Invalid package ID");
            return;
        }
        
        if (confirm('Are you sure you want to delete this package?')) {
            PackageService.delete(id, 
                function(response) {
                    console.log("Package deleted:", response);
                    PackageService.loadPackagesList();
                }, 
                function(xhr, status, error) {
                    console.error("Error deleting package:", error);
                    alert("Error deleting package: " + (xhr.responseText || error));
                }
            );
        }
    },

    loadPackagesList: function() {
        console.log("loadPackagesList called but disabled");
    }
};

// Initialize Package Service when document is ready
$(document).ready(function() {
    if (typeof PackageService !== 'undefined') {
        PackageService.init();
        console.log('PackageService initialized on document ready');
        
        // Handle package form submission
        $(document).on('submit', '#package-form', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log("Package form submitted!");
            
            // Parse duration to get days and nights
            const durationText = $('#pkg-duration').val(); // e.g., "7 Days / 6 Nights"
            const durationMatch = durationText.match(/(\d+)\s*Days?\s*\/\s*(\d+)\s*Nights?/i);
            
            let durationDays = 7;
            let durationNights = 6;
            
            if (durationMatch) {
                durationDays = parseInt(durationMatch[1]);
                durationNights = parseInt(durationMatch[2]);
            }
            
            const packageData = {
                destination_id: $('#pkg-destination').val(),
                name: $('#pkg-name').val(),
                category: $('#pkg-category').val(),
                duration_days: durationDays,
                duration_nights: durationNights,
                price: $('#pkg-price').val(),
                ribbon: $('#pkg-ribbon').val(),
                features: $('#pkg-features').val()
            };
            
            console.log("Package form data:", packageData);
            
            // Validate destination is selected
            if (!packageData.destination_id) {
                alert("Please select a destination for this package");
                return false;
            }
            
            PackageService.addPackage(packageData);
            
            return false;
        });
    }
});