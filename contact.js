document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    
    // Check if the form exists
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) {
        console.error('Contact form not found!');
        return;
    }
    
    console.log('Contact form found:', contactForm);
    
    // Add a simple test to verify form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Form submitted');
        
        // Test with hardcoded values
        const testData = {
            name: 'Test User',
            email: 'test@example.com',
            subject: 'general',
            message: 'This is a test message'
        };
        
        console.log('Sending test data:', testData);
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Send test data to your API
        fetch('https://motorlytics-wa.azurewebsites.net/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
        })
        .then(response => {
            console.log('Response status:', response.status);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Response data:', data);
            contactForm.reset();
        })
        .catch(error => {
            alert('Sorry, there was an error sending your message. Please try again later.');
            console.error('Error:', error);
        })
        .finally(() => {
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
    });
}); 