/**
 * Altered Website Scripts
 * Modern animations and interactions for improved user experience
 */

document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    const companyName = document.querySelector('.company-name');
    const scrollThreshold = 50;

    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
            companyName.textContent = 'ALTD.';
        } else {
            header.classList.remove('scrolled');
            companyName.textContent = 'ALTERED';
        }
    });

    // Initialize all components
    initNavigation();
    initScrollAnimations();
    initParallaxEffects();
    initCounterAnimation();
    initServiceCards();
    initTestimonialSlider();
    initContactForm();
    initDarkModeToggle();
    initMobileMenu();
    
    // Add a slight delay before revealing content
    setTimeout(() => {
        document.body.classList.add('page-loaded');
    }, 300);
});

/**
 * Navigation functionality
 */
function initNavigation() {
    // Header scroll state
    const header = document.querySelector('.header');
    const scrollThreshold = 50;
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
      // Dropdown menus
    const dropdownItems = document.querySelectorAll('.has-dropdown');
    
    dropdownItems.forEach(item => {
        const link = item.querySelector('a');
        const dropdown = item.querySelector('.dropdown');
        
        // For mobile devices
        if (link && dropdown) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 992) {
                    e.preventDefault();
                    item.classList.toggle('active');
                } else if (!dropdown.classList.contains('show')) {
                    e.preventDefault();
                    closeAllDropdowns();
                    dropdown.classList.add('show');
                }
            });
        }
    });
    
    function closeAllDropdowns() {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.classList.remove('show');
        });
    }
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.has-dropdown')) {
            closeAllDropdowns();
        }
    });
    
    // Update header on scroll
    window.addEventListener('scroll', function() {
        if (header) {
            if (window.scrollY > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (menuToggle && menuToggle.classList.contains('active')) {
                    menuToggle.click();
                }
                
                const headerOffset = header ? header.offsetHeight : 0;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Set active menu item based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-menu a').forEach(item => {
            item.classList.remove('active');
            if (current && item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
}

/**
 * Scroll animations using Intersection Observer
 */
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.15
    });
    
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
    
    // Add stagger effect for grouped elements
    const staggerContainers = document.querySelectorAll('.stagger-container');
    
    staggerContainers.forEach(container => {
        const staggerItems = container.querySelectorAll('.stagger-item');
        
        const staggerObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                staggerItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('active');
                    }, 100 * index);
                });
                staggerObserver.unobserve(container);
            }
        }, {
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.1
        });
        
        staggerObserver.observe(container);
    });
}

/**
 * Parallax scrolling effects
 */
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.1;
            const offset = scrollY * speed;
            
            if (element.classList.contains('parallax-bg')) {
                element.style.backgroundPositionY = `${offset}px`;
            } else {
                element.style.transform = `translateY(${offset}px)`;
            }
        });
    });
}

/**
 * Counter animation for statistics
 */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter-number');
    
    // Only animate if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        counters.forEach(counter => {
            animateCounter(counter);
        });
    }
    
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // ms
        const step = target / (duration / 16); // 60fps
        
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            
            if (current >= target) {
                clearInterval(timer);
                counter.textContent = target;
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    }
}

/**
 * Service cards hover effects and interactions
 */
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card, .service-item');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            // Add a temporary class for animation
            card.classList.add('card-hover');
            
            // Create a ripple effect on hover
            const ripple = document.createElement('div');
            ripple.classList.add('card-ripple');
            
            // Position the ripple at mouse position
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            card.appendChild(ripple);
            
            // Remove ripple after animation completes
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('card-hover');
        });
    });
}

