// Enhanced interactions and animations
document.addEventListener('DOMContentLoaded', function() {
    
    // Projects button click handler
    // Smooth scrolling is now handled by CSS scroll-behavior and the anchor link
    // No additional JavaScript needed for the projects button

    // Skills items hover enhancement
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Add slight rotation effect
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });

    // Smooth scroll enhancement for any future anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add subtle parallax effect to background code icons
    const codeIcons = document.querySelectorAll('.code-icon');
    let animationId;
    
    function animateCodeIcons() {
        const scrollY = window.pageYOffset;
        
        codeIcons.forEach((icon, index) => {
            const speed = 0.1 + (index % 3) * 0.05;
            const yPos = scrollY * speed;
            icon.style.transform = `translateY(${yPos}px) rotate(${Math.sin(Date.now() * 0.001 + index) * 5}deg)`;
        });
        
        animationId = requestAnimationFrame(animateCodeIcons);
    }
    
    // Start animation only if user prefers motion
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        animateCodeIcons();
    }

    // Social icons enhanced hover effect
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1) rotate(5deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Add typing effect to the role subtitle (optional enhancement)
    const roleSubtitle = document.querySelector('.role-subtitle');
    if (roleSubtitle) {
        const originalText = roleSubtitle.textContent;
        let currentText = '';
        let i = 0;
        
        // Clear the text initially
        roleSubtitle.textContent = '';
        
        // Add cursor
        roleSubtitle.innerHTML = '<span class="typing-cursor">|</span>';
        
        function typeWriter() {
            if (i < originalText.length) {
                currentText += originalText.charAt(i);
                roleSubtitle.innerHTML = currentText + '<span class="typing-cursor">|</span>';
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    roleSubtitle.textContent = originalText;
                }, 1000);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 1000);
    }

    // Add smooth entrance animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe content blocks for entrance animations
    document.querySelectorAll('.content-block, .skills-section, .social-links').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// CSS for entrance animations (added via JavaScript)
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .typing-cursor {
        animation: blink 1s infinite;
        font-weight: normal;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`;
document.head.appendChild(style);