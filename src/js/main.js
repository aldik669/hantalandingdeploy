// ===== LOADING PROGRESS BAR =====
function initLoadingProgress() {
    const loadingProgress = document.getElementById('loading-progress');
    
    if (!loadingProgress) return;
    
    // Simple loading with delay
    setTimeout(() => {
        loadingProgress.classList.add('hidden');
        setTimeout(() => {
            loadingProgress.style.display = 'none';
            initPageAnimations();
        }, 500);
    }, 1500); // Show loading for 1.5 seconds
}

// ===== SKELETON LOADING =====
function initSkeletonLoading() {
    const skeletonElements = document.querySelectorAll('.skeleton');
    
    // Show skeleton while content loads
    skeletonElements.forEach(element => {
        element.style.display = 'block';
    });
    
    // Hide skeleton when content is ready
    window.addEventListener('load', () => {
        setTimeout(() => {
            skeletonElements.forEach(element => {
                element.style.display = 'none';
            });
        }, 1000);
    });
}

// ===== ENHANCED PAGE ANIMATIONS =====
function initPageAnimations() {
    // Intersection Observer for sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Parallax effect for background elements
    const parallaxElements = document.querySelectorAll('.parallax-shape');
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
        });
        
        ticking = false;
    }
    
    function requestParallaxTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestParallaxTick, { passive: true });
}

// ===== ENHANCED MOBILE GESTURES =====
function initMobileGestures() {
    // Swipe gestures for carousel
    let touchStartX = 0;
    let touchEndX = 0;
    
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        carouselContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next
                    console.log('Swipe left - next card');
                    // Add your carousel next logic here
                } else {
                    // Swipe right - previous
                    console.log('Swipe right - previous card');
                    // Add your carousel previous logic here
                }
            }
        }
    }
    
    // Pull-to-refresh functionality
    let pullStartY = 0;
    let pullDistance = 0;
    const pullThreshold = 100;
    
    document.addEventListener('touchstart', (e) => {
        if (window.pageYOffset === 0) {
            pullStartY = e.touches[0].clientY;
        }
    }, { passive: true });
    
    document.addEventListener('touchmove', (e) => {
        if (window.pageYOffset === 0 && pullStartY > 0) {
            pullDistance = e.touches[0].clientY - pullStartY;
            
            if (pullDistance > 0) {
                e.preventDefault();
                document.body.style.transform = `translateY(${Math.min(pullDistance * 0.5, pullThreshold)}px)`;
            }
        }
    }, { passive: false });
    
    document.addEventListener('touchend', () => {
        if (pullDistance > pullThreshold) {
            // Trigger refresh
            console.log('Pull-to-refresh triggered');
            location.reload();
        }
        
        // Reset
        document.body.style.transform = '';
        pullStartY = 0;
        pullDistance = 0;
    }, { passive: true });
    
    // Enhanced touch feedback
    const touchElements = document.querySelectorAll('.btn, .click-button, .accordion-header, .carousel-nav, .mobile-nav-link');
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        }, { passive: true });
        
        element.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        }, { passive: true });
    });
}

// Initialize all enhancements
document.addEventListener('DOMContentLoaded', () => {
    initLoadingProgress();
    initSkeletonLoading();
    initMobileGestures();
    initPurpleGlowSpots();
    initMobileOptimizations();
});

// Optimized Custom Cursor with throttling
const cursor = document.querySelector('.cursor');

if (cursor) {
    let mouseMoveThrottled = false;
    
    document.addEventListener('mousemove', (e) => {
        if (!mouseMoveThrottled) {
            requestAnimationFrame(() => {
                cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
                mouseMoveThrottled = false;
            });
            mouseMoveThrottled = true;
        }
    }, { passive: true });

    document.addEventListener('mousedown', () => {
        cursor.style.transform += ' scale(0.8)';
    }, { passive: true });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = cursor.style.transform.replace(' scale(0.8)', '');
    }, { passive: true });
}

// Auto-animate stats section when in viewport
document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.stats-section');
    const statCards = document.querySelectorAll('.stat-card');
    
    if (statsSection && statCards.length > 0) {
        // Set card indices for staggered animation
        statCards.forEach((card, index) => {
            card.style.setProperty('--card-index', index);
        });
        
        // Create Intersection Observer for stats section
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add animation class when section comes into view
                    entry.target.classList.add('in-view');
                    
                    // Unobserve after animation is triggered
                    statsObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2, // Trigger when 20% of section is visible
            rootMargin: '0px 0px -100px 0px'
        });
        
        // Start observing the stats section
        statsObserver.observe(statsSection);
    }
});

