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

        packageTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const category = tab.getAttribute('data-category');
                
                packageTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                packageCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    if (category === 'all' || cardCategory === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
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