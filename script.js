// Intersection Observer for revealing elements when they come into view
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements when they enter viewport
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and animate them
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Animate services items with staggered delay - adjusted for fewer items
    document.querySelectorAll('.services li').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.12}s`; // slightly increased delay between items
    });

    // Parallax effect on scroll
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        // Apply parallax to hero section
        document.querySelector('header').style.backgroundPositionY = scrollY * 0.5 + 'px';
        
        // Rotate and move design elements on scroll
        document.querySelectorAll('.section-graphic').forEach(element => {
            element.style.transform = `rotate(${scrollY * 0.02}deg) translateY(${scrollY * 0.05}px)`;
        });
    });

    // Add glowing effect to buttons on hover
    document.querySelectorAll('.contact-btn, .nav-cta').forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.setProperty('--x-pos', x + 'px');
            this.style.setProperty('--y-pos', y + 'px');
        });
    });

    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Typewriter effect for the tagline - modified to loop and be slower
    const tagline = document.querySelector('.tagline');
    const text = tagline.textContent;
    tagline.textContent = '';
    
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150; // Slower typing speed (was 100)
    let pauseEnd = 2000; // Pause when text is fully typed
    let pauseStart = 1000; // Pause when text is deleted

    const typeLoop = () => {
        // Current text state
        const currentText = text.substring(0, charIndex);
        tagline.textContent = currentText;
        
        // Set typing speed based on state
        if (isDeleting) {
            typingSpeed = 75; // Slightly faster when deleting
        } else {
            typingSpeed = 150; // Slower when typing
        }
        
        // Determine next state
        if (!isDeleting && charIndex === text.length) {
            // When complete, pause then start deleting
            isDeleting = true;
            typingSpeed = pauseEnd;
        } else if (isDeleting && charIndex === 0) {
            // When deletion complete, pause then restart typing
            isDeleting = false;
            typingSpeed = pauseStart;
        } else {
            // Update charIndex based on current state
            charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
        }
        
        // Loop the effect
        setTimeout(typeLoop, typingSpeed);
    };
    
    // Start the typewriter effect
    setTimeout(typeLoop, 1000);
}); 