// Dark Mode Toggle
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or default to system preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
} else if (prefersDarkScheme.matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
} else {
    document.documentElement.setAttribute('data-theme', 'light');
}

// Theme toggle functionality
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon
        const icon = themeToggle.querySelector('i');
        if (newTheme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
        
        // Update color scheme for current section
        const sections = document.querySelectorAll('section[id]');
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        if (current) {
            updateColorScheme(current);
        } else {
            updateColorScheme('hero'); // Default to hero colors
        }
    });
    
    // Set initial icon
    const icon = themeToggle.querySelector('i');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (window.scrollY > 50) {
        if (currentTheme === 'dark') {
            navbar.style.backgroundColor = 'rgba(31, 41, 55, 0.98)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        }
    } else {
        if (currentTheme === 'dark') {
            navbar.style.backgroundColor = 'rgba(31, 41, 55, 0.95)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        }
    }
});

// Dynamic Color Scheme Configuration
const colorSchemes = {
    hero: {
        light: { primary: '#2563eb', secondary: '#3b82f6', accent: '#1d4ed8' },
        dark: { primary: '#3b82f6', secondary: '#60a5fa', accent: '#2563eb' }
    },
    about: {
        light: { primary: '#059669', secondary: '#10b981', accent: '#047857' },
        dark: { primary: '#10b981', secondary: '#34d399', accent: '#059669' }
    },
    skills: {
        light: { primary: '#7c3aed', secondary: '#8b5cf6', accent: '#6d28d9' },
        dark: { primary: '#8b5cf6', secondary: '#a78bfa', accent: '#7c3aed' }
    },
    projects: {
        light: { primary: '#dc2626', secondary: '#ef4444', accent: '#b91c1c' },
        dark: { primary: '#ef4444', secondary: '#f87171', accent: '#dc2626' }
    },
    contact: {
        light: { primary: '#ea580c', secondary: '#f97316', accent: '#c2410c' },
        dark: { primary: '#f97316', secondary: '#fb923c', accent: '#ea580c' }
    }
};

// Function to update color scheme
function updateColorScheme(sectionId) {
    const root = document.documentElement;
    const theme = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const colors = colorSchemes[sectionId] || colorSchemes.hero;
    const scheme = colors[theme];
    
    if (scheme) {
        root.style.setProperty('--primary-color', scheme.primary);
        root.style.setProperty('--secondary-color-accent', scheme.secondary);
        root.style.setProperty('--accent-color', scheme.accent);
    }
}

// Active navigation link highlighting with dynamic colors
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    // Update color scheme based on current section
    if (current) {
        updateColorScheme(current);
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Here you would typically send the form data to a server
        // For now, we'll just show a success message
        alert('Thank you for your message! I\'ll get back to you soon.');
        this.reset();
    });
}

// Intersection Observer for animations
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
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.project-card, .skill-category, .about-stats .stat');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Hero title typing animation
function initTypeWriter() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const text = "Hi, I'm Joshua Yue!";
    heroTitle.textContent = ''; // Clear existing content
    heroTitle.style.opacity = '1';
    heroTitle.style.visibility = 'visible';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 80); // Typing speed
        }
    }
    
    // Start typing after a brief delay
    setTimeout(typeWriter, 500);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage) {
        const rate = scrolled * -0.5;
        heroImage.style.transform = `translateY(${rate}px)`;
    }
});

// Skills hover effect
document.querySelectorAll('.skill-item').forEach(skill => {
    skill.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    skill.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Page initialization - ensure proper display
document.addEventListener('DOMContentLoaded', () => {
    // Initialize typing animation for hero title
    initTypeWriter();
    
    // Initialize color scheme
    updateColorScheme('hero');
});
