// ========== STATS DINÂMICOS ==========

// Função para contar projetos automaticamente
function atualizarContadorProjetos() {
    const projetos = document.querySelectorAll('.project-card').length;
    const projetosCount = document.getElementById('projetos-count');
    if (projetosCount) {
        animateNumber(projetosCount, projetos);
    }
}

// Função para contar tecnologias únicas dos projetos
function atualizarContadorTecnologias() {
    const techs = new Set();
    document.querySelectorAll('.project-tech span').forEach(tech => {
        techs.add(tech.textContent.trim());
    });
    const tecnologiasCount = document.getElementById('tecnologias-count');
    if (tecnologiasCount) {
        animateNumber(tecnologiasCount, techs.size);
    }
}

// Função para calcular anos de estudo (até Dezembro de 2026)
function atualizarAnosEstudo() {
    const dataInicio = new Date(2024, 0, 1);
    const dataFim = new Date(2026, 11, 31);
    const hoje = new Date();
    
    let anosEstudo;
    if (hoje >= dataFim) {
        anosEstudo = 3;
    } else {
        const diffMeses = (hoje.getFullYear() - dataInicio.getFullYear()) * 12 + (hoje.getMonth() - dataInicio.getMonth());
        anosEstudo = Math.max(0, diffMeses / 12);
    }
    
    const estudoCount = document.getElementById('estudo-count');
    if (estudoCount) {
        animateNumber(estudoCount, parseFloat(anosEstudo.toFixed(1)));
    }
}

// Função para animar a dedicação (vai de 0 até 100)
function atualizarDedicacao() {
    const dedicacaoCount = document.getElementById('dedicacao-count');
    if (dedicacaoCount) {
        animateNumber(dedicacaoCount, 100);
    }
}

// Função de animação de número
function animateNumber(element, target) {
    let current = 0;
    const increment = target / 50;
    const updateNumber = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = target;
        }
    };
    updateNumber();
}

// ========== THEME TOGGLE ==========
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

function toggleTheme() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'light');
        if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        htmlElement.setAttribute('data-theme', 'dark');
        if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// ========== TYPEWRITER EFFECT ==========
const typewriterSpan = document.getElementById('typewriter');
if (typewriterSpan) {
    const names = ['Ryan.dev', 'Ryan'];
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

// ========== MENU MOBILE ==========
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Fechar menu ao clicar nos links
document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ========== SCROLL REVEAL ==========
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, observerOptions);
document.querySelectorAll('.container, footer').forEach(el => observer.observe(el));

// ========== ANIMAÇÃO DAS BARRAS DE HABILIDADE ==========
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.level-bar').forEach(bar => {
                const width = bar.dataset.skillWidth || bar.style.width || '0%';
                bar.style.width = '0';
                setTimeout(() => { 
                    bar.style.width = width; 
                }, 100);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll('.skills-grid').forEach(grid => skillObserver.observe(grid));

// ========== EFEITO 3D NOS CARDS ==========
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

// ========== SCROLL SUAVE ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// ========== BACK TO TOP BUTTON ==========
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ========== ANIMAÇÃO DE TEXTO AO SCROLL ==========
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

// ========== FORMULÁRIO DE CONTATO ==========
const contatoForm = document.getElementById('contato-form');
if (contatoForm) {
    contatoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const status = document.getElementById('form-status');
        const btn = contatoForm.querySelector('button');
        
        if (!btn) return;
        
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

        const data = new FormData(contatoForm);
        
        try {
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
                throw new Error('Erro no envio');
            }
        } catch (error) {
            status.style.display = 'block';
            status.style.color = '#f87171';
            status.textContent = '❌ Erro ao enviar. Tente novamente.';
        }

        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensagem';
        
        setTimeout(() => {
            status.style.display = 'none';
        }, 5000);
    });
}

// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', () => {
    atualizarContadorProjetos();
    atualizarContadorTecnologias();
    atualizarAnosEstudo();
    atualizarDedicacao();
    console.log('✅ Site carregado! Projetos disponíveis:', document.querySelectorAll('.project-card').length);
});

// ========== OBSERVAR MUDANÇAS NA DOM (ADICIONAR PROJETOS) ==========
const projetosSection = document.getElementById('projetos');
const observerProjetos = new MutationObserver(() => {
    atualizarContadorProjetos();
    atualizarContadorTecnologias();
});

if (projetosSection) {
    observerProjetos.observe(projetosSection, {
        childList: true,
        subtree: true
    });
}