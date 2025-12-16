$(document).ready(function() {
    loadDestinations();
    loadPackages();

    $("#destination-form").on("submit", function(e) {
        e.preventDefault();
        
        const data = {
            name: $("#dest-name").val(),
            location: $("#dest-location").val(),
            country: $("#dest-location").val(), 
            badge: $("#dest-category").val().toLowerCase(),
            price_from: parseFloat($("#dest-price").val()),
            image_url: $("#dest-image").val(),
            description: $("#dest-description").val()
        };

        console.log("Sending destination data:", data);

        DestinationService.create(data, 
            function(response) {
                console.log("Destination created:", response);
                showSuccessMessage('destination-success');
                $("#destination-form")[0].reset();
                loadDestinations();
            },
            function(error) {
                console.error("Error creating destination:", error);
                alert('Error: ' + (error.responseJSON?.message || 'Failed to add destination'));
            }
        );
    });

    $("#package-form").on("submit", function(e) {
        e.preventDefault();
        
        const durationText = $("#pkg-duration").val();
        const durationMatch = durationText.match(/(\d+)\s*Days?\s*\/\s*(\d+)\s*Nights?/i);
        
        let duration_days = null;
        let duration_nights = null;
        
        if (durationMatch) {
            duration_days = parseInt(durationMatch[1]);
            duration_nights = parseInt(durationMatch[2]);
        }

        const featuresText = $("#pkg-features").val();
        const features = featuresText.split('\n').filter(f => f.trim() !== '');

        const data = {
            name: $("#pkg-name").val(),
            category: $("#pkg-category").val(),
            duration_days: duration_days,
            duration_nights: duration_nights,
            price: parseFloat($("#pkg-price").val()),
            what_includes: features.join(', '),
            tags: $("#pkg-ribbon").val() || null,
            destination_id: 1 
        };

        console.log("Sending package data:", data);

        PackageService.create(data,
            function(response) {
                console.log("Package created:", response);
                showSuccessMessage('package-success');
                $("#package-form")[0].reset();
                loadPackages();
            },
            function(error) {
                console.error("Error creating package:", error);
                alert('Error: ' + (error.responseJSON?.message || 'Failed to add package'));
            }
        );
    });
});

function showSuccessMessage(elementId) {
    const element = document.getElementById(elementId);
    element.style.display = 'block';
    setTimeout(() => {
        element.style.display = 'none';
    }, 3000);
}

function loadDestinations() {
    DestinationService.getAll(
        function(destinations) {
            console.log("Loaded destinations:", destinations);
            const container = $("#destinations-list");
            container.empty();
            
            if (!destinations || destinations.length === 0) {
                container.html('<p style="text-align: center; color: #666;">No destinations yet. Add your first destination above!</p>');
                return;
            }
            
            destinations.forEach(dest => {
                const badge = dest.badge ? `<span class="badge-${dest.badge.toLowerCase()}">${dest.badge}</span>` : '';
                const price = dest.price_from ? `$${dest.price_from}` : 'Price TBA';
                
                container.append(`
                    <div class="item-card">
                        <div class="item-image" style="background-image: url('${dest.image_url || 'assets/images/placeholder.jpg'}')"></div>
                        <div class="item-info">
                            <div class="item-header">
                                <h3>${dest.name}</h3>
                                ${badge}
                            </div>
                            <p class="item-location">📍 ${dest.location || dest.country}</p>
                            <p class="item-description">${dest.description || 'No description available'}</p>
                            <div class="item-footer">
                                <span class="item-price">${price}</span>
                                <button class="btn-delete" onclick="deleteDestination(${dest.id})">Delete</button>
                            </div>
                        </div>
                    </div>
                `);
            });
        },
        function(error) {
            console.error("Error loading destinations:", error);
            $("#destinations-list").html('<p style="text-align: center; color: #e74c3c;">Failed to load destinations</p>');
        }
    );
}

function loadPackages() {
    PackageService.getAll(
        function(packages) {
            console.log("Loaded packages:", packages);
            const container = $("#packages-list");
            container.empty();
            
            if (!packages || packages.length === 0) {
                container.html('<p style="text-align: center; color: #666;">No packages yet. Add your first package above!</p>');
                return;
            }
            
            packages.forEach(pkg => {
                const duration = pkg.duration_days && pkg.duration_nights 
                    ? `${pkg.duration_days} Days / ${pkg.duration_nights} Nights`
                    : 'Duration TBA';
                
                const ribbon = pkg.tags ? `<span class="ribbon-badge">${pkg.tags}</span>` : '';
                const features = pkg.what_includes ? pkg.what_includes.split(',').map(f => `<li>✓ ${f.trim()}</li>`).join('') : '';
                
                container.append(`
                    <div class="item-card">
                        ${ribbon}
                        <div class="item-info">
                            <div class="item-header">
                                <h3>${pkg.name}</h3>
                                <span class="category-badge">${pkg.category || 'General'}</span>
                            </div>
                            <p class="item-duration">⏱️ ${duration}</p>
                            ${features ? `<ul class="package-features">${features}</ul>` : ''}
                            <div class="item-footer">
                                <span class="item-price">$${pkg.price}</span>
                                <button class="btn-delete" onclick="deletePackage(${pkg.id})">Delete</button>
                            </div>
                        </div>
                    </div>
                `);
            });
        },
        function(error) {
            console.error("Error loading packages:", error);
            $("#packages-list").html('<p style="text-align: center; color: #e74c3c;">Failed to load packages</p>');
        }
    );
}

function deleteDestination(id) {
    if (confirm('Are you sure you want to delete this destination?')) {
        DestinationService.delete(id,
            function() {
                alert('Destination deleted successfully!');
                loadDestinations();
            },
            function(error) {
                alert('Error: ' + (error.responseJSON?.message || 'Failed to delete destination'));
            }
        );
    }
}

function deletePackage(id) {
    if (confirm('Are you sure you want to delete this package?')) {
        PackageService.delete(id,
            function() {
                alert('Package deleted successfully!');
                loadPackages();
            },
            function(error) {
                alert('Error: ' + (error.responseJSON?.message || 'Failed to delete package'));
            }
        );
    }
}