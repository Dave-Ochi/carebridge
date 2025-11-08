// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const nav = document.querySelector('nav ul');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Slider functionality
let currentSlide = 1;
const totalSlides = 4;
let slideInterval;

function showSlide(slideNumber) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    const activeSlide = document.querySelector(`.slide[data-slide="${slideNumber}"]`);
    const activeDot = document.querySelector(`.dot[data-slide="${slideNumber}"]`);

    if (activeSlide) activeSlide.classList.add('active');
    if (activeDot) activeDot.classList.add('active');

    currentSlide = slideNumber;
}

function nextSlide() {
    currentSlide = currentSlide >= totalSlides ? 1 : currentSlide + 1;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = currentSlide <= 1 ? totalSlides : currentSlide - 1;
    showSlide(currentSlide);
}

function startSlider() {
    slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

function stopSlider() {
    clearInterval(slideInterval);
}

// Initialize slider
document.addEventListener('DOMContentLoaded', () => {
    showSlide(1);
    startSlider();

    // Slider navigation
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const dots = document.querySelectorAll('.dot');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopSlider();
            prevSlide();
            startSlider();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopSlider();
            nextSlide();
            startSlider();
        });
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            stopSlider();
            const slideNumber = parseInt(dot.getAttribute('data-slide'));
            showSlide(slideNumber);
            startSlider();
        });
    });

    // Pause slider on hover
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopSlider);
        sliderContainer.addEventListener('mouseleave', startSlider);
    }
});

// Form validation and submission
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'red';
        } else {
            input.style.borderColor = '#ddd';
        }
    });

    return isValid;
}

function submitForm(form, event) {
    event.preventDefault();
    if (validateForm(form)) {
        // Simulate form submission
        alert('Form submitted successfully!');
        form.reset();
    } else {
        alert('Please fill in all required fields.');
    }
}

// Contact form
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (event) => submitForm(contactForm, event));
}

// Removed redundant enrollment form handler - no enroll-form element exists in HTML

// Admission form
const admissionForm = document.getElementById('admission-form');
if (admissionForm) {
    admissionForm.addEventListener('submit', (event) => submitForm(admissionForm, event));
}

// Newsletter form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        if (email) {
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        } else {
            alert('Please enter a valid email address.');
        }
    });
}

// Portal login form
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const studentId = loginForm.querySelector('#student-id').value;
        const password = loginForm.querySelector('#password').value;

        if (studentId && password) {
            // Simulate login - in real implementation, this would authenticate with server
            alert('Login successful! Redirecting to dashboard...');
            // window.location.href = 'dashboard.html'; // Would redirect to actual dashboard
        } else {
            alert('Please enter both student ID and password.');
        }
    });
}

// Smooth scrolling for navigation links
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

// Removed redundant loadNews function - news content is static in HTML

// Accessibility: Add skip link
const skipLink = document.createElement('a');
skipLink.href = '#main';
skipLink.className = 'skip-link';
skipLink.textContent = 'Skip to main content';
document.body.insertBefore(skipLink, document.body.firstChild);

// Skip link and main element setup moved to HTML for better performance

// Keyboard navigation for mobile menu
if (menuToggle) {
    menuToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
        }
    });
}

// Keyboard navigation for slider
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        stopSlider();
        prevSlide();
        startSlider();
    } else if (e.key === 'ArrowRight') {
        stopSlider();
        nextSlide();
        startSlider();
    }
});