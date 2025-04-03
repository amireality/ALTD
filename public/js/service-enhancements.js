/**
 * Service Enhancements JavaScript
 * Adds interactivity and animations to the Altered website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and interactive elements
    initFadeInAnimations();
    initFaqAccordion();
    initScrollAnimations();
    enhanceFormValidation();
    addHoverEffects();
    
    // If specific page elements exist, initialize their functionality
    if (document.querySelector('.job-filters')) {
        initJobFilters();
    }
    
    if (document.querySelector('.counter-number')) {
        initCounterAnimation();
    }
});

/**
 * Initialize fade-in animations for content elements
 */
function initFadeInAnimations() {
    // Add visible class to elements with fade-in and fade-in-staggered classes
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-staggered');
    
    // If we have fade elements, set up an observer
    if (fadeElements.length > 0) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Unobserve after animation is triggered
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        fadeElements.forEach(el => {
            fadeObserver.observe(el);
        });
    }
    
    // Add animation classes to appropriate elements if they don't already have them
    document.querySelectorAll('.service-card, .feature-card, .benefit-item, .pricing-tier').forEach((el, index) => {
        if (!el.classList.contains('fade-in') && !el.classList.contains('fade-in-staggered')) {
            el.classList.add('fade-in-staggered');
        }
    });
}

/**
 * Initialize scroll animations for elements coming into view
 */
function initScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    
    // Set up intersection observer for section animations
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                const animationElements = section.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
                
                animationElements.forEach((el, index) => {
                    // Add delay based on index
                    setTimeout(() => {
                        el.classList.add('active');
                    }, index * 100);
                });
                
                // Unobserve after animation is triggered
                sectionObserver.unobserve(section);
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        // Find elements that should be animated
        const headers = section.querySelectorAll('.section-header, h2, h3');
        const content = section.querySelectorAll('p:not(.fade-in):not(.fade-in-staggered)');
        const serviceCards = section.querySelectorAll('.service-card:not(.fade-in):not(.fade-in-staggered)');
        const featureCards = section.querySelectorAll('.feature-card:not(.fade-in):not(.fade-in-staggered)');
        
        // Add animation classes
        headers.forEach(el => {
            if (!el.classList.contains('fade-in-up') && 
                !el.classList.contains('fade-in-left') && 
                !el.classList.contains('fade-in-right')) {
                el.classList.add('fade-in-up');
            }
        });
        
        content.forEach(el => {
            if (!el.classList.contains('fade-in-up') && 
                !el.classList.contains('fade-in-left') && 
                !el.classList.contains('fade-in-right')) {
                el.classList.add('fade-in-up');
            }
        });
        
        // Observe the section for animations
        sectionObserver.observe(section);
    });
}

/**
 * Initialize FAQ accordion functionality
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                // Close other open items
                const currentlyActive = document.querySelector('.faq-item.active');
                if (currentlyActive && currentlyActive !== item) {
                    currentlyActive.classList.remove('active');
                }
                
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
}

/**
 * Enhance form validation with visual feedback
 */
function enhanceFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const formInputs = form.querySelectorAll('input, select, textarea');
        
        // Add validation styles on blur
        formInputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateInput(input);
            });
            
            // Also validate on change for select elements
            if (input.tagName === 'SELECT') {
                input.addEventListener('change', () => {
                    validateInput(input);
                });
            }
        });
        
        // Validate on form submission
        form.addEventListener('submit', function(e) {
            let isValid = true;
            
            formInputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                // Scroll to first invalid input
                const firstInvalid = form.querySelector('.is-invalid');
                if (firstInvalid) {
                    firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstInvalid.focus();
                }
            }
        });
    });
    
    // Input validation helper function
    function validateInput(input) {
        // Skip validation if element doesn't have required attribute
        if (!input.hasAttribute('required')) {
            return true;
        }
        
        let isValid = true;
        
        // Clear previous validation state
        input.classList.remove('is-valid', 'is-invalid');
        
        // Validate based on input type
        if (input.value.trim() === '') {
            isValid = false;
        } else if (input.type === 'email' && !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(input.value)) {
            isValid = false;
        } else if (input.type === 'tel' && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(input.value)) {
            isValid = false;
        } else if (input.type === 'checkbox' && !input.checked) {
            isValid = false;
        }
        
        // Add appropriate class based on validation
        if (isValid) {
            input.classList.add('is-valid');
        } else {
            input.classList.add('is-invalid');
        }
        
        return isValid;
    }
}

