/**
 * Testimonial Slider Functionality
 */
document.addEventListener('DOMContentLoaded', function() {
    const sliders = document.querySelectorAll('.testimonial-slider');
    
    sliders.forEach(slider => {
        // Initialize slider functionality
        initSlider(slider);
        
        // Activate fade-in elements
        const fadeElements = slider.querySelectorAll('.fade-in');
        setTimeout(() => {
            fadeElements.forEach(el => {
                el.classList.add('active');
            });
        }, 300);
    });
    
    function initSlider(slider) {
        if (!slider) return;
        
        const prevBtn = document.querySelector('.testimonial-prev');
        const nextBtn = document.querySelector('.testimonial-next');
        const cards = slider.querySelectorAll('.testimonial-card');
        
        if (!cards.length) return;
        
        // Set up drag scrolling
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
        
        // Button navigation
        if (prevBtn && nextBtn) {
            // Calculate scroll amount based on card width
            const cardWidth = cards[0].offsetWidth;
            const scrollAmount = cardWidth + 20; // width + gap
            
            prevBtn.addEventListener('click', () => {
                slider.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
            });
            
            nextBtn.addEventListener('click', () => {
                slider.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            });
        }
        
        // Auto-scroll functionality
        let scrollInterval;
        
        function startAutoScroll() {
            scrollInterval = setInterval(() => {
                // Check if we've reached the end, if so, go back to start
                if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth - 10) {
                    slider.scrollTo({
                        left: 0,
                        behavior: 'smooth'
                    });
                } else {
                    slider.scrollBy({
                        left: cards[0].offsetWidth + 20,
                        behavior: 'smooth'
                    });
                }
            }, 5000); // Auto-scroll every 5 seconds
        }
        
        function stopAutoScroll() {
            clearInterval(scrollInterval);
        }
        
        // Start auto-scroll
        startAutoScroll();
        
        // Pause auto-scroll on hover/touch
        slider.addEventListener('mouseenter', stopAutoScroll);
        slider.addEventListener('touchstart', stopAutoScroll);
        
        // Resume auto-scroll when leaving
        slider.addEventListener('mouseleave', startAutoScroll);
        slider.addEventListener('touchend', startAutoScroll);
    }
});