// Accordion functionality
document.addEventListener('DOMContentLoaded', () => {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other accordion items
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
});

// Click Button Ripple Effect and Scroll
document.addEventListener('DOMContentLoaded', () => {
    const clickButton = document.querySelector('.click-button');
    
    if (clickButton) {
        // Функция создания эффекта кругов при клике
        function createClickRipple(e) {
            // Предотвращаем стандартное поведение ссылки
            e.preventDefault();
            
            const rippleContainer = document.createElement('div');
            rippleContainer.className = 'click-ripple';
            
            // Создаем 4 больших круга без задержек но разных размеров
            for (let i = 0; i < 4; i++) {
                const circle = document.createElement('div');
                circle.className = 'ripple-circle';
                circle.style.animationDelay = '0s'; // Все круги начинаются сразу
                circle.style.borderColor = `rgba(255, 255, 255, ${0.9 - i * 0.15})`;
                circle.style.borderWidth = `${4 - i}px`;
                // Разные финальные размеры для каждого круга
                circle.style.setProperty('--final-size', `${200 + i * 50}px`);
                rippleContainer.appendChild(circle);
            }
            
            clickButton.appendChild(rippleContainer);
            
            // Удаляем эффект через 2 секунды
            setTimeout(() => {
                if (rippleContainer.parentNode) {
                    rippleContainer.remove();
                }
            }, 2000);
            
            // Скролл к форме после завершения анимации
            setTimeout(() => {
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 800); // Скролл начинается через 0.8 секунды
        }
        
        // Добавляем обработчик клика
        clickButton.addEventListener('click', createClickRipple);
    }
});

// Optimized Header scroll effect with throttling
const header = document.querySelector('.header');

if (header) {
    let scrollThrottled = false;
    
    window.addEventListener('scroll', () => {
        if (!scrollThrottled) {
            requestAnimationFrame(() => {
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                scrollThrottled = false;
            });
            scrollThrottled = true;
        }
    }, { passive: true });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
            
            // Handle elements with delay
            const delay = entry.target.getAttribute('data-delay');
            if (delay) {
                entry.target.style.animationDelay = `${delay}ms`;
            }
            
            // Animate numbers if it's a stat number or trust number
            if (entry.target.classList.contains('stat-number') || entry.target.classList.contains('trust-number')) {
                animateNumber(entry.target);
            }
            
            // Unobserve element after animation to save performance
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements - убираем .stat-number из наблюдателя для новых карточек
document.querySelectorAll('.animate-slide-up, .method-card, .exam-card, .success-card, .trust-number').forEach(el => {
    observer.observe(el);
});

// Number Animation
function animateNumber(element) {
    const target = parseInt(element.getAttribute('data-target'));
    
    // Если нет data-target атрибута, не анимируем
    if (!target || isNaN(target)) {
        return;
    }
    
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateNumber = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.round(current);
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = target;
        }
    };
    
    updateNumber();
}

// Mobile Navigation
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks && !e.target.closest('.nav-container')) {
        navLinks.classList.remove('active');
    }
});

// Smooth Scrolling (except click-button)
document.querySelectorAll('a[href^="#"]:not(.click-button)').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        if (navLinks) {
            navLinks.classList.remove('active');
        }

        const href = this.getAttribute('href');
        if (href && href !== '#') {
            const target = document.querySelector(href);
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            }
        }
    });
});

// Form Animations
const formInputs = document.querySelectorAll('.animate-input');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Phone number formatting
const phoneInput = document.querySelector('input[type="tel"]');

if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.length <= 1) {
                value = '+7 (' + value;
            } else if (value.length <= 4) {
                value = '+7 (' + value.substring(1);
            } else if (value.length <= 7) {
                value = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4);
            } else if (value.length <= 9) {
                value = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7) + '-' + value.substring(7);
            } else {
                value = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7) + '-' + value.substring(7, 9) + '-' + value.substring(9, 11);
            }
        }
        e.target.value = value;
    });
}

