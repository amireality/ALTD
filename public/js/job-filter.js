/**
 * Job Filtering Functionality
 * Handles filtering job listings on the careers page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize job filters if they exist on the page
    if (document.querySelector('.job-filters')) {
        initJobFilters();
    }
});

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
                
                // Add fade-in animation
                card.classList.add('fade-in');
                setTimeout(() => {
                    card.classList.add('visible');
                }, 100);
            } else {
                card.style.display = 'none';
                card.classList.remove('visible');
            }
        });
        
        // Show/hide no jobs message
        if (noJobsMessage) {
            noJobsMessage.style.display = visibleJobs === 0 ? 'block' : 'none';
        }
        
        // Update job count
        const jobCountElement = document.querySelector('.job-count');
        if (jobCountElement) {
            jobCountElement.textContent = visibleJobs;
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