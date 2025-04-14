// FAQ Toggles
document.addEventListener('DOMContentLoaded', function() {
    // FAQ Toggle functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const item = question.parentNode;
                item.classList.toggle('active');
            });
        });
    }

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real application, you would handle the form submission here
            alert('Thank you for your message. We will get back to you soon!');
            this.reset();
        });
    }

    // Pricing toggle for monthly/annual billing
    const billingToggle = document.getElementById('billing-toggle');
    if (billingToggle) {
        const monthlyLabel = document.getElementById('monthly-label');
        const annualLabel = document.getElementById('annual-label');
        const saveBadge = document.getElementById('save-badge');
        
        // Pricing elements
        const amateurPrice = document.getElementById('amateur-price');
        const proPrice = document.getElementById('pro-price');
        const teamPrice = document.getElementById('team-price');
        const amateurDescription = document.getElementById('amateur-description');
        const proDescription = document.getElementById('pro-description');
        const teamDescription = document.getElementById('team-description');
        const amateurSavings = document.getElementById('amateur-savings');
        const proSavings = document.getElementById('pro-savings');
        const teamSavings = document.getElementById('team-savings');

        billingToggle.addEventListener('change', function() {
            if (this.checked) {
                // Annual pricing
                monthlyLabel.classList.remove('active');
                annualLabel.classList.add('active');
                saveBadge.style.display = 'inline';
                
                if (amateurPrice) amateurPrice.innerHTML = 'FREE<span>/month</span>';
                if (proPrice) proPrice.innerHTML = '$12<span>/month</span>';
                if (teamPrice) teamPrice.innerHTML = '$24<span>/month</span>';
                
                if (amateurDescription) amateurDescription.textContent = 'Billed annually';
                if (proDescription) proDescription.textContent = 'Billed annually';
                if (teamDescription) teamDescription.textContent = 'Billed annually';
                
                if (amateurSavings) amateurSavings.style.display = 'block';
                if (proSavings) proSavings.style.display = 'block';
                if (teamSavings) teamSavings.style.display = 'block';
            } else {
                // Monthly pricing
                monthlyLabel.classList.add('active');
                annualLabel.classList.remove('active');
                saveBadge.style.display = 'none';
                
                if (amateurPrice) amateurPrice.innerHTML = 'FREE<span>/month</span>';
                if (proPrice) proPrice.innerHTML = '$15<span>/month</span>';
                if (teamPrice) teamPrice.innerHTML = '$30<span>/month</span>';
                
                if (amateurDescription) amateurDescription.textContent = 'Billed monthly';
                if (proDescription) proDescription.textContent = 'Billed monthly';
                if (teamDescription) teamDescription.textContent = 'Billed monthly';
                
                if (amateurSavings) amateurSavings.style.display = 'none';
                if (proSavings) proSavings.style.display = 'none';
                if (teamSavings) teamSavings.style.display = 'none';
            }
        });
    }
}); 