// Contact Form Submission
const contactForm = document.querySelector('#contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const button = this.querySelector('.submit-btn');
        const originalContent = button.innerHTML;
        
        // Get form data
        const firstName = this.querySelector('#firstName').value;
        const lastName = this.querySelector('#lastName').value;
        const phone = this.querySelector('#phone').value;
        
        // Add loading state
        if (button) {
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
        }
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            if (button) {
                button.innerHTML = '<i class="fas fa-check"></i> <span>Message Sent!</span>';
                button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                
                // Reset form after delay
                setTimeout(() => {
                    this.reset();
                    if (button) {
                        button.disabled = false;
                        button.innerHTML = originalContent;
                        button.style.background = 'linear-gradient(135deg, var(--primary-color), #4f46e5)';
                    }
                }, 3000);
            }
        }, 2000);
    });
}

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

function setActiveNavItem() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveNavItem);
window.addEventListener('load', setActiveNavItem);

// Hover Animations for Cards
document.querySelectorAll('.method-card, .exam-card, .success-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = 'var(--shadow-lg)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'var(--shadow)';
    });
});

// Add animation classes
document.addEventListener('DOMContentLoaded', () => {
    // Animate title on load
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        mainTitle.classList.add('animate-in');
    }

    // Animate university logos
    const logos = document.querySelectorAll('.university-logos img');
    logos.forEach((logo, index) => {
        setTimeout(() => {
            logo.style.opacity = '1';
        }, index * 200);
    });
});

// Language switcher functionality is now handled by i18n.js

// Parallax Effect for Hero Section
const heroContent = document.querySelector('.hero-content');
const shapes = document.querySelectorAll('.shape');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    shapes.forEach(shape => {
        shape.style.transform = `translateY(${scrolled * 0.4}px)`;
    });
});

// Service Card Hover Effect
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        const icon = card.querySelector('.card-icon i');
        if (icon) {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
        }
    });

    card.addEventListener('mouseleave', (e) => {
        const icon = card.querySelector('.card-icon i');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
}); 

// Carousel functionality moved to inline script in HTML

// Exam links functionality - открытие аккордеонов
const examLinks = document.querySelectorAll('.exam-link');
examLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        const targetAccordion = document.getElementById(targetId);
        
        if (targetAccordion) {
            // Скролл к секции
            targetAccordion.scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
            
            // Закрыть все аккордеоны
            const allAccordions = document.querySelectorAll('.accordion-item');
            allAccordions.forEach(accordion => {
                accordion.classList.remove('active');
            });
            
            // Открыть целевой аккордеон
            setTimeout(() => {
                targetAccordion.classList.add('active');
            }, 500);
        }
    });
});

// Logo click functionality - скролл к началу страницы
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Плавный скролл к началу страницы
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Mobile Navigation Functionality
let mobileMenuBtn, mobileNav, mobileOverlay, mobileCloseBtn, mobileNavLinks, mobileNavLogo;

