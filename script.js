document.addEventListener('DOMContentLoaded', function() {
    const languageToggle = document.getElementById('languageToggle');
    const htmlElement = document.documentElement; // Get the <html> element

    // Function to set the language
    function setLanguage(language) {
        const elementsToHide = (language === 'pt') ? document.querySelectorAll('.lang-en') : document.querySelectorAll('.lang-pt');
        const elementsToShow = (language === 'pt') ? document.querySelectorAll('.lang-pt') : document.querySelectorAll('.lang-en');

        elementsToHide.forEach(el => el.style.display = 'none');
        elementsToShow.forEach(el => el.style.display = ''); // Reset to default display (inline, block, etc.)

        // Update the lang attribute on the <html> tag
        htmlElement.lang = (language === 'pt') ? 'pt-PT' : 'en-US';

        // Update toggle state
        languageToggle.checked = (language === 'pt');

        // Save preference to localStorage
        localStorage.setItem('preferredLanguage', language);

        // Update footer year (handle both span types)
        const currentYear = new Date().getFullYear();
        document.getElementById('current-year').textContent = currentYear;
        // Use querySelectorAll for class-based selection
        document.querySelectorAll('.current-year-pt').forEach(span => span.textContent = currentYear);
    }

    // Event listener for the toggle switch
    languageToggle.addEventListener('change', function() {
        const selectedLanguage = this.checked ? 'pt' : 'en';
        setLanguage(selectedLanguage);
    });

    // Check localStorage for saved preference on page load
    const savedLanguage = localStorage.getItem('preferredLanguage');
    // Set initial language (default to 'en' if nothing is saved or invalid)
    const initialLanguage = (savedLanguage === 'pt') ? 'pt' : 'en';
    setLanguage(initialLanguage);

     // Ensure footer year is set initially regardless of language load
     const currentYear = new Date().getFullYear();
     document.getElementById('current-year').textContent = currentYear;
     document.querySelectorAll('.current-year-pt').forEach(span => span.textContent = currentYear);

});