var PackageService = {
    init: function() {
        console.log('PackageService initialized');
        this.setupTabListener();
        this.loadPackagesFromDB(); // Load packages on init
        this.setupCategoryFilters();
    },

    setupTabListener: function() {
        $(document).on('click', '.admin-tab', function() {
            const tabName = $(this).text().trim().toLowerCase();
            if (tabName === 'packages') {
                setTimeout(function() {
                    PackageService.loadDestinationsDropdown();
                }, 100);
            }
        });
    },

    setupCategoryFilters: function() {
        // Handle package category filter tabs
        $(document).on('click', '.package-tab', function() {
            $('.package-tab').removeClass('active');
            $(this).addClass('active');
            
            const category = $(this).data('category');
            PackageService.filterPackagesByCategory(category);
        });
    },

    filterPackagesByCategory: function(category) {
        const cards = $('.packages-grid .package-card');
        
        if (category === 'all') {
            cards.fadeIn();
        } else {
            cards.each(function() {
                const cardCategory = $(this).data('category');
                if (cardCategory === category) {
                    $(this).fadeIn();
                } else {
                    $(this).fadeOut();
                }
            });
        }
    },

    loadPackagesFromDB: function() {
        RestClient.get("packages", function(packages) {
            console.log("Packages loaded from database:", packages);
            PackageService.renderPackages(packages);
        }, function(error) {
            console.error("Error loading packages:", error);
            toastr.error("Failed to load packages");
        });
    },

    renderPackages: function(packages) {
        const grid = $('.packages-grid');
        grid.empty();

        if (!packages || packages.length === 0) {
            grid.html('<p style="text-align: center; padding: 40px; grid-column: 1/-1;">No packages available</p>');
            return;
        }

        // Remove duplicates, keep only the latest one (highest ID)
        const uniquePackages = {};
        packages.forEach(function(pkg) {
            const name = pkg.name.toLowerCase().trim();
            if (!uniquePackages[name] || pkg.id > uniquePackages[name].id) {
                uniquePackages[name] = pkg;
            }
        });

        // Convert back to array
        const filteredPackages = Object.values(uniquePackages);

        filteredPackages.forEach(function(pkg) {
            const icon = PackageService.getCategoryIcon(pkg.category);
            const ribbon = pkg.tags || '';
            const categoryClass = (pkg.category || 'adventure').toLowerCase().replace(/\s+/g, '-').replace('&', 'and');

            const card = `
                <div class="package-card" data-category="${categoryClass}">
                    ${ribbon ? `<div class="package-ribbon">${ribbon}</div>` : ''}
                    <div class="package-icon">${icon}</div>
                    <h3>${pkg.name}</h3>
                    <p class="package-duration">${pkg.duration_days} Days / ${pkg.duration_nights} Nights</p>
                    <ul class="package-features">
                        ${PackageService.formatFeatures(pkg.what_includes)}
                    </ul>
                    <div class="package-price">
                        <span class="price-amount"></span>
                        <span class="price-label"></span>
                    </div>
                    <button class="btn-primary full-width" onclick="BookingService.showBookingModal(${pkg.id}, '${pkg.name.replace(/'/g, "\\'")}', 0)">Book Now</button>
                </div>
            `;
            grid.append(card);
        });
    },

    getCategoryIcon: function(category) {
        const icons = {
            'Adventure': '🏔️',
            'Beach': '🏖️',
            'Winter': '❄️',
            'Cultural': '🏛️',
            'Luxury': '✨',
            'City & Night life': '🌃'
        };
        return icons[category] || '🌍';
    },

    formatFeatures: function(features) {
        if (!features) return '<li>✓ Various activities included</li>';
        
        // Split by newlines and format
        const featureList = features.split('\n')
            .filter(f => f.trim())
            .map(f => {
                // Remove any existing checkmarks and clean up
                let cleaned = f.replace(/^[✓✔]/g, '').trim();
                return `<li>✓ ${cleaned}</li>`;
            })
            .join('');
        
        return featureList || '<li>✓ Various activities included</li>';
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
            what_includes: packageData.features,
            tags: packageData.ribbon || null
        };

        console.log("Sending package data to API:", data);

        this.create(data, 
            function(response) {
                console.log("Package added successfully:", response);
                $('#package-success').fadeIn().delay(3000).fadeOut();
                $('#package-form')[0].reset();
                PackageService.loadDestinationsDropdown();
                PackageService.loadPackagesFromDB(); // Reload packages
            }, 
            function(xhr, status, error) {
                console.error("Error adding package:", error);
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
                    PackageService.loadPackagesFromDB(); // Reload packages
                }, 
                function(xhr, status, error) {
                    console.error("Error deleting package:", error);
                    alert("Error deleting package: " + (xhr.responseText || error));
                }
            );
        }
    },

    loadPackagesList: function() {
        RestClient.get("packages", function(response) {
            const packagesList = $('#packages-list');
            packagesList.empty();
            
            if (response && response.length > 0) {
                response.forEach(function(pkg) {
                    const ribbon = pkg.tags || 'Standard';
                    
                    const pkgCard = `
                        <div class="item-card" style="border: 1px solid #ddd; border-radius: 8px; overflow: hidden; background: white; padding: 20px;">
                            <div class="item-info">
                                <h3 style="margin: 10px 0;">${pkg.name}</h3>
                                <p style="color: #666; margin: 5px 0;"><strong>Category:</strong> ${pkg.category || 'N/A'}</p>
                                <p style="color: #666; margin: 5px 0;"><strong>Duration:</strong> ${pkg.duration_days} Days / ${pkg.duration_nights} Nights</p>
                                <span class="badge" style="display: inline-block; padding: 5px 10px; background: #ffd700; border-radius: 4px; font-size: 12px; margin: 10px 0;">${ribbon}</span>
                                <div style="margin: 10px 0; padding: 10px; background: #f8f9fa; border-radius: 5px;">
                                    <strong>Features:</strong>
                                    <p style="margin: 5px 0; font-size: 14px;">${pkg.what_includes || 'N/A'}</p>
                                </div>
                                <button class="btn-danger" onclick="PackageService.deletePackage(${pkg.id})" style="background: #dc3545; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Delete</button>
                            </div>
                        </div>
                    `;
                    packagesList.append(pkgCard);
                });
            } else {
                packagesList.html('<p style="text-align: center; padding: 20px;">No packages found.</p>');
            }
        }, function(xhr, status, error) {
            console.error("Error loading packages:", error);
            $('#packages-list').html('<p style="color: red; text-align: center; padding: 20px;">Error loading packages. Please try again.</p>');
        });
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
            
            const durationText = $('#pkg-duration').val();
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
                ribbon: $('#pkg-ribbon').val(),
                features: $('#pkg-features').val()
            };
            
            console.log("Package form data:", packageData);
            
            if (!packageData.destination_id) {
                alert("Please select a destination for this package");
                return false;
            }
            
            PackageService.addPackage(packageData);
            
            return false;
        });
    }
});