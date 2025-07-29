// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('backToTop');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY > 50;
        
        // Add/remove scrolled class for navbar
        if (scrolled) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // Back to top functionality
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Active navigation highlighting based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current section's nav link
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }

    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Feature cards animation on scroll
    function animateOnScroll() {
        const cards = document.querySelectorAll('.feature-card, .roadmap-item, .contact-item');
        
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const cardVisible = 150;
            
            if (cardTop < window.innerHeight - cardVisible) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }

    // Initialize card animations
    const cards = document.querySelectorAll('.feature-card, .roadmap-item, .contact-item');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load

    // Download button click tracking
    const downloadButtons = document.querySelectorAll('.download-button, .version-download-btn, .cta-button[href*=".apk"]');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add pulse animation
            this.classList.add('pulse');
            setTimeout(() => {
                this.classList.remove('pulse');
            }, 2000);
            
            // You can add analytics tracking here if needed
            console.log('Download initiated:', this.href || this.getAttribute('href'));
        });
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Escape key to close mobile menu
        if (e.key === 'Escape') {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Intersection Observer for better performance
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.feature-card, .roadmap-item, .contact-item');
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    // Lazy loading for images (if needed)
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    images.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });

    // Add loading states for buttons
    function addLoadingState(button) {
        const originalText = button.textContent;
        button.textContent = '下載中...';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 2000);
    }

    // Form validation (if forms are added later)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Accessibility improvements
    function improveAccessibility() {
        // Add aria-labels where needed
        const navToggle = document.querySelector('.hamburger');
        if (navToggle) {
            navToggle.setAttribute('aria-label', '開啟導航選單');
            navToggle.setAttribute('role', 'button');
        }

        const backTopButton = document.querySelector('.back-to-top');
        if (backTopButton) {
            backTopButton.setAttribute('aria-label', '回到頂部');
        }

        // Add focus indicators
        const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
        focusableElements.forEach(el => {
            el.addEventListener('focus', function() {
                this.style.outline = '2px solid var(--primary)';
                this.style.outlineOffset = '2px';
            });
            
            el.addEventListener('blur', function() {
                this.style.outline = 'none';
            });
        });
    }

    // Initialize accessibility improvements
    improveAccessibility();

    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debouncing to scroll events
    const debouncedScroll = debounce(() => {
        updateActiveNavLink();
        animateOnScroll();
    }, 10);

    window.addEventListener('scroll', debouncedScroll);

    // Add copy to clipboard functionality for contact info
    const contactEmails = document.querySelectorAll('a[href^="mailto:"]');
    contactEmails.forEach(email => {
        email.addEventListener('click', function(e) {
            e.preventDefault();
            const emailAddress = this.textContent;
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(emailAddress).then(() => {
                    // Show temporary feedback
                    const originalText = this.textContent;
                    this.textContent = '已複製!';
                    setTimeout(() => {
                        this.textContent = originalText;
                    }, 2000);
                }).catch(() => {
                    // Fallback: open mail client
                    window.location.href = this.href;
                });
            } else {
                // Fallback for older browsers
                window.location.href = this.href;
            }
        });
    });

    // Initialize page
    console.log('ACG大全網站已成功載入! 🎉');
    updateActiveNavLink(); // Set initial active nav link
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('頁面錯誤:', e.error);
});

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
} 