/**
 * Testimonial slider with smooth scrolling
 */
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonial-slider');
    
    if (!slider) return;
    
    let isDown = false;
    let startX;
    let scrollLeft;
    
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    
    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });
    
    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });
    
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.5; // Scroll speed
        slider.scrollLeft = scrollLeft - walk;
    });
    
    // Touch events for mobile
    slider.addEventListener('touchstart', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    
    slider.addEventListener('touchend', () => {
        isDown = false;
        slider.classList.remove('active');
    });
    
    slider.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.5;
        slider.scrollLeft = scrollLeft - walk;
    });
    
    // Arrow navigation
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            slider.scrollBy({
                left: -350,
                behavior: 'smooth'
            });
        });
        
        nextBtn.addEventListener('click', () => {
            slider.scrollBy({
                left: 350,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Contact form validation and submission
 */
function initContactForm() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        if (form.classList.contains('booking-form') || form.classList.contains('contact-form')) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Basic validation
                let valid = true;
                const reqFields = form.querySelectorAll('[required]');
                
                reqFields.forEach(field => {
                    if (!field.value.trim()) {
                        valid = false;
                        field.classList.add('error');
                    } else {
                        field.classList.remove('error');
                    }
                    
                    // Email validation
                    if (field.type === 'email' && field.value.trim()) {
                        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailPattern.test(field.value)) {
                            valid = false;
                            field.classList.add('error');
                        }
                    }
                });
                
                if (valid) {
                    // Show loading state
                    form.classList.add('loading');
                    const submitBtn = form.querySelector('button[type="submit"]');
                    
                    if (submitBtn) {
                        const originalText = submitBtn.innerHTML;
                        submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
                        submitBtn.disabled = true;
                    }
                    
                    // Gather form data
                    const formData = new FormData(form);
                    const formObject = {};
                    formData.forEach((value, key) => {
                        formObject[key] = value;
                    });
                    
                    // Simulate form submission (replace with actual AJAX call)
                    setTimeout(() => {
                        form.classList.remove('loading');
                        form.classList.add('success');
                        form.innerHTML = `
                            <div class="form-success">
                                <i class="fas fa-check-circle"></i>
                                <h3>Thank you!</h3>
                                <p>Your message has been sent successfully. We'll get back to you shortly.</p>
                            </div>
                        `;
                        
                        // In production, use this instead:
                        /*
                        fetch('/api/contact', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(formObject),
                        })
                        .then(response => response.json())
                        .then(data => {
                            form.classList.remove('loading');
                            if (data.success) {
                                form.classList.add('success');
                                form.innerHTML = `
                                    <div class="form-success">
                                        <i class="fas fa-check-circle"></i>
                                        <h3>Thank you!</h3>
                                        <p>Your message has been sent successfully. We'll get back to you shortly.</p>
                                    </div>
                                `;
                            } else {
                                // Show error
                                if (submitBtn) {
                                    submitBtn.innerHTML = originalText;
                                    submitBtn.disabled = false;
                                }
                                showFormError(form, data.message || 'Something went wrong. Please try again.');
                            }
                        })
                        .catch(error => {
                            form.classList.remove('loading');
                            if (submitBtn) {
                                submitBtn.innerHTML = originalText;
                                submitBtn.disabled = false;
                            }
                            showFormError(form, 'Network error. Please check your connection and try again.');
                        });
                        */
                    }, 1500);
                }
            });
            
            // Clear error state on input
            form.querySelectorAll('input, textarea, select').forEach(field => {
                field.addEventListener('input', function() {
                    this.classList.remove('error');
                    const errorMsg = this.parentNode.querySelector('.error-message');
                    if (errorMsg) {
                        errorMsg.remove();
                    }
                });
            });
        }
    });
    
    function showFormError(form, message) {
        // Remove any existing error messages
        const existingError = form.querySelector('.form-error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Create and insert error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error-message';
        errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.parentNode.insertBefore(errorDiv, submitBtn);
        } else {
            form.appendChild(errorDiv);
        }
    }
}

/**
 * Dark mode toggle
 */
function initDarkModeToggle() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const htmlElement = document.documentElement;
    
    // Check user preference
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    // Set initial theme
    if (savedTheme === 'light') {
        htmlElement.classList.remove('dark-mode');
    } else if (savedTheme === 'dark' || prefersDarkMode) {
        htmlElement.classList.add('dark-mode');
    }
    
    if (darkModeToggle) {
        // Update toggle state
        if (htmlElement.classList.contains('dark-mode')) {
            darkModeToggle.classList.add('active');
        }
        
        darkModeToggle.addEventListener('click', () => {
            htmlElement.classList.toggle('dark-mode');
            darkModeToggle.classList.toggle('active');
            
            // Save preference
            const isDarkMode = htmlElement.classList.contains('dark-mode');
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        });
    }
}

/**
 * Mobile menu functionality
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.main-nav');
    const dropdownItems = document.querySelectorAll('.has-dropdown');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    // Handle dropdown toggles on mobile
    dropdownItems.forEach(item => {
        const link = item.querySelector('a');
        const dropdown = item.querySelector('.dropdown');
        
        if (link && dropdown) {
            link.addEventListener('click', function(e) {
                // Only for mobile view
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    this.parentNode.classList.toggle('active');
                }
            });
        }
    });

    // Close the mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && navMenu.classList.contains('active')) {
            if (!e.target.closest('.main-nav') && !e.target.closest('.mobile-menu-toggle')) {
                navMenu.classList.remove('active');
                if (menuToggle) menuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
    });

    // Close mobile menu when window is resized to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (menuToggle) menuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
            // Reset dropdown active states
            dropdownItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });
}