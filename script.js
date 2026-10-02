// JavaScript Interactive Logic for Yusuf Muhammet YILDIRIM - Senior iOS Developer Portfolio

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DYNAMIC TYPEWRITER EFFECT ---
    const typingElement = document.getElementById('typing-text');
    const phrases = [
        'Senior iOS Developer',
        'Swift, SwiftUI & UIKit Uzmanı',
        'SPM Modüler Mimari & Clean Code',
        'VIPER, MVVM-C & Swift Concurrency'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at full phrase
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    if (typingElement) {
        typeEffect();
    }

    // --- 2. MOBILE DRAWER MENU TOGGLE ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // --- 3. WHATSAPP CONTACT FORM SUBMISSION HANDLER ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subjectSelect = document.getElementById('subject');
            const subjectText = subjectSelect.options[subjectSelect.selectedIndex].text;
            const message = document.getElementById('message').value.trim();

            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<i class="fa-solid fa-circle-notch animate-spin"></i> <span>WhatsApp Yönlendiriliyor...</span>`;

            // WhatsApp Message Format
            const rawMessage = `Merhaba Yusuf Bey,\n\n*Ad Soyad:* ${name}\n*E-Posta:* ${email}\n*Konu:* ${subjectText}\n\n*Mesaj:* ${message}`;
            const whatsappPhoneNumber = '905445045122';
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappPhoneNumber}&text=${encodeURIComponent(rawMessage)}`;

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;

                formStatus.classList.remove('hidden', 'bg-red-500/10', 'text-red-400');
                formStatus.classList.add('bg-[#25D366]/10', 'text-[#25D366]', 'border', 'border-[#25D366]/30');
                formStatus.innerHTML = `<i class="fa-brands fa-whatsapp mr-2"></i> WhatsApp açılıyor... Mesajınızı onaylayarak gönderebilirsiniz.`;

                // Open WhatsApp in a new window/tab
                window.open(whatsappUrl, '_blank');

                setTimeout(() => {
                    formStatus.classList.add('hidden');
                    contactForm.reset();
                }, 4000);
            }, 800);
        });
    }

    // --- 4. SCROLL INTERSECTION OBSERVER FOR ACTIVE NAV ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNavOnScroll() {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active-nav');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active-nav');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavOnScroll);

});