/**
 * Add hover effects to interactive elements
 */
function addHoverEffects() {
    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card, .feature-card, .case-study-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Find and animate icons
            const icon = card.querySelector('.service-icon, .feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset animations
            const icon = card.querySelector('.service-icon, .feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
            }
        });
    });
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
            button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
            button.style.transition = 'all 0.3s ease';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = 'none';
        });
    });
}

/**
 * Initialize counter animation for statistics
 */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter-number');
    
    // Set up intersection observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                
                // Animate count up
                animateCountUp(counter, target);
                
                // Unobserve after animation is triggered
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        // Store the target number as a data attribute if it doesn't exist
        if (!counter.getAttribute('data-target')) {
            counter.setAttribute('data-target', counter.textContent);
        }
        
        // Reset counter to zero
        counter.textContent = '0';
        
        // Observe counter
        counterObserver.observe(counter);
    });
    
    // Counter animation helper function
    function animateCountUp(counter, target) {
        const duration = 2000; // Animation duration in milliseconds
        const steps = 50; // Number of steps
        const stepValue = target / steps;
        let current = 0;
        let step = 0;
        
        const timer = setInterval(() => {
            step++;
            current = Math.ceil(stepValue * step);
            
            if (current > target) {
                current = target;
                clearInterval(timer);
            }
            
            counter.textContent = current;
        }, duration / steps);
    }
}

/**
 * Initialize job filtering on careers page
 */
function initJobFilters() {
    const departmentFilter = document.getElementById('department-filter');
    const locationFilter = document.getElementById('location-filter');
    const jobCards = document.querySelectorAll('.job-card');
    const noJobsMessage = document.querySelector('.no-jobs-message');
    
    // Function to filter jobs
    function filterJobs() {
        const selectedDepartment = departmentFilter.value;
        const selectedLocation = locationFilter.value;
        
        let visibleJobs = 0;
        
        jobCards.forEach(card => {
            const department = card.getAttribute('data-department');
            const location = card.getAttribute('data-location');
            
            const departmentMatch = selectedDepartment === 'all' || department === selectedDepartment;
            const locationMatch = selectedLocation === 'all' || location === selectedLocation;
            
            if (departmentMatch && locationMatch) {
                card.style.display = 'block';
                visibleJobs++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show/hide no jobs message
        if (noJobsMessage) {
            noJobsMessage.style.display = visibleJobs === 0 ? 'block' : 'none';
        }
    }
    
    // Add event listeners to filters
    if (departmentFilter) {
        departmentFilter.addEventListener('change', filterJobs);
    }
    
    if (locationFilter) {
        locationFilter.addEventListener('change', filterJobs);
    }
    
    // Apply filters on initial load
    filterJobs();
}

// Add class to body when page is fully loaded
window.addEventListener('load', function() {
    document.body.classList.add('page-loaded');
    
    // Initialize any elements that need the page to be fully loaded
    initScrollPositioning();
});

/**
 * Initialize smooth scrolling for anchor links
 */
function initScrollPositioning() {
    // Smooth scroll to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#" or an empty anchor
            if (targetId === '#' || targetId === '') {
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 100, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Check if URL has hash and scroll to it
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        
        if (targetElement) {
            // Delay scroll to ensure page is fully loaded
            setTimeout(() => {
                window.scrollTo({
                    top: targetElement.offsetTop - 100, // Offset for header
                    behavior: 'smooth'
                });
            }, 500);
        }
    }
}

/**
 * Add dynamic CSS variables for theming
 */
function initThemeColors() {
    // Check if CSS variables are already defined
    const root = document.documentElement;
    
    if (!getComputedStyle(root).getPropertyValue('--primary-color')) {
        // Set default theme colors if not already defined
        root.style.setProperty('--primary-color', '#2c3e50');
        root.style.setProperty('--primary-color-rgb', '44, 62, 80');
        root.style.setProperty('--secondary-color', '#1a252f');
        root.style.setProperty('--accent-color', '#ffd700');
        root.style.setProperty('--accent-color-rgb', '255, 215, 0');
        root.style.setProperty('--text-color', '#333333');
        root.style.setProperty('--light-text', '#777777');
        root.style.setProperty('--medium-text', '#555555');
        root.style.setProperty('--white', '#ffffff');
        root.style.setProperty('--card-bg', '#ffffff');
        root.style.setProperty('--dark-bg', '#f5f5f5');
        root.style.setProperty('--border-color', '#e5e5e5');
    }
}

// Initialize theme colors
initThemeColors();