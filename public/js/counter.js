/**
 * Statistics Counter Animation
 * Animates number counters when they come into view
 */
document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.counter-number');
    
    // Check if IntersectionObserver API is supported
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Start animation when counter is in view
                    animateCounter(entry.target);
                    // Stop observing after animation starts
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5, // Trigger when at least 50% of the element is visible
            rootMargin: '0px' // No margin
        });
        
        // Observe each counter element
        counters.forEach(counter => {
            observer.observe(counter);
        });
    } else {
        // Fallback for browsers without IntersectionObserver support
        counters.forEach(counter => {
            animateCounter(counter);
        });
    }
    
    /**
     * Animate a counter from 0 to its target value
     * @param {HTMLElement} counter - The counter element to animate
     */
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // Animation duration in milliseconds
        const frameDuration = 1000 / 60; // 60fps
        const totalFrames = Math.round(duration / frameDuration);
        const easeOutQuad = t => t * (2 - t); // Easing function for smoother animation
        
        let frame = 0;
        counter.textContent = '0';
        
        // Create animation loop
        const animate = () => {
            frame++;
            // Calculate progress with easing
            const progress = easeOutQuad(frame / totalFrames);
            // Calculate current count
            const currentCount = Math.round(target * progress);
            
            // Update counter text
            if (currentCount > counter.textContent) {
                counter.textContent = currentCount;
            }
            
            // Stop animation when complete
            if (frame < totalFrames) {
                requestAnimationFrame(animate);
            } else {
                counter.textContent = target; // Ensure final value is exact
            }
        };
        
        // Start animation
        animate();
    }
});