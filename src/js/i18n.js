// Internationalization (i18n) System
class I18n {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'en';
        this.init();
    }

    init() {
        this.setLanguage(this.currentLang);
        this.setupLanguageSwitchers();
    }

    setLanguage(lang) {
        try {
            this.currentLang = lang;
            localStorage.setItem('language', lang);
            
            // Update HTML lang attribute
            document.documentElement.lang = lang;
            
            // Update meta tags
            this.updateMetaTags(lang);
            
            // Translate all content
            this.translatePage();
            
            // Update language switcher UI
            this.updateLanguageSwitcherUI(lang);
            
            // Update carousel cards if they exist
            setTimeout(() => {
                this.updateCarouselCards();
            }, 100);
        } catch (error) {
            console.error('Error setting language:', error);
        }
    }

    updateMetaTags(lang) {
        // Update meta language tag
        let metaLang = document.querySelector('meta[name="language"]');
        if (!metaLang) {
            metaLang = document.createElement('meta');
            metaLang.name = 'language';
            document.head.appendChild(metaLang);
        }
        metaLang.content = lang === 'ru' ? 'Russian' : 'English';

        // Update Open Graph locale
        let ogLocale = document.querySelector('meta[property="og:locale"]');
        if (!ogLocale) {
            ogLocale = document.createElement('meta');
            ogLocale.setAttribute('property', 'og:locale');
            document.head.appendChild(ogLocale);
        }
        ogLocale.content = lang === 'ru' ? 'ru_RU' : 'en_US';
    }

    translatePage() {
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            
            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Special handling for complex elements
        this.translateComplexElements();
    }

    translateComplexElements() {
        // Hero section title
        const heroTitleLine1 = document.querySelector('.hero-title-line1');
        const heroTitleLine2 = document.querySelector('.hero-title-line2');
        const heroTitleClick = document.querySelector('.hero-title-click');
        
        if (heroTitleLine1) heroTitleLine1.textContent = this.getTranslation('hero_title_line1');
        if (heroTitleLine2) heroTitleLine2.textContent = this.getTranslation('hero_title_line2');
        if (heroTitleClick) heroTitleClick.textContent = this.getTranslation('hero_title_click');

        // Hero description
        const heroDescription = document.querySelector('.hero-description');
        if (heroDescription) {
            heroDescription.innerHTML = this.getTranslation('hero_description');
        }

        // Navigation
        const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === '#about') {
                link.textContent = this.getTranslation('nav_about');
            } else if (href === '#methodology') {
                link.textContent = this.getTranslation('nav_exams');
            } else if (href === '#contact') {
                link.textContent = this.getTranslation('nav_contact');
            }
        });

        // Stats section
        const statsOverline = document.querySelector('.stats-overline');
        const statsTitle = document.querySelector('.stats-title');
        if (statsOverline) statsOverline.textContent = this.getTranslation('stats_overline');
        if (statsTitle) statsTitle.textContent = this.getTranslation('stats_title');

        // Stat cards
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach((card, index) => {
            const title = card.querySelector('.stat-title');
            const description = card.querySelector('.stat-description');
            
            if (index === 0) {
                if (title) title.textContent = this.getTranslation('stat_guarantee_title');
                if (description) description.textContent = this.getTranslation('stat_guarantee_desc');
            } else if (index === 1) {
                if (title) title.textContent = this.getTranslation('stat_years_title');
                if (description) description.textContent = this.getTranslation('stat_years_desc');
            } else if (index === 2) {
                if (title) title.textContent = this.getTranslation('stat_students_title');
                if (description) description.textContent = this.getTranslation('stat_students_desc');
            }
        });

        // Methodology section
        const methodologyOverline = document.querySelector('.exam-types-overline');
        const methodologyTitle = document.querySelector('.exam-types-title');
        if (methodologyOverline) methodologyOverline.textContent = this.getTranslation('methodology_overline');
        if (methodologyTitle) methodologyTitle.textContent = this.getTranslation('methodology_title');

        // Accordion items
        this.translateAccordionItems();

        // About section
        this.translateAboutSection();

        // Success section
        const successOverline = document.querySelector('.success-overline');
        const successTitle = document.querySelector('.success-title');
        const successSubtitle = document.querySelector('.success-subtitle');
        if (successOverline) successOverline.textContent = this.getTranslation('success_overline');
        if (successTitle) successTitle.textContent = this.getTranslation('success_title');
        if (successSubtitle) successSubtitle.textContent = this.getTranslation('success_subtitle');

        // Update testimonials in carousel
        this.updateTestimonials();

        // Contact section
        this.translateContactSection();

        // Footer
        this.translateFooter();

        // Breadcrumbs
        const breadcrumbHome = document.querySelector('.breadcrumbs span');
        if (breadcrumbHome) breadcrumbHome.textContent = this.getTranslation('breadcrumb_home');
    }

    translateAccordionItems() {
        // GMAT/GRE
        const gmatItem = document.querySelector('[data-exam="gmat"]');
        if (gmatItem) {
            const title = gmatItem.querySelector('h3');
            const subtitle = gmatItem.querySelector('.accordion-subtitle');
            const description = gmatItem.querySelector('.exam-description');
            const features = gmatItem.querySelectorAll('.feature-tag');
            
            if (title) title.textContent = this.getTranslation('gmat_title');
            if (subtitle) subtitle.textContent = this.getTranslation('gmat_subtitle');
            if (description) description.textContent = this.getTranslation('gmat_description');
            
            features.forEach((feature, index) => {
                const key = `gmat_feature${index + 1}`;
                feature.textContent = this.getTranslation(key);
            });
        }

        // TOEFL/IELTS
        const toeflItem = document.querySelector('[data-exam="toefl"]');
        if (toeflItem) {
            const title = toeflItem.querySelector('h3');
            const subtitle = toeflItem.querySelector('.accordion-subtitle');
            const description = toeflItem.querySelector('.exam-description');
            const features = toeflItem.querySelectorAll('.feature-tag');
            
            if (title) title.textContent = this.getTranslation('toefl_title');
            if (subtitle) subtitle.textContent = this.getTranslation('toefl_subtitle');
            if (description) description.textContent = this.getTranslation('toefl_description');
            
            features.forEach((feature, index) => {
                const key = `toefl_feature${index + 1}`;
                feature.textContent = this.getTranslation(key);
            });
        }

        // Admission
        const admissionItem = document.querySelector('[data-exam="admission"]');
        if (admissionItem) {
            const title = admissionItem.querySelector('h3');
            const subtitle = admissionItem.querySelector('.accordion-subtitle');
            const description = admissionItem.querySelector('.exam-description');
            const features = admissionItem.querySelectorAll('.feature-tag');
            
            if (title) title.textContent = this.getTranslation('admission_title');
            if (subtitle) subtitle.textContent = this.getTranslation('admission_subtitle');
            if (description) description.textContent = this.getTranslation('admission_description');
            
            features.forEach((feature, index) => {
                const key = `admission_feature${index + 1}`;
                feature.textContent = this.getTranslation(key);
            });
        }

        // SAT/ACT
        const satItem = document.querySelector('[data-exam="sat-act"]');
        if (satItem) {
            const title = satItem.querySelector('h3');
            const subtitle = satItem.querySelector('.accordion-subtitle');
            const description = satItem.querySelector('.exam-description');
            const features = satItem.querySelectorAll('.feature-tag');
            
            if (title) title.textContent = this.getTranslation('sat_title');
            if (subtitle) subtitle.textContent = this.getTranslation('sat_subtitle');
            if (description) description.textContent = this.getTranslation('sat_description');
            
            features.forEach((feature, index) => {
                const key = `sat_feature${index + 1}`;
                feature.textContent = this.getTranslation(key);
            });
        }
    }

    translateAboutSection() {
        const aboutOverline = document.querySelector('.about-overline');
        const aboutTitle = document.querySelector('.about-title');
        const aboutGradientText = document.querySelector('.about-title .gradient-text');
        const aboutLargeText = document.querySelector('.about-description .large-text');
        const aboutHighlight = document.querySelector('.about-description .highlight-block p');
        const aboutDescription = document.querySelector('.about-description .text-block:last-child p');
        const priceLabel = document.querySelector('.price-label');
        const priceNote = document.querySelector('.price-note');
        
        if (aboutOverline) aboutOverline.textContent = this.getTranslation('about_overline');
        if (aboutTitle) {
            const titleText = this.getTranslation('about_title');
            aboutTitle.innerHTML = `${titleText} <span class="gradient-text">${this.getTranslation('about_gradient_text')}</span>`;
        }
        if (aboutLargeText) aboutLargeText.textContent = this.getTranslation('about_large_text');
        if (aboutHighlight) aboutHighlight.textContent = this.getTranslation('about_highlight');
        if (aboutDescription) aboutDescription.textContent = this.getTranslation('about_description');
        if (priceLabel) priceLabel.textContent = this.getTranslation('price_label');
        if (priceNote) priceNote.textContent = this.getTranslation('price_note');
    }

    translateContactSection() {
        const contactHeading = document.querySelector('.contact-heading');
        const contactSubheading = document.querySelector('.contact-subheading');
        const contactHighlight = document.querySelector('.contact-subheading .highlight-text');
        const contactTelegram = document.querySelector('.contact-method-btn[href*="telegram"]');
        const contactWhatsapp = document.querySelector('.contact-method-btn[href*="whatsapp"]');
        const contactInstagram = document.querySelector('.contact-method-btn[href*="instagram"]');
        const formHeaderTitle = document.querySelector('.form-header h3');
        const formHeaderSubtitle = document.querySelector('.form-header p');
        const formNameLabel = document.querySelector('label[for="firstName"]');
        const formNameInput = document.querySelector('#firstName');
        const formPhoneLabel = document.querySelector('label[for="phone"]');
        const formPhoneInput = document.querySelector('#phone');
        const formSubmit = document.querySelector('.submit-btn span');
        
        if (contactHeading) {
            contactHeading.innerHTML = `<span>${this.getTranslation('contact_heading_line1')}</span><span>${this.getTranslation('contact_heading_line2')}</span>`;
        }
        if (contactSubheading) {
            contactSubheading.innerHTML = `${this.getTranslation('contact_subheading')} <span class="highlight-text">${this.getTranslation('contact_highlight')}</span>`;
        }
        if (contactTelegram) contactTelegram.textContent = this.getTranslation('contact_telegram');
        if (contactWhatsapp) contactWhatsapp.textContent = this.getTranslation('contact_whatsapp');
        if (contactInstagram) contactInstagram.textContent = this.getTranslation('contact_instagram');
        if (formHeaderTitle) formHeaderTitle.textContent = this.getTranslation('form_header_title');
        if (formHeaderSubtitle) formHeaderSubtitle.textContent = this.getTranslation('form_header_subtitle');
        if (formNameLabel) formNameLabel.textContent = this.getTranslation('form_name_label');
        if (formNameInput) formNameInput.placeholder = this.getTranslation('form_name_placeholder');
        if (formPhoneLabel) formPhoneLabel.textContent = this.getTranslation('form_phone_label');
        if (formPhoneInput) formPhoneInput.placeholder = this.getTranslation('form_phone_placeholder');
        if (formSubmit) formSubmit.textContent = this.getTranslation('form_submit');
    }

    translateFooter() {
        const footerDescription = document.querySelector('.footer-info p');
        const footerExamTypes = document.querySelector('.footer-links h4:first-of-type');
        const footerServices = document.querySelector('.footer-links h4:nth-of-type(2)');
        const footerContact = document.querySelector('.footer-links h4:last-of-type');
        const footerCopyright = document.querySelector('.footer-bottom p');
        
        if (footerDescription) footerDescription.textContent = this.getTranslation('footer_description');
        if (footerExamTypes) footerExamTypes.textContent = this.getTranslation('footer_exam_types');
        if (footerServices) footerServices.textContent = this.getTranslation('footer_services');
        if (footerContact) footerContact.textContent = this.getTranslation('footer_contact');
        if (footerCopyright) footerCopyright.textContent = this.getTranslation('footer_copyright');

        // Footer links
        const footerLinks = document.querySelectorAll('.footer-links a');
        footerLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === '#about') {
                link.textContent = this.getTranslation('footer_our_method');
            } else if (href === '#success') {
                link.textContent = this.getTranslation('footer_success_stories');
            } else if (href === '#contact') {
                link.textContent = this.getTranslation('footer_free_consultation');
            } else if (href === '#contact' && link.textContent.includes('Started')) {
                link.textContent = this.getTranslation('footer_get_started');
            } else if (href.includes('telegram')) {
                link.textContent = this.getTranslation('footer_telegram_support');
            } else if (href.includes('mailto')) {
                link.textContent = this.getTranslation('footer_email_us');
            }
        });
    }

    getTranslation(key) {
        return translations[this.currentLang]?.[key] || key;
    }

    updateTestimonials() {
        // Update testimonials in the carousel if it exists
        const testimonials = document.querySelectorAll('.testimonial');
        if (testimonials.length > 0) {
            // Only translate if current language is Russian
            if (this.currentLang === 'ru') {
                const testimonialKeys = ['testimonial_alex', 'testimonial_maria', 'testimonial_david', 'testimonial_sarah'];
                
                testimonials.forEach((testimonial, index) => {
                    if (index < testimonialKeys.length) {
                        const translation = this.getTranslation(testimonialKeys[index]);
                        if (translation && translation !== testimonialKeys[index]) {
                            testimonial.textContent = '"' + translation + '"';
                        }
                    }
                });
            }
        }
        
        // Update carousel cards if they exist
        this.updateCarouselCards();
    }
    
    updateCarouselCards() {
        // Check if carousel exists and update current card
        if (typeof window.currentCard !== 'undefined' && typeof window.cards !== 'undefined' && window.cards.length > 0) {
            const currentCardData = window.cards[window.currentCard];
            if (currentCardData) {
                let testimonialText = currentCardData.testimonial;
                
                // Only translate if current language is Russian
                if (this.currentLang === 'ru') {
                    const testimonialKeys = ['testimonial_alex', 'testimonial_maria', 'testimonial_david', 'testimonial_sarah'];
                    const translation = this.getTranslation(testimonialKeys[window.currentCard]);
                    
                    // Use translation if available and not equal to key
                    if (translation && translation !== testimonialKeys[window.currentCard]) {
                        testimonialText = translation;
                    }
                }
                
                // Update testimonial in both front and back cards
                const frontTestimonial = document.querySelector('.card-face.front .testimonial');
                const backTestimonial = document.querySelector('.card-face.back .testimonial');
                
                if (frontTestimonial) {
                    frontTestimonial.textContent = '"' + testimonialText + '"';
                }
                if (backTestimonial) {
                    backTestimonial.textContent = '"' + testimonialText + '"';
                }
            }
        }
    }

    setupLanguageSwitchers() {
        const languageSwitchers = document.querySelectorAll('.lang-switch, .mobile-lang-switch');
        
        languageSwitchers.forEach(switcher => {
            const links = switcher.querySelectorAll('a');
            
            links.forEach(link => {
                // Remove existing event listeners to prevent duplicates
                link.removeEventListener('click', this.handleLanguageSwitch);
                
                // Add new event listener
                link.addEventListener('click', this.handleLanguageSwitch.bind(this));
            });
        });
    }
    
    handleLanguageSwitch(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const lang = e.target.textContent.toLowerCase();
        if (lang === 'en' || lang === 'ru') {
            this.setLanguage(lang);
        }
    }

    updateLanguageSwitcherUI(lang) {
        const languageSwitchers = document.querySelectorAll('.lang-switch, .mobile-lang-switch');
        
        languageSwitchers.forEach(switcher => {
            const links = switcher.querySelectorAll('a');
            
            links.forEach(link => {
                link.classList.remove('active');
                if (link.textContent.toLowerCase() === lang) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// Initialize i18n when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.i18n = new I18n();
}); 