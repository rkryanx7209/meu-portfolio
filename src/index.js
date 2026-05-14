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

        console.log('✅ Site carregado! Projetos disponíveis:', document.querySelectorAll('.project-card').length);