function openMobileMenu() {
    console.log('Opening mobile menu...');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.classList.add('active');
        console.log('Menu button activated');
    }
    
    if (mobileNav) {
        mobileNav.classList.add('active');
        // FORCE FIX CSS WHEN OPENING
        mobileNav.style.setProperty('backdrop-filter', 'none', 'important');
        mobileNav.style.setProperty('-webkit-backdrop-filter', 'none', 'important');
        mobileNav.style.setProperty('background', 'linear-gradient(135deg, rgba(55, 48, 163, 0.98) 0%, rgba(79, 70, 229, 0.98) 100%)', 'important');
        mobileNav.style.setProperty('z-index', '10001', 'important');
        mobileNav.style.setProperty('pointer-events', 'auto', 'important');
        
        // FORCE FIX ALL ELEMENTS INSIDE MENU
        const allMenuElements = mobileNav.querySelectorAll('*');
        allMenuElements.forEach(element => {
            element.style.setProperty('pointer-events', 'auto', 'important');
            element.style.setProperty('z-index', '10002', 'important');
        });
        
        // SPECIFIC FIXES FOR CRITICAL ELEMENTS
        const navLinks = mobileNav.querySelectorAll('.mobile-nav-link');
        navLinks.forEach(link => {
            link.style.setProperty('pointer-events', 'auto', 'important');
            link.style.setProperty('z-index', '10003', 'important');
            link.style.setProperty('position', 'relative', 'important');
            link.style.setProperty('cursor', 'pointer', 'important');
        });
        
        const closeBtn = mobileNav.querySelector('.mobile-close-btn');
        if (closeBtn) {
            closeBtn.style.setProperty('pointer-events', 'auto', 'important');
            closeBtn.style.setProperty('z-index', '10003', 'important');
            closeBtn.style.setProperty('cursor', 'pointer', 'important');
        }
        
        const langLinks = mobileNav.querySelectorAll('.mobile-lang-switch a');
        langLinks.forEach(link => {
            link.style.setProperty('pointer-events', 'auto', 'important');
            link.style.setProperty('z-index', '10003', 'important');
            link.style.setProperty('cursor', 'pointer', 'important');
        });
        
        // FORCE RE-ACTIVATE ALL EVENT LISTENERS AFTER MENU OPENS
        setTimeout(() => {
            console.log('Re-activating event listeners for menu elements...');
            
            // Simple approach: just force all elements to be clickable
            const allClickableElements = mobileNav.querySelectorAll('a, button');
            allClickableElements.forEach(element => {
                element.style.setProperty('pointer-events', 'auto', 'important');
                element.style.setProperty('z-index', '10003', 'important');
                element.style.setProperty('cursor', 'pointer', 'important');
                element.style.setProperty('position', 'relative', 'important');
                
                // Add click handler if not already present
                if (!element.hasAttribute('data-click-handler-added')) {
                    element.setAttribute('data-click-handler-added', 'true');
                    
                    element.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('🎯 ELEMENT CLICKED:', this.textContent || this.className);
                        
                        // Handle navigation links
                        if (this.classList.contains('mobile-nav-link')) {
                            const targetId = this.getAttribute('href');
                            if (targetId && targetId.startsWith('#')) {
                                const targetElement = document.querySelector(targetId);
                                if (targetElement) {
                                    closeMobileMenu();
                                    setTimeout(() => {
                                        targetElement.scrollIntoView({
                                            behavior: 'smooth',
                                            block: 'start'
                                        });
                                    }, 300);
                                }
                            }
                        }
                        
                        // Handle language switcher
                        if (this.closest('.mobile-lang-switch')) {
                            const lang = this.textContent.toLowerCase();
                            console.log('Switching language to:', lang);
                            
                            if (window.i18n && typeof window.i18n.setLanguage === 'function') {
                                window.i18n.setLanguage(lang === 'ru' ? 'ru' : 'en');
                            } else {
                                document.documentElement.lang = lang;
                            }
                            
                            closeMobileMenu();
                        }
                        
                        // Handle close button
                        if (this.classList.contains('mobile-close-btn')) {
                            closeMobileMenu();
                        }
                    });
                    
                    element.addEventListener('touchstart', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('🎯 ELEMENT TOUCHED:', this.textContent || this.className);
                        
                        // Same logic as click
                        if (this.classList.contains('mobile-nav-link')) {
                            const targetId = this.getAttribute('href');
                            if (targetId && targetId.startsWith('#')) {
                                const targetElement = document.querySelector(targetId);
                                if (targetElement) {
                                    closeMobileMenu();
                                    setTimeout(() => {
                                        targetElement.scrollIntoView({
                                            behavior: 'smooth',
                                            block: 'start'
                                        });
                                    }, 300);
                                }
                            }
                        }
                        
                        if (this.closest('.mobile-lang-switch')) {
                            const lang = this.textContent.toLowerCase();
                            console.log('Switching language to:', lang);
                            
                            if (window.i18n && typeof window.i18n.setLanguage === 'function') {
                                window.i18n.setLanguage(lang === 'ru' ? 'ru' : 'en');
                            } else {
                                document.documentElement.lang = lang;
                            }
                            
                            closeMobileMenu();
                        }
                        
                        if (this.classList.contains('mobile-close-btn')) {
                            closeMobileMenu();
                        }
                    }, { passive: false });
                }
            });
            
            console.log('✅ Event listeners re-activated for', allClickableElements.length, 'elements');
        }, 100);
        
        console.log('Mobile nav activated with forced CSS fixes');
    }
    
    if (mobileOverlay) {
        mobileOverlay.classList.add('active');
        mobileOverlay.style.setProperty('z-index', '10000', 'important');
        mobileOverlay.style.setProperty('pointer-events', 'auto', 'important');
        console.log('Overlay activated');
    }
    
    document.body.style.overflow = 'hidden';
    console.log('Mobile menu opened successfully');
}

