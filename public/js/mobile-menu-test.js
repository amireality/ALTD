/**
 * Mobile Menu Test Script
 * This script helps debug mobile menu functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Mobile Menu Test Script loaded');
    
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.main-nav');
    
    if (menuToggle) {
        console.log('Mobile menu toggle found');
        
        menuToggle.addEventListener('click', function(e) {
            console.log('Mobile menu toggle clicked');
            e.preventDefault();
            e.stopPropagation();
            
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            console.log('Menu toggle classes updated');
            console.log('Toggle active:', this.classList.contains('active'));
            console.log('Nav active:', navMenu.classList.contains('active'));
            console.log('Body menu-open:', document.body.classList.contains('menu-open'));
        });
    } else {
        console.error('Mobile menu toggle not found');
    }
    
    if (navMenu) {
        console.log('Navigation menu found');
    } else {
        console.error('Navigation menu not found');
    }
}); 