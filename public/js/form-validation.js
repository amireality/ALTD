/**
 * Form Validation and Submission Handling
 * Validates form inputs and handles form submissions with feedback
 */
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        if (form.classList.contains('booking-form') || 
            form.classList.contains('contact-form') ||
            form.classList.contains('application-form')) {
            
            setupFormValidation(form);
        }
    });
    
    function setupFormValidation(form) {
        // Add input event listeners for real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            if (input.hasAttribute('required')) {
                // Add validation styles
                input.classList.add('validate');
                
                // Add validation on blur
                input.addEventListener('blur', function() {
                    validateInput(this);
                });
                
                // Remove error on input
                input.addEventListener('input', function() {
                    this.classList.remove('error');
                    const errorMsg = this.parentNode.querySelector('.error-message');
                    if (errorMsg) {
                        errorMsg.remove();
                    }
                });
            }
            
            // Special validation for email fields
            if (input.type === 'email') {
                input.addEventListener('blur', function() {
                    validateEmail(this);
                });
            }
            
            // Special validation for phone fields
            if (input.type === 'tel') {
                input.addEventListener('blur', function() {
                    validatePhone(this);
                });
            }
        });
        
        // Form submission handling
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all required fields
            let isValid = true;
            
            inputs.forEach(input => {
                if (input.hasAttribute('required')) {
                    const valid = validateInput(input);
                    isValid = isValid && valid;
                }
                
                if (input.type === 'email' && input.value.trim()) {
                    const valid = validateEmail(input);
                    isValid = isValid && valid;
                }
                
                if (input.type === 'tel' && input.value.trim()) {
                    const valid = validatePhone(input);
                    isValid = isValid && valid;
                }
            });
            
            if (isValid) {
                // Show loading state
                form.classList.add('submitting');
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
                
                if (submitBtn) {
                    submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
                    submitBtn.disabled = true;
                }
                
                // Determine which endpoint to use based on form class
                let endpoint = '/api/contact'; // Default endpoint
                
                if (form.classList.contains('booking-form')) {
                    endpoint = '/api/booking';
                } else if (form.classList.contains('newsletter-form')) {
                    endpoint = '/api/subscribe';
                }
                
                // Actual form submission using AJAX
                const formData = new FormData(form);
                const formDataObject = {};
                
                // Convert FormData to JSON object
                formData.forEach((value, key) => {
                    formDataObject[key] = value;
                });
                
                fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formDataObject)
                })
                .then(response => response.json())
                .then(data => {
                    form.classList.remove('submitting');
                    if (data.success) {
                        form.classList.add('success');
                        form.innerHTML = `
                            <div class="form-success">
                                <i class="fas fa-check-circle"></i>
                                <h3>Thank you!</h3>
                                <p>${data.message || 'Your submission has been received successfully. We\'ll be in touch soon.'}</p>
                            </div>
                        `;
                        
                        // Scroll to success message
                        window.scrollTo({
                            top: form.offsetTop - 100,
                            behavior: 'smooth'
                        });
                    } else {
                        // Show error
                        if (submitBtn) {
                            submitBtn.innerHTML = originalBtnText;
                            submitBtn.disabled = false;
                        }
                        showFormError(form, data.message || 'There was a problem submitting the form. Please try again.');
                    }
                })
                .catch(error => {
                    console.error('Form submission error:', error);
                    form.classList.remove('submitting');
                    if (submitBtn) {
                        submitBtn.innerHTML = originalBtnText;
                        submitBtn.disabled = false;
                    }
                    showFormError(form, 'Network error. Please check your connection and try again.');
                });
            } else {
                // Scroll to the first error
                const firstError = form.querySelector('.error');
                if (firstError) {
                    firstError.focus();
                    window.scrollTo({
                        top: firstError.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }
    
    function validateInput(input) {
        if (!input.value.trim()) {
            showError(input, 'This field is required');
            return false;
        }
        
        return true;
    }
    
    function validateEmail(input) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailPattern.test(input.value.trim())) {
            showError(input, 'Please enter a valid email address');
            return false;
        }
        
        return true;
    }
    
    function validatePhone(input) {
        // Basic phone validation - can be adjusted based on requirements
        const phonePattern = /^[0-9\s\(\)\+\-]{7,20}$/;
        
        if (!phonePattern.test(input.value.trim())) {
            showError(input, 'Please enter a valid phone number');
            return false;
        }
        
        return true;
    }
    
    function showError(input, message) {
        input.classList.add('error');
        
        // Remove any existing error message
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        input.parentNode.appendChild(errorDiv);
    }
    
    function showFormError(form, message) {
        // Remove any existing form error
        const existingError = form.querySelector('.form-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Create form error element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        
        // Insert before submit button
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.insertAdjacentElement('beforebegin', errorDiv);
        } else {
            form.appendChild(errorDiv);
        }
    }
});