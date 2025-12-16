var DestinationService = {
    destinations: {
        1: {
            name: "Swiss Alps",
            location: "🌍 Switzerland",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
            description: "The Swiss Alps offer some of the most spectacular mountain scenery in the world. From the iconic Matterhorn to charming alpine villages, this destination combines natural beauty with Swiss precision and hospitality. Whether you're seeking adventure on the slopes or tranquility in mountain meadows, the Swiss Alps deliver an unforgettable experience.",
            highlights: [
                "Visit the iconic Matterhorn in Zermatt",
                "Ride the Glacier Express panoramic train",
                "Explore charming villages like Grindelwald and Interlaken",
                "Experience world-class skiing and snowboarding",
                "Enjoy Swiss chocolate and cheese in authentic alpine restaurants"
            ],
            bestTime: "June-September (Summer), December-March (Skiing)",
            flightDuration: "8-10 hours from US",
            language: "German, French, Italian",
            currency: "Swiss Franc (CHF)",
            packages: [
                {
                    id: 1,
                    name: "Alpine Explorer",
                    duration: "7 Days / 6 Nights",
                    price: 1299,
                    features: ["Mountain hiking tours", "Cable car experiences", "Local cuisine tasting", "Professional guide"]
                }
            ]
        },
        2: {
            name: "Maldives",
            location: "🌍 Indian Ocean",
            image: "https://afar.brightspotcdn.com/dims4/default/ea28eda/2147483647/strip/false/crop/3000x1688+0+275/resize/1200x675!/quality/90/?url=https%3A%2F%2Fk3-prod-afar-media.s3.us-west-2.amazonaws.com%2Fbrightspot%2Fb2%2Ff4%2F9a1ebe3f427f8e5eb937f8df8998%2Ftravelguides-maldives-videomediastudioeurope-shutterstock.jpg",
            description: "The Maldives is a tropical paradise featuring pristine white-sand beaches, crystal-clear turquoise waters, and luxurious overwater bungalows. This archipelago of 26 atolls offers unparalleled opportunities for diving, snorkeling, and relaxation in one of the world's most exclusive destinations.",
            highlights: [
                "Stay in luxury overwater villas",
                "Snorkel with manta rays and whale sharks",
                "Experience world-class diving sites",
                "Enjoy private island experiences",
                "Indulge in spa treatments by the ocean"
            ],
            bestTime: "November-April (Dry season)",
            flightDuration: "18-20 hours from US",
            language: "Dhivehi, English",
            currency: "Maldivian Rufiyaa (MVR)",
            packages: [
                {
                    id: 2,
                    name: "Tropical Paradise",
                    duration: "5 Days / 4 Nights",
                    price: 2199,
                    features: ["Luxury resort stay", "Water sports included", "Private beach access", "Spa treatments"]
                }
            ]
        },
        3: {
            name: "Ancient Egypt",
            location: "🌍 Egypt",
            image: "https://res.cloudinary.com/ddjuftfy2/image/upload/f_webp,c_fill,q_auto/memphis/xlarge/415562669_9.jpg",
            description: "Journey through 5,000 years of history in Egypt, home to the legendary Pyramids of Giza, the Sphinx, and treasures of the Pharaohs. Cruise the Nile River, explore ancient temples, and immerse yourself in one of the world's greatest civilizations.",
            highlights: [
                "Visit the Great Pyramids and Sphinx of Giza",
                "Explore the Valley of the Kings in Luxor",
                "Cruise the Nile River on a traditional felucca",
                "Tour the Egyptian Museum in Cairo",
                "Experience local markets and authentic Egyptian cuisine"
            ],
            bestTime: "October-April (Mild weather)",
            flightDuration: "11-13 hours from US",
            language: "Arabic, English widely spoken",
            currency: "Egyptian Pound (EGP)",
            packages: [
                {
                    id: 3,
                    name: "Ancient Wonders",
                    duration: "10 Days / 9 Nights",
                    price: 1799,
                    features: ["Pyramid tours", "Nile River cruise", "Museum visits", "Expert Egyptologist"]
                }
            ]
        },
        4: {
            name: "Amazon Rainforest",
            location: "🌍 Brazil",
            image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&h=400&fit=crop",
            description: "Venture into the world's largest rainforest and discover incredible biodiversity. The Amazon offers unparalleled wildlife encounters, indigenous culture experiences, and the chance to explore one of Earth's most vital ecosystems.",
            highlights: [
                "Spot exotic wildlife including monkeys, sloths, and pink dolphins",
                "Trek through pristine jungle trails",
                "Visit indigenous communities",
                "Canoe through flooded forests",
                "Night safari to observe nocturnal creatures"
            ],
            bestTime: "June-November (Dry season)",
            flightDuration: "10-12 hours from US",
            language: "Portuguese, Spanish",
            currency: "Brazilian Real (BRL)",
            packages: [
                {
                    id: 7,
                    name: "Jungle Adventure",
                    duration: "8 Days / 7 Nights",
                    price: 1599,
                    features: ["Guided jungle treks", "Wildlife spotting tours", "Indigenous village visits", "River expeditions"]
                }
            ]
        },
        5: {
            name: "Northern Lights",
            location: "🌍 Norway",
            image: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=600&h=400&fit=crop",
            description: "Witness the breathtaking aurora borealis dancing across Arctic skies. Norway's northern regions offer pristine wilderness, dramatic fjords, and the magical phenomenon of the Northern Lights in winter months.",
            highlights: [
                "Chase the Northern Lights with expert guides",
                "Experience dog sledding through Arctic landscapes",
                "Visit traditional Sami culture",
                "Explore stunning Norwegian fjords",
                "Stay in unique accommodations like glass igloos"
            ],
            bestTime: "September-March (Aurora season)",
            flightDuration: "8-10 hours from US",
            language: "Norwegian, English",
            currency: "Norwegian Krone (NOK)",
            packages: [
                {
                    id: 8,
                    name: "Aurora Hunter",
                    duration: "6 Days / 5 Nights",
                    price: 1899,
                    features: ["Northern Lights tours", "Dog sledding", "Fjord cruises", "Glass igloo stay"]
                }
            ]
        },
        6: {
            name: "Kenya Safari",
            location: "🌍 Kenya",
            image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&h=400&fit=crop",
            description: "Experience the ultimate African safari in Kenya's world-renowned national parks. Witness the Great Migration, spot the Big Five, and immerse yourself in the raw beauty of the African savanna.",
            highlights: [
                "Witness the Great Wildebeest Migration in Maasai Mara",
                "Spot the Big Five: lion, leopard, elephant, rhino, buffalo",
                "Visit with Maasai warriors and learn their traditions",
                "Hot air balloon safari at sunrise",
                "Stay in luxury safari lodges"
            ],
            bestTime: "July-October (Migration), January-February",
            flightDuration: "15-17 hours from US",
            language: "Swahili, English",
            currency: "Kenyan Shilling (KES)",
            packages: [
                {
                    id: 9,
                    name: "Safari Experience",
                    duration: "9 Days / 8 Nights",
                    price: 2499,
                    features: ["Game drives", "Big Five spotting", "Maasai village visit", "Luxury lodge accommodation"]
                }
            ]
        }
    },

    init: function() {
        this.setupModalHandlers();
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

    showDestinationModal: function(destinationId) {
        const dest = this.destinations[destinationId];
        if (!dest) {
            console.error('Destination not found:', destinationId);
            return;
        }

        // Set basic info
        $('#modal_destination_name').text(dest.name);
        $('#modal_destination_location').text(dest.location);
        $('#modal_destination_image').attr('src', dest.image);
        $('#modal_destination_description').text(dest.description);
        
        // Set highlights
        const highlightsList = dest.highlights.map(h => `<li>${h}</li>`).join('');
        $('#modal_destination_highlights').html(highlightsList);
        
        // Set info
        $('#modal_best_time').text(dest.bestTime);
        $('#modal_flight_duration').text(dest.flightDuration);
        $('#modal_language').text(dest.language);
        $('#modal_currency').text(dest.currency);
        
        // Set packages
        const packagesHtml = dest.packages.map(pkg => `
            <div class="package-item">
                <div class="package-header">
                    <h4>${pkg.name}</h4>
                    <span class="package-price-tag">$${pkg.price.toLocaleString()}</span>
                </div>
                <p class="package-duration">${pkg.duration}</p>
                <ul class="package-features">
                    ${pkg.features.map(f => `<li>✓ ${f}</li>`).join('')}
                </ul>
                <button class="btn-primary full-width" onclick="BookingService.showBookingModal(${pkg.id}, '${pkg.name}', ${pkg.price})">
                    Book This Package
                </button>
            </div>
        `).join('');
        
        $('#modal_packages_list').html(packagesHtml);
        
        $('#destinationModal').fadeIn();
    },

    loadDestinations: function() {
        RestClient.get("destinations", function(response) {
            console.log("Destinations loaded from API:", response);
        });
    },

    addDestination: function(destinationData) {
        console.log("Adding destination:", destinationData);
        
        // Prepare the data for API submission
        const data = {
            name: destinationData.name,
            location: destinationData.location,
            country: destinationData.location, // Using location as country for now
            description: destinationData.description,
            image_url: destinationData.image,
            badge: destinationData.badge,
            price_from: parseFloat(destinationData.price)
        };

        console.log("Sending data to API:", data);

        // Send POST request to API
        RestClient.post("destinations", data, 
            function(response) {
                console.log("Destination added successfully:", response);
                
                // Show success message
                $('#destination-success').fadeIn().delay(3000).fadeOut();
                
                // Clear the form
                $('#destination-form')[0].reset();
                
                // Reload destinations list
                DestinationService.loadDestinationsList();
            }, 
            function(xhr, status, error) {
                console.error("Error adding destination:", error);
                console.error("Status:", status);
                console.error("Response:", xhr.responseText);
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
                    // Handle null or undefined image_url
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
                                <p class="price" style="font-weight: bold; color: #2c5f8d; margin: 10px 0;">From ${parseFloat(price).toLocaleString()}</p>
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
            
            console.log("Form submitted!");
            
            const destinationData = {
                name: $('#dest-name').val(),
                location: $('#dest-location').val(),
                badge: $('#dest-category').val(),
                price: $('#dest-price').val(),
                image: $('#dest-image').val(),
                description: $('#dest-description').val()
            };
            
            console.log("Form data:", destinationData);
            
            DestinationService.addDestination(destinationData);
            
            return false;
        });
    }
});