function closeMobileMenu() {
    console.log('Closing mobile menu...');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.classList.remove('active');
        console.log('Menu button deactivated');
    }
    
    if (mobileNav) {
        mobileNav.classList.remove('active');
        console.log('Mobile nav deactivated');
    }
    
    if (mobileOverlay) {
        mobileOverlay.classList.remove('active');
        mobileOverlay.style.setProperty('pointer-events', 'none', 'important');
        console.log('Overlay deactivated');
    }
    
    document.body.style.overflow = '';
    console.log('Mobile menu closed successfully');
}

// Initialize mobile menu functionality
function initMobileMenu() {
    mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    mobileNav = document.querySelector('.mobile-nav');
    mobileOverlay = document.querySelector('.mobile-overlay');
    mobileCloseBtn = document.querySelector('.mobile-close-btn');
    mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLogo = document.querySelector('.mobile-logo');

    console.log('Mobile menu elements found:', {
        btn: !!mobileMenuBtn,
        nav: !!mobileNav,
        overlay: !!mobileOverlay,
        closeBtn: !!mobileCloseBtn,
        links: mobileNavLinks.length
    });

    // FORCE FIX CSS STYLES
    if (mobileNav) {
        // Force remove backdrop-filter and fix styles
        mobileNav.style.setProperty('backdrop-filter', 'none', 'important');
        mobileNav.style.setProperty('-webkit-backdrop-filter', 'none', 'important');
        mobileNav.style.setProperty('background', 'linear-gradient(135deg, rgba(55, 48, 163, 0.98) 0%, rgba(79, 70, 229, 0.98) 100%)', 'important');
        mobileNav.style.setProperty('z-index', '10001', 'important');
        mobileNav.style.setProperty('pointer-events', 'auto', 'important');
        console.log('✅ Forced CSS fixes applied to mobile-nav');
    }

    if (mobileOverlay) {
        mobileOverlay.style.setProperty('z-index', '10000', 'important');
        mobileOverlay.style.setProperty('pointer-events', 'none', 'important');
        console.log('✅ Forced CSS fixes applied to mobile-overlay');
    }

    // Event listeners for mobile menu button - multiple event types for better compatibility
if (mobileMenuBtn) {
        // Click event
        mobileMenuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mobile menu button clicked');
            openMobileMenu();
        });

        // Touch events for better mobile compatibility
        mobileMenuBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mobile menu button touched');
            openMobileMenu();
        }, { passive: false });

        // Mouse events as fallback
        mobileMenuBtn.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mobile menu button mousedown');
            openMobileMenu();
        });
}

if (mobileCloseBtn) {
        mobileCloseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mobile close button clicked');
            closeMobileMenu();
        });

        mobileCloseBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mobile close button touched');
            closeMobileMenu();
        }, { passive: false });
}

if (mobileOverlay) {
        mobileOverlay.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mobile overlay clicked');
            closeMobileMenu();
        });

        mobileOverlay.addEventListener('touchstart', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mobile overlay touched');
            closeMobileMenu();
        }, { passive: false });
}

// Close mobile menu when clicking on nav links
mobileNavLinks.forEach(link => {
        // FORCE FIX CSS FOR LINKS
        link.style.setProperty('pointer-events', 'auto', 'important');
        link.style.setProperty('z-index', '10002', 'important');
        link.style.setProperty('position', 'relative', 'important');
        
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mobile nav link clicked:', link.getAttribute('href'));
        closeMobileMenu();
        
        // Smooth scroll to section
        const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                setTimeout(() => {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 300);
            }
        }
    });

        // Touch events for links
        link.addEventListener('touchstart', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mobile nav link touched:', link.getAttribute('href'));
            closeMobileMenu();
            
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    setTimeout(() => {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 300);
                }
            }
        }, { passive: false });
});

