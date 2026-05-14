 // Theme Toggle (Dark/Light)
        const themeToggle = document.getElementById('theme-toggle');
        const htmlElement = document.documentElement;
        
        function toggleTheme() {
            const currentTheme = htmlElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                htmlElement.setAttribute('data-theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                htmlElement.setAttribute('data-theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        }
        
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }

        // Typewriter Effect
        const typewriterSpan = document.getElementById('typewriter');
        if (typewriterSpan) {
            const names = ['Ryan', 'Ryan Silva', 'Ryan Santos'];
            let nameIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            
            function typeEffect() {
                const currentName = names[nameIndex];
                
                if (isDeleting) {
                    typewriterSpan.textContent = currentName.substring(0, charIndex - 1);
                    charIndex--;
                } else {
                    typewriterSpan.textContent = currentName.substring(0, charIndex + 1);
                    charIndex++;
                }
                
                if (!isDeleting && charIndex === currentName.length) {
                    isDeleting = true;
                    setTimeout(typeEffect, 2000);
                    return;
                }
                
                if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    nameIndex = (nameIndex + 1) % names.length;
                    setTimeout(typeEffect, 500);
                    return;
                }
                
                const speed = isDeleting ? 100 : 150;
                setTimeout(typeEffect, speed);
            }
            
            typeEffect();
        }

        // Menu mobile
        const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }

        // Fechar menu ao clicar
        document.querySelectorAll('#nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });

        // Scroll reveal
        const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, observerOptions);
        document.querySelectorAll('.container, footer').forEach(el => observer.observe(el));

        // Counter Animation (Stats)
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-target'));
            let count = 0;
            const increment = target / speed;
            
            const updateCount = () => {
                if (count < target) {
                    count += increment;
                    counter.innerText = Math.ceil(count);
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        };
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => counterObserver.observe(counter));

        // Animação das barras de habilidade
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.level-bar').forEach(bar => {
                        const width = getComputedStyle(bar).getPropertyValue('--skill-width').trim();
                        bar.style.width = '0';
                        setTimeout(() => { bar.style.width = width; }, 100);
                    });
                    skillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        document.querySelectorAll('.skills-grid').forEach(grid => skillObserver.observe(grid));

        // Efeito 3D nos cards
        document.querySelectorAll('.project-card, .skill-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const rotateX = (e.clientY - rect.top - rect.height / 2) / 20;
                const rotateY = (rect.width / 2 - (e.clientX - rect.left)) / 20;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
            });
        });

        // Scroll suave
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href !== '#') {
                    e.preventDefault();
                    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Back to Top Button
        const backToTopBtn = document.getElementById('back-to-top');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // Animação de texto ao scroll
        const textObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    textObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        document.querySelectorAll('p, h2, h3').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'all 0.6s ease';
            textObserver.observe(item);
        });

        // Formulário de contato
        const contatoForm = document.getElementById('contato-form');
        if (contatoForm) {
            contatoForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const status = document.getElementById('form-status');
                const btn = contatoForm.querySelector('button');
                btn.disabled = true;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

                const data = new FormData(contatoForm);
                const response = await fetch('https://formspree.io/f/xzdolgjg', {
                    method: 'POST',
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    status.style.display = 'block';
                    status.style.color = '#38bdf8';
                    status.textContent = '✅ Mensagem enviada com sucesso!';
                    contatoForm.reset();
                } else {
                    status.style.display = 'block';
                    status.style.color = '#f87171';
                    status.textContent = '❌ Erro ao enviar. Tente novamente.';
                }

                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensagem';
            });
        }

        console.log('✅ Site carregado! Projetos disponíveis:', document.querySelectorAll('.project-card').length);