// Redirect to login/register page
document.querySelector('.btn-login').addEventListener('click', () => {
    window.location.href = './pages/login.html';
});

document.querySelector('.btn-register').addEventListener('click', () => {
    window.location.href = './pages/login.html';
});
// Mobile Menu Toggle

        const space = document.getElementById('space');
const navMenu = document.getElementById('navMenu');

space.addEventListener('click', () => {
    space.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a nav link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        space.classList.remove('active');
        navMenu.classList.remove('active');
    });
});
//close menu on click
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                space.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Active navigation highlighting
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const scrollY = window.pageYOffset;

            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');
                
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-menu a').forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });

        // Package filter tabs
        const packageTabs = document.querySelectorAll('.package-tab');
        const packageCards = document.querySelectorAll('.package-card');

    document.addEventListener('click', (e) => {
    // Only respond to package-tab buttons
    if (!e.target.matches('.package-tab')) return;
    
    const category = e.target.getAttribute('data-category');
    
    // Update active tab
    document.querySelectorAll('.package-tab').forEach(t => {
        t.classList.remove('active');
    });
    e.target.classList.add('active');
    
    // Filter cards
    document.querySelectorAll('.package-card').forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const shouldShow = category === 'all' || cardCategory === category;
        card.style.display = shouldShow ? 'block' : 'none';
    });
});

        // Contact form submission
        const contactForm = document.getElementById('contactForm');
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            alert(`Thank you ${name}! Your message has been sent. We'll contact you soon.`);
            contactForm.reset();
        });

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        // Data storage
let destinations = [
    {
        id: 1,
        name: 'Swiss Alps',
        country: 'Switzerland',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
        description: 'Majestic mountains, pristine lakes, and charming villages await you.',
        badge: 'Popular',
        price: 1299
    },
    {
        id: 2,
        name: 'Maldives',
        country: 'Indian Ocean',
        image: 'https://afar.brightspotcdn.com/dims4/default/ea28eda/2147483647/strip/false/crop/2000x1333+0+0/resize/1200x675!/quality/90/?url=https%3A%2F%2Fk3-prod-afar-media.s3.us-west-2.amazonaws.com%2Fbrightspot%2Fea%2F28%2Feda2147483647%2Fstrip%2Ffalse%2Fcrop%2F3000x1688%2B0%2B275%2Fresize%2F1280x675%21%2Fquality%2F90%2F%3Furl%3Dhttps%253A%252F%252Fres.cloudinary.com%252Fddjuftfy2%252Fimage%252Fupload%252Ff_webp%252Cc_fill.q_auto%252Fw_1280%252Ch_675%252Fv1%252Fmemphis-xlarge%252F41552669-9.jpg',
        description: 'Crystal clear waters and luxury overwater villas in paradise.',
        badge: 'Trending',
        price: 2199
    },
    {
        id: 3,
        name: 'Ancient Egypt',
        country: 'Egypt',
        image: 'https://res.cloudinary.com/ddjuftfy2/image/upload/f_webp,c_fill,q_auto/w_1280,h_675/v1/memphis-xlarge/41552669-9.jpg',
        description: 'Explore pyramids, temples, and the rich history of ancient civilization.',
        badge: 'Cultural',
        price: 1599
    }
];

let packages = [
    {
        id: 1,
        name: 'Alpine Explorer',
        category: 'adventure',
        duration: 7,
        nights: 6,
        price: 1299,
        icon: '⛰️',
        features: ['Mountain hiking tours', 'Cable car experiences', 'Local cuisine tasting', 'Professional guide'],
        ribbon: 'Best Seller'
    },
    {
        id: 2,
        name: 'Tropical Paradise',
        category: 'beach',
        duration: 5,
        nights: 4,
        price: 2199,
        icon: '🏝️',
        features: ['Luxury resort stay', 'Water sports included', 'Private beach access', 'Spa treatments'],
        ribbon: 'Premium'
    }
];

// Tab switching
document.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const category = tab.dataset.category;
        
        // Update active tab
        document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Update active content
        document.querySelectorAll('.admin-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${category}-section`).classList.add('active');
    });
});