// Mobile logo click
if (mobileNavLogo) {
        // FORCE FIX CSS FOR LOGO
        mobileNavLogo.style.setProperty('pointer-events', 'auto', 'important');
        mobileNavLogo.style.setProperty('z-index', '10002', 'important');
        mobileNavLogo.style.setProperty('position', 'relative', 'important');
        
    mobileNavLogo.addEventListener('click', function(e) {
        e.preventDefault();
            e.stopPropagation();
            console.log('Mobile logo clicked');
        closeMobileMenu();
        
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 300);
    });

        mobileNavLogo.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mobile logo touched');
            closeMobileMenu();
            
            setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }, 300);
        }, { passive: false });
    }

    // FIX LANGUAGE SWITCHER
    const mobileLangSwitch = document.querySelector('.mobile-lang-switch');
    if (mobileLangSwitch) {
        console.log('Mobile language switcher found');
        
        // FORCE FIX CSS FOR LANGUAGE SWITCHER
        mobileLangSwitch.style.setProperty('pointer-events', 'auto', 'important');
        mobileLangSwitch.style.setProperty('z-index', '10002', 'important');
        mobileLangSwitch.style.setProperty('position', 'relative', 'important');
        
        const langLinks = mobileLangSwitch.querySelectorAll('a');
        langLinks.forEach(link => {
            // FORCE FIX CSS FOR EACH LANGUAGE LINK
            link.style.setProperty('pointer-events', 'auto', 'important');
            link.style.setProperty('z-index', '10003', 'important');
            link.style.setProperty('position', 'relative', 'important');
            link.style.setProperty('cursor', 'pointer', 'important');
            
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Language link clicked:', this.textContent);
                
                // Remove active class from all links
                langLinks.forEach(l => l.classList.remove('active'));
                // Add active class to clicked link
                this.classList.add('active');
                
                // Switch language
                const lang = this.textContent.toLowerCase();
                if (window.i18n && typeof window.i18n.setLanguage === 'function') {
                    window.i18n.setLanguage(lang === 'ru' ? 'ru' : 'en');
                } else {
                    console.log('i18n not available, manual language switch');
                    // Manual language switch fallback
                    document.documentElement.lang = lang;
                }
                
                closeMobileMenu();
            });
            
            link.addEventListener('touchstart', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Language link touched:', this.textContent);
                
                // Remove active class from all links
                langLinks.forEach(l => l.classList.remove('active'));
                // Add active class to clicked link
                this.classList.add('active');
                
                // Switch language
                const lang = this.textContent.toLowerCase();
                if (window.i18n && typeof window.i18n.setLanguage === 'function') {
                    window.i18n.setLanguage(lang === 'ru' ? 'ru' : 'en');
                } else {
                    console.log('i18n not available, manual language switch');
                    // Manual language switch fallback
                    document.documentElement.lang = lang;
                }
                
                closeMobileMenu();
            }, { passive: false });
        });
    }
}

// Close mobile menu on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
});

// Close mobile menu on window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 992) {
        closeMobileMenu();
    }
}); 

