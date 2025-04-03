/**
 * FAQ Accordion Functionality
 * Handles expanding/collapsing FAQ items on the website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize FAQ accordion
    initFaqAccordion();
});

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