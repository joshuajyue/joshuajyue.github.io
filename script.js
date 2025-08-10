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
        
        // Force a section class - default to hero if no section detected
        if (!current) {
            current = 'hero';
        }
        updateColorScheme(current);
        
        // Force navbar background update
        setTimeout(() => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                navbar.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--nav-bg');
            }
        }, 10);
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

// Navbar background on scroll with dynamic colors
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    // Get current section to determine color
    const sections = document.querySelectorAll('section[id]');
    let current = 'hero'; // Default to hero
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    // Update color scheme first to ensure CSS variables are current
    updateColorScheme(current);
    
    // Small delay to ensure CSS variables are updated before reading them
    setTimeout(() => {
        const rootStyles = getComputedStyle(document.documentElement);
        const primaryColor = rootStyles.getPropertyValue('--primary-color').trim();
        
        if (window.scrollY > 50) {
            if (currentTheme === 'dark') {
                navbar.style.backgroundColor = `rgba(31, 41, 55, 0.98)`;
                navbar.style.borderBottomColor = primaryColor;
            } else {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
                navbar.style.borderBottomColor = primaryColor;
            }
        } else {
            if (currentTheme === 'dark') {
                navbar.style.backgroundColor = 'rgba(31, 41, 55, 0.95)';
                navbar.style.borderBottomColor = primaryColor;
            } else {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                navbar.style.borderBottomColor = primaryColor;
            }
        }
    }, 10);
});

// Function to update color scheme
function updateColorScheme(sectionId) {
    const body = document.body;
    
    // Remove all existing section classes
    body.classList.remove('section-hero', 'section-about', 'section-skills', 'section-projects', 'section-contact');
    
    // Add the new section class
    body.classList.add(`section-${sectionId}`);
    
    // Update navbar border color immediately after color scheme change
    setTimeout(() => {
        const navbar = document.querySelector('.navbar');
        const rootStyles = getComputedStyle(document.documentElement);
        const primaryColor = rootStyles.getPropertyValue('--primary-color').trim();
        navbar.style.borderBottomColor = primaryColor;
    }, 50); // Small delay to ensure CSS variables are updated
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

    // Update navigation highlighting
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

// Timeline animations
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('timeline-animate');
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
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
    
    // Initialize timeline animations
    initTimelineAnimations();
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
// Removed parallax effect on hero image to prevent movement during scroll

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

// Progressive Sine Wave Generator
function initProgressiveMathFunctions() {
    const svg = document.getElementById('sine-wave-svg');
    const path1 = document.getElementById('sine-path');
    const path2 = document.getElementById('sine-path-2');
    
    if (!svg || !path1 || !path2) return;
    
    // Set SVG dimensions
    const updateSVGSize = () => {
        svg.setAttribute('width', window.innerWidth);
        svg.setAttribute('height', window.innerHeight);
        svg.setAttribute('viewBox', `0 0 ${window.innerWidth} ${window.innerHeight}`);
    };
    
    updateSVGSize();
    window.addEventListener('resize', updateSVGSize);
    
    // Sine wave parameters
    const amplitude = 80;
    const frequency1 = 0.008; // Slower frequency for first wave
    const frequency2 = 0.009; // Slightly different frequency for second wave to create subtle desync
    const centerY = window.innerHeight / 2;
    const centerY2 = window.innerHeight / 2 + 150;
    
    function generateSineWave(maxX, centerY, frequency, phaseOffset = 0) {
        const points = [];
        points.push(`M 0 ${centerY}`);
        
        for (let x = 5; x <= maxX; x += 5) {
            const y = centerY + amplitude * Math.sin((x * frequency) + phaseOffset);
            points.push(`L ${x} ${y}`);
        }
        
        return points.join(' ');
    }
    
    function updateSineWaves() {
        // Calculate scroll percentage (0 to 1)
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.min(scrollTop / docHeight, 1);
        const maxX = window.innerWidth * scrollPercent;
        
        // Generate sine waves that draw progressively as user scrolls
        const path1Data = generateSineWave(maxX, centerY, frequency1, 0);
        const path2Data = generateSineWave(maxX, centerY2, frequency2, Math.PI / 3);
        
        // Update the paths
        path1.setAttribute('d', path1Data);
        path2.setAttribute('d', path2Data);
    }
    
    // Throttled scroll handler for performance
    let ticking = false;
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateSineWaves();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // Initialize and bind events
    updateSineWaves();
    window.addEventListener('scroll', handleScroll, { passive: true });
}

// Page initialization - ensure proper display
document.addEventListener('DOMContentLoaded', () => {
    // Initialize typing animation for hero title
    initTypeWriter();
    
    // Initialize color scheme
    updateColorScheme('hero');
    
    // Initialize timeline animations
    initTimelineAnimations();
    
    // Initialize sine wave animation
    initProgressiveMathFunctions();
});