// Enhanced mobile functionality
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Initializing mobile functionality...');
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Additional check for mobile menu elements
    setTimeout(() => {
        const btn = document.querySelector('.mobile-menu-btn');
        const nav = document.querySelector('.mobile-nav');
        const overlay = document.querySelector('.mobile-overlay');
        
        console.log('Mobile menu elements check after 100ms:', {
            button: btn,
            nav: nav,
            overlay: overlay,
            buttonVisible: btn ? window.getComputedStyle(btn).display !== 'none' : false,
            navVisible: nav ? window.getComputedStyle(nav).display !== 'none' : false
        });
        
        // Test click simulation
        if (btn) {
            console.log('Mobile menu button found, testing click simulation...');
            // Simulate a click to test if it works
            setTimeout(() => {
                console.log('Simulating click on mobile menu button...');
                btn.click();
                setTimeout(() => {
                    console.log('Menu state after simulated click:', {
                        buttonActive: btn.classList.contains('active'),
                        navActive: nav ? nav.classList.contains('active') : false,
                        overlayActive: overlay ? overlay.classList.contains('active') : false
                    });
                    // Close menu after test
                    closeMobileMenu();
                }, 100);
            }, 200);
        }
    }, 100);
    
    // Touch gesture support for mobile
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;
        
        // Swipe up to close mobile menu
        if (diff > swipeThreshold && mobileNav && mobileNav.classList.contains('active')) {
            closeMobileMenu();
        }
    }
    
    // Improved mobile scrolling performance
    let ticking = false;
    
    function updateOnScroll() {
        // Add scroll-based animations for mobile
        const scrolled = window.pageYOffset;
        const parallax = document.querySelectorAll('.floating-shapes .shape');
        
        parallax.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // Mobile-specific optimizations
    if (window.innerWidth <= 768) {
        // Reduce animation complexity on mobile
        document.body.classList.add('mobile-device');
        
        // Optimize images for mobile
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (img.dataset.mobileSrc) {
                img.src = img.dataset.mobileSrc;
            }
        });
        
        // Add mobile-specific event listeners
        const touchElements = document.querySelectorAll('.btn, .click-button, .accordion-header');
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            }, { passive: true });
            
            element.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            }, { passive: true });
        });
    }
    
    // Lazy loading for mobile
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // Mobile form improvements
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        // Prevent zoom on focus for iOS
        input.addEventListener('focus', function() {
            if (window.innerWidth <= 768) {
                this.style.fontSize = '16px';
            }
        });
        
        input.addEventListener('blur', function() {
            if (window.innerWidth <= 768) {
                this.style.fontSize = '';
            }
        });
    });
    
    // Mobile carousel improvements
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer && window.innerWidth <= 768) {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        carouselContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        }, { passive: true });
        
        carouselContainer.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
            const diff = startX - currentX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    // Swipe left - next
                    document.querySelector('.carousel-next')?.click();
                } else {
                    // Swipe right - previous
                    document.querySelector('.carousel-prev')?.click();
                }
                isDragging = false;
            }
        }, { passive: true });
        
        carouselContainer.addEventListener('touchend', () => {
            isDragging = false;
        }, { passive: true });
    }
}); 

// ===== PURPLE GLOW SPOTS ANIMATION =====
function initPurpleGlowSpots() {
    const sectionsWithSpots = document.querySelectorAll('.stats-section, .methodology-section, .success-section, .about-section');
    const isMobile = window.innerWidth <= 768;
    
    sectionsWithSpots.forEach(section => {
        // Create additional random spots (fewer on mobile)
        const spotCount = isMobile ? 2 : 3;
        
        for (let i = 0; i < spotCount; i++) {
            const spot = document.createElement('div');
            spot.className = 'glow-spot';
            
            // Random position and size (smaller on mobile)
            const size = isMobile ? (Math.random() * 100 + 80) : (Math.random() * 150 + 100);
            const x = Math.random() * 80 + 10;
            const y = Math.random() * 80 + 10;
            const delay = Math.random() * 15; // Longer delays
            const duration = isMobile ? (Math.random() * 15 + 25) : (Math.random() * 10 + 15); // Slower on mobile
            
            spot.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${x}%;
                top: ${y}%;
                animation-delay: -${delay}s;
                animation-duration: ${duration}s;
            `;
            
            const spotsContainer = section.querySelector('.purple-glow-spots');
            if (spotsContainer) {
                spotsContainer.appendChild(spot);
            }
        }
    });
    
    // Add subtle mouse interaction (slower on mobile)
    document.addEventListener('mousemove', (e) => {
        const spots = document.querySelectorAll('.glow-spot');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        spots.forEach((spot, index) => {
            const speed = isMobile ? (index + 1) * 0.2 : (index + 1) * 0.3; // Slower on mobile
            const maxMove = isMobile ? 10 : 15; // Less movement on mobile
            const x = (mouseX - 0.5) * speed * maxMove;
            const y = (mouseY - 0.5) * speed * maxMove;
            
            spot.style.transform = `translate(${x}px, ${y}px)`;
        });
    }, { passive: true });
} 

// ===== MOBILE OPTIMIZED ANIMATIONS =====
function initMobileOptimizations() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Reduce animation complexity on mobile
        document.body.classList.add('mobile-device');
        
        // Slower parallax effects
        const parallaxElements = document.querySelectorAll('.parallax-shape, .floating-shapes .shape, .contact-floating-shapes .contact-shape');
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach((element, index) => {
                const speed = (0.3 + (index * 0.05)) * (isMobile ? 0.5 : 1); // Slower on mobile
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.05}deg)`; // Slower rotation
            });
            
            ticking = false;
        }
        
        function requestParallaxTick() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestParallaxTick, { passive: true });
        
        // Reduce motion for better performance
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            document.body.style.setProperty('--animation-duration', '0.1s');
        }
    }
} 