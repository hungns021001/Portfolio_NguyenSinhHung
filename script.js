// Init Lucide
        lucide.createIcons();
        
        // Init AOS
        AOS.init({ 
            duration: 800, 
            once: true,
            disable: 'mobile' // Tắt AOS trên mobile nếu muốn mượt hơn nữa
        });

        // Mobile Menu Logic
        const menuOpen = document.getElementById('menu-open');
        const menuClose = document.getElementById('menu-close');
        const mobileMenu = document.getElementById('mobile-menu');

        function openMenu() {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        function closeMenu() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        menuOpen.addEventListener('click', openMenu);
        menuClose.addEventListener('click', closeMenu);

        // Language Switcher
        function setLanguage(lang) {
            const viElements = document.querySelectorAll('[data-lang="vi"]');
            const enElements = document.querySelectorAll('[data-lang="en"]');
            
            // Desktop buttons
            const btnVi = document.getElementById('btn-vi');
            const btnEn = document.getElementById('btn-en');
            // Mobile buttons
            const btnViM = document.querySelector('.btn-vi-m');
            const btnEnM = document.querySelector('.btn-en-m');

            if (lang === 'vi') {
                viElements.forEach(el => el.style.display = 'inline');
                enElements.forEach(el => el.style.display = 'none');
                
                [btnVi, btnViM].forEach(b => b?.classList.add('lang-active'));
                [btnVi, btnViM].forEach(b => b?.classList.remove('text-slate-500'));
                [btnEn, btnEnM].forEach(b => b?.classList.remove('lang-active'));
                [btnEn, btnEnM].forEach(b => b?.classList.add('text-slate-500'));
                document.documentElement.lang = 'vi';
            } else {
                viElements.forEach(el => el.style.display = 'none');
                enElements.forEach(el => el.style.display = 'inline');
                
                [btnEn, btnEnM].forEach(b => b?.classList.add('lang-active'));
                [btnEn, btnEnM].forEach(b => b?.classList.remove('text-slate-500'));
                [btnVi, btnViM].forEach(b => b?.classList.remove('lang-active'));
                [btnVi, btnViM].forEach(b => b?.classList.add('text-slate-500'));
                document.documentElement.lang = 'en';
            }
        }

        // Scroll Performance
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                header.classList.add('bg-slate-950/90', 'backdrop-blur-md', 'py-1', 'border-white/5');
            } else {
                header.classList.remove('bg-slate-950/90', 'backdrop-blur-md', 'py-1', 'border-white/5');
            }
            lastScroll = currentScroll;
        });

        // Anti-shaking on resize (Fix responsive jump)
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                closeMenu();
            }
        });


  // EmailJS Configuration
        (function() {
            emailjs.init("9fKdtkLmCbRQe5Ppt");
        })();

        const contactForm = document.getElementById('contactForm');
        const submitBtn = document.getElementById('submitBtn');
        const feedback = document.getElementById('formFeedback');

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // UI Update: Loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<i data-lucide="loader-2" class="animate-spin w-5 h-5"></i> <span class="animate-pulse">ĐANG GỬI / SENDING...</span>`;
            lucide.createIcons();

            // EmailJS Service & Template IDs
            emailjs.sendForm('service_aeh47ka', 'template_7udrzrc', this)
                .then(function() {
                    // Success - Bilingual response
                    feedback.className = "text-xs text-center p-4 rounded-xl font-medium mt-4 bg-emerald-500/10 text-emerald-400 block";
                    feedback.innerHTML = `
                        <div class="font-bold">✅ GỬI THÀNH CÔNG / SENT SUCCESSFULLY!</div>
                        <div class="opacity-80">Tôi sẽ phản hồi bạn sớm nhất. / I will reply to you soon.</div>
                    `;
                    
                    submitBtn.innerText = "ĐÃ GỬI / SENT ✓";
                    contactForm.reset();
                }, function(error) {
                    console.error('EmailJS Error:', error);
                    // Error - Bilingual response
                    feedback.className = "text-xs text-center p-4 rounded-xl font-medium mt-4 bg-red-500/10 text-red-400 block";
                    feedback.innerHTML = `
                        <div class="font-bold">❌ LỖI GỬI TIN / SENDING FAILED</div>
                        <div class="opacity-80">Please try again.</div>
                    `;
                    submitBtn.disabled = false;
                    submitBtn.innerText = "THỬ LẠI / RETRY";
                })
                .finally(() => {
                    setTimeout(() => {
                        feedback.classList.add('hidden');
                        if(!submitBtn.disabled || submitBtn.innerText.includes("SENT")) {
                            submitBtn.disabled = false;
                            submitBtn.innerText = "GỬI YÊU CẦU / SEND REQUEST";
                        }
                    }, 6000);
                });
        });