// Destination form handling
document.getElementById('destination-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const destination = {
        id: Date.now(),
        name: document.getElementById('dest-name').value,
        country: document.getElementById('dest-country').value,
        image: document.getElementById('dest-image').value || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828',
        description: document.getElementById('dest-description').value,
        badge: document.getElementById('dest-badge').value,
        price: parseInt(document.getElementById('dest-price').value)
    };
    
    destinations.push(destination);
    renderDestinations();
    e.target.reset();
    showAlert('destination-alert');
});

// Package form handling
document.getElementById('package-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const featuresText = document.getElementById('pkg-features').value;
    const features = featuresText.split('\n').filter(f => f.trim() !== '');
    
    const package = {
        id: Date.now(),
        name: document.getElementById('pkg-name').value,
        category: document.getElementById('pkg-category').value,
        duration: parseInt(document.getElementById('pkg-duration').value),
        nights: parseInt(document.getElementById('pkg-nights').value),
        price: parseInt(document.getElementById('pkg-price').value),
        icon: document.getElementById('pkg-icon').value || '✈️',
        features: features,
        ribbon: document.getElementById('pkg-ribbon').value
    };
    
    packages.push(package);
    renderPackages();
    e.target.reset();
    showAlert('package-alert');
});

// Show alert
function showAlert(alertId) {
    const alert = document.getElementById(alertId);
    alert.classList.add('show');
    setTimeout(() => {
        alert.classList.remove('show');
    }, 3000);
}

// Render destinations
function renderDestinations() {
    const grid = document.getElementById('destinations-grid');
    grid.innerHTML = '';
    
    destinations.forEach(dest => {
        const card = document.createElement('div');
        card.className = 'destination-card';
        card.innerHTML = `
            <img src="${dest.image}" alt="${dest.name}" class="destination-image">
            <div class="destination-badge">${dest.badge}</div>
            <div class="destination-content">
                <h3>${dest.name}</h3>
                <p class="destination-location">📍 ${dest.country}</p>
                <p class="destination-description">${dest.description}</p>
                <div class="destination-footer">
                    <div class="destination-price">
                        <span class="price-label">From </span>
                        <span class="price-amount">$${dest.price.toLocaleString()}</span>
                    </div>
                    <button class="btn-secondary" onclick="viewDestination(${dest.id})">Explore</button>
                    <button class="btn-delete" onclick="deleteDestination(${dest.id})">Delete</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Render packages
function renderPackages() {
    const grid = document.getElementById('packages-grid');
    grid.innerHTML = '';
    
    packages.forEach(pkg => {
        const card = document.createElement('div');
        card.className = 'package-card';
        card.innerHTML = `
            ${pkg.ribbon ? `<div class="package-ribbon">${pkg.ribbon}</div>` : ''}
            <div class="package-content">
                <div class="package-icon">${pkg.icon}</div>
                <h3>${pkg.name}</h3>
                <p class="package-duration">${pkg.duration} Days / ${pkg.nights} Nights</p>
                <ul class="package-features">
                    ${pkg.features.map(f => `<li>${f}</li>`).join('')}
                </ul>
                <div class="package-footer">
                    <div class="package-price">
                        <span class="price-amount">$${pkg.price.toLocaleString()}</span>
                        <span class="price-label">per person</span>
                    </div>
                    <div class="card-actions">
                        <button class="btn-secondary" onclick="viewPackage(${pkg.id})">Book Now</button>
                        <button class="btn-delete" onclick="deletePackage(${pkg.id})">Delete</button>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Delete destination
function deleteDestination(id) {
    if (confirm('Are you sure you want to delete this destination?')) {
        destinations = destinations.filter(d => d.id !== id);
        renderDestinations();
    }
}

// Delete package
function deletePackage(id) {
    if (confirm('Are you sure you want to delete this package?')) {
        packages = packages.filter(p => p.id !== id);
        renderPackages();
    }
}

// View functions (placeholders)
function viewDestination(id) {
    const dest = destinations.find(d => d.id === id);
    alert(`Viewing destination: ${dest.name}\nThis would navigate to the destination details page.`);
}

function viewPackage(id) {
    const pkg = packages.find(p => p.id === id);
    alert(`Booking package: ${pkg.name}\nThis would navigate to the booking page.`);
}

// Initial render
renderDestinations();
renderPackages();