var DestinationService = {
    destinations: {},

    init: function() {
        this.setupModalHandlers();
        this.loadDestinationsFromDB();
    },

    setupModalHandlers: function() {
        // Close button handler
        $(document).on('click', '#destinationModal .close-modal', function(e) {
            e.stopPropagation();
            $('#destinationModal').fadeOut();
        });
        
        // Click outside modal to close
        $(document).on('click', '#destinationModal.modal-overlay', function(e) {
            if (e.target === this) {
                $('#destinationModal').fadeOut();
            }
        });
    },

    loadDestinationsFromDB: function() {
        RestClient.get("destinations", function(response) {
            console.log("Destinations loaded from database:", response);
            DestinationService.renderDestinations(response);
        }, function(error) {
            console.error("Error loading destinations:", error);
            toastr.error("Failed to load destinations");
        });
    },

    renderDestinations: function(destinations) {
        const grid = $('.destinations-grid');
        grid.empty();

        if (!destinations || destinations.length === 0) {
            grid.html('<p style="text-align: center; padding: 40px;">No destinations available</p>');
            return;
        }

        // Remove duplicates, keep only the latest one (highest ID)
        const uniqueDestinations = {};
        destinations.forEach(function(dest) {
            const name = dest.name.toLowerCase().trim();
            if (!uniqueDestinations[name] || dest.id > uniqueDestinations[name].id) {
                uniqueDestinations[name] = dest;
            }
        });

        // Convert back to array
        const filteredDestinations = Object.values(uniqueDestinations);

        filteredDestinations.forEach(function(dest) {
            const imageUrl = dest.image_url || 'https://via.placeholder.com/600x400?text=No+Image';
            const badge = dest.badge || 'Standard';
            const price = dest.price_from || 0;

            const card = `
                <div class="destination-card">
                    <div class="destination-image">
                        <img src="${imageUrl}" alt="${dest.name}" onerror="this.src='https://via.placeholder.com/600x400?text=No+Image'">
                        <div class="destination-badge">${badge}</div>
                    </div>
                    <div class="destination-content">
                        <h3>${dest.name}</h3>
                        <p class="destination-location">📍 ${dest.location || dest.country || ''}</p>
                        <p class="destination-description">${dest.description ? dest.description.substring(0, 100) + '...' : 'Explore this amazing destination'}</p>
                        <div class="destination-footer">
                            <span class="destination-price">From €${parseFloat(price).toLocaleString()}</span>
                            <button class="btn-secondary" onclick="event.preventDefault(); event.stopPropagation(); DestinationService.showDestinationModal(${dest.id})">Explore</button>
                        </div>
                    </div>
                </div>
            `;
            grid.append(card);
        });
    },

    showDestinationModal: function(destinationId) {
        // Load destination details
        RestClient.get("destinations/" + destinationId, function(dest) {
            $('#modal_destination_name').text(dest.name);
            $('#modal_destination_location').text(dest.location || dest.country || '');
            $('#modal_destination_image').attr('src', dest.image_url || 'https://via.placeholder.com/600x400');
            $('#modal_destination_description').text(dest.description || 'No description available');

            // Clear highlights section (we'll use packages instead)
            $('#modal_destination_highlights').empty();

            // Load packages for this destination
            DestinationService.loadPackagesForDestination(destinationId);

            $('#destinationModal').fadeIn();
        }, function(error) {
            console.error("Error loading destination:", error);
            toastr.error("Failed to load destination details");
        });
    },

    loadPackagesForDestination: function(destinationId) {
        RestClient.get("packages", function(packages) {
            console.log("All packages:", packages);
            console.log("Looking for packages with destination_id:", destinationId);
            
            // Filter packages by destination_id
            const destPackages = packages.filter(pkg => pkg.destination_id == destinationId);
            console.log("Filtered packages:", destPackages);

            const packagesContainer = $('#modal_packages_list');
            
            if (!packagesContainer.length) {
                console.error("Package container #modal_packages_list not found in modal!");
                return;
            }

            if (destPackages.length === 0) {
                packagesContainer.html(`
                    <div style="text-align: center; padding: 40px;">
                        <p style="color: #666; margin-bottom: 20px;">No packages available for this destination yet.</p>
                        <p style="color: #999; font-size: 14px;">Check back soon for exciting travel packages!</p>
                    </div>
                `);
                return;
            }

            const packagesHtml = destPackages.map(pkg => `
                <div class="package-item" style="border: 1px solid #ddd; border-radius: 10px; padding: 20px; margin-bottom: 20px; background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <div class="package-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                        <h4 style="margin: 0; color: #2c5f8d; font-size: 20px;">${pkg.name}</h4>
                        <span class="package-price-tag" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 10px 20px; border-radius: 25px; font-weight: bold; font-size: 18px;">€${parseFloat(pkg.price).toLocaleString()}</span>
                    </div>
                    <p class="package-duration" style="color: #666; margin: 10px 0; font-size: 16px;">
                        <strong>📅 Duration:</strong> ${pkg.duration_days} Days / ${pkg.duration_nights} Nights
                    </p>
                    <p class="package-category" style="color: #666; margin: 10px 0; font-size: 16px;">
                        <strong>🏷️ Category:</strong> ${pkg.category || 'Standard'}
                    </p>
                    ${pkg.tags ? `<span class="package-tag" style="display: inline-block; background: #ffd700; color: #333; padding: 6px 15px; border-radius: 20px; font-size: 13px; font-weight: bold; margin: 10px 0;">⭐ ${pkg.tags}</span>` : ''}
                    <div class="package-features" style="margin: 15px 0; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                        <strong style="color: #2c5f8d; font-size: 16px;">✨ What's Included:</strong>
                        <p style="margin: 10px 0; color: #555; line-height: 1.6;">${pkg.what_includes || 'Tour package includes various activities and services'}</p>
                    </div>
                    <button class="btn-primary full-width" onclick="BookingService.showBookingModal(${pkg.id}, '${pkg.name.replace(/'/g, "\\'")}', ${pkg.price})" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 15px; border-radius: 8px; cursor: pointer; font-size: 18px; font-weight: bold; width: 100%; margin-top: 15px; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                        🎫 Book This Trip
                    </button>
                </div>
            `).join('');

            packagesContainer.html(packagesHtml);
        }, function(error) {
            console.error("Error loading packages:", error);
            $('#modal_packages_list').html('<p style="color: red; text-align: center; padding: 20px;">❌ Error loading packages. Please try again.</p>');
        });
    },

    addDestination: function(destinationData) {
        console.log("Adding destination:", destinationData);
        
        const data = {
            name: destinationData.name,
            location: destinationData.location,
            country: destinationData.location,
            description: destinationData.description,
            image_url: destinationData.image,
            badge: destinationData.badge,
            price_from: parseFloat(destinationData.price)
        };

        RestClient.post("destinations", data, 
            function(response) {
                console.log("Destination added successfully:", response);
                $('#destination-success').fadeIn().delay(3000).fadeOut();
                $('#destination-form')[0].reset();
                DestinationService.loadDestinationsFromDB();
            }, 
            function(xhr, status, error) {
                console.error("Error adding destination:", error);
                alert("Error adding destination: " + (xhr.responseText || error));
            }
        );
    },

    loadDestinationsList: function() {
        RestClient.get("destinations", function(response) {
            const destinationsList = $('#destinations-list');
            destinationsList.empty();
            
            if (response && response.length > 0) {
                response.forEach(function(dest) {
                    const imageUrl = dest.image_url || 'https://via.placeholder.com/600x400?text=No+Image';
                    const badgeClass = dest.badge ? dest.badge.toLowerCase() : 'default';
                    const price = dest.price_from || 0;
                    
                    const destCard = `
                        <div class="item-card" style="border: 1px solid #ddd; border-radius: 8px; overflow: hidden; background: white;">
                            <img src="${imageUrl}" alt="${dest.name}" style="width: 100%; height: 200px; object-fit: cover;" onerror="this.src='https://via.placeholder.com/600x400?text=No+Image'">
                            <div class="item-info" style="padding: 15px;">
                                <h3 style="margin: 10px 0;">${dest.name}</h3>
                                <p style="color: #666; margin: 5px 0;">${dest.location || dest.country || ''}</p>
                                <span class="badge badge-${badgeClass}" style="display: inline-block; padding: 5px 10px; background: #e0e0e0; border-radius: 4px; font-size: 12px; margin: 10px 0;">${dest.badge || 'Standard'}</span>
                                <p class="price" style="font-weight: bold; color: #2c5f8d; margin: 10px 0;">From €${parseFloat(price).toLocaleString()}</p>
                                <button class="btn-danger" onclick="DestinationService.deleteDestination(${dest.id})" style="background: #dc3545; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Delete</button>
                            </div>
                        </div>
                    `;
                    destinationsList.append(destCard);
                });
            } else {
                destinationsList.html('<p style="text-align: center; padding: 20px;">No destinations found.</p>');
            }
        }, function(xhr, status, error) {
            console.error("Error loading destinations:", error);
            $('#destinations-list').html('<p style="color: red; text-align: center; padding: 20px;">Error loading destinations. Please try again.</p>');
        });
    },

    deleteDestination: function(id) {
        if (!id) {
            console.error("Invalid destination ID");
            return;
        }
        
        if (confirm('Are you sure you want to delete this destination?')) {
            RestClient.delete("destinations/" + id, function(response) {
                console.log("Destination deleted:", response);
                DestinationService.loadDestinationsList();
                DestinationService.loadDestinationsFromDB();
            }, function(xhr, status, error) {
                console.error("Error deleting destination:", error);
                alert("Error deleting destination: " + (xhr.responseText || error));
            });
        }
    }
};

$(document).ready(function() {
    if (typeof DestinationService !== 'undefined') {
        DestinationService.init();
        console.log('DestinationService initialized');
        
        // Handle destination form submission
        $(document).on('submit', '#destination-form', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const destinationData = {
                name: $('#dest-name').val(),
                location: $('#dest-location').val(),
                badge: $('#dest-category').val(),
                price: $('#dest-price').val(),
                image: $('#dest-image').val(),
                description: $('#dest-description').val()
            };
            
            DestinationService.addDestination(destinationData);
            return false;
        });
    }
});