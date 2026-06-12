/**
 * FUTURISTIC AIRBNB RENTAL PLATFORM
 * Cinematic Animations & Interactions
 * Minority Report + Her + Inception Aesthetic
 */

// ======================================
// CURSOR RING EFFECT
// ======================================
class CursorRing {
  constructor() {
    this.ring = document.createElement('div');
    this.ring.className = 'cursor-ring';
    document.body.appendChild(this.ring);
    
    this.x = 0;
    this.y = 0;
    this.targetX = 0;
    this.targetY = 0;
    
    this.setupEventListeners();
    this.animate();
  }
  
  setupEventListeners() {
    document.addEventListener('mousemove', (e) => {
      this.targetX = e.clientX;
      this.targetY = e.clientY;
      
      // Show ring on interactive elements
      if (e.target.closest('button, a, input, [role="button"]')) {
        this.ring.classList.add('active');
      } else {
        this.ring.classList.remove('active');
      }
    });
    
    document.addEventListener('mouseenter', () => {
      this.ring.classList.add('active');
    });
    
    document.addEventListener('mouseleave', () => {
      this.ring.classList.remove('active');
    });
  }
  
  animate() {
    this.x += (this.targetX - this.x) * 0.2;
    this.y += (this.targetY - this.y) * 0.2;
    
    this.ring.style.left = `${this.x - 20}px`;
    this.ring.style.top = `${this.y - 20}px`;
    
    requestAnimationFrame(() => this.animate());
  }
}

// ======================================
// SCROLL PARALLAX EFFECT
// ======================================
class ScrollParallax {
  constructor() {
    this.elements = document.querySelectorAll('[data-parallax]');
    this.setupParallax();
  }
  
  setupParallax() {
    window.addEventListener('scroll', () => {
      this.elements.forEach((el) => {
        const speed = el.dataset.parallax || 0.5;
        const rect = el.getBoundingClientRect();
        const scrolled = window.scrollY;
        
        const offset = rect.top * speed;
        el.style.transform = `translateY(${offset * -1}px)`;
      });
    });
  }
}

// ======================================
// LOADING ANIMATION (Morphing Blob)
// ======================================
function showMorphingLoader() {
  const loader = document.createElement('div');
  loader.className = 'morphing-loader';
  loader.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10000;
  `;
  document.body.appendChild(loader);
  return loader;
}

function hideMorphingLoader(loader) {
  if (loader) {
    loader.style.animation = 'slideUpFade 0.4s ease-out reverse';
    setTimeout(() => loader.remove(), 400);
  }
}

// ======================================
// TOAST NOTIFICATIONS
// ======================================
function showToast(message, type = 'success', duration = 3000) {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideInFromRight 0.4s ease-out reverse';
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

// ======================================
// FORM VALIDATION WITH ANIMATIONS
// ======================================
class FormValidator {
  constructor(formSelector) {
    this.form = document.querySelector(formSelector);
    if (this.form) {
      this.setupValidation();
    }
  }
  
  setupValidation() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      const inputs = this.form.querySelectorAll('.input-futuristic');
      
      inputs.forEach((input) => {
        if (!input.value.trim()) {
          this.setError(input);
          isValid = false;
        } else {
          this.clearError(input);
        }
      });
      
      if (isValid) {
        showToast('Form submitted successfully!', 'success');
        // Handle form submission
        setTimeout(() => this.form.reset(), 500);
      }
    });
    
    // Real-time validation
    this.form.querySelectorAll('.input-futuristic').forEach((input) => {
      input.addEventListener('blur', () => {
        if (!input.value.trim()) {
          this.setError(input);
        } else {
          this.clearError(input);
        }
      });
    });
  }
  
  setError(input) {
    input.classList.add('error');
    const error = document.createElement('span');
    error.style.cssText = 'color: #EF4444; font-size: 0.75rem; margin-top: 0.25rem; display: block;';
    error.textContent = 'This field is required';
    input.parentElement.appendChild(error);
  }
  
  clearError(input) {
    input.classList.remove('error');
    const error = input.parentElement.querySelector('span');
    if (error) error.remove();
  }
}

// ======================================
// PAGE TRANSITION WITH RADIAL WIPE
// ======================================
function transitionPage(href) {
  const event = new MouseEvent('click', { clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 });
  const transition = document.createElement('div');
  transition.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--color-void);
    z-index: 9999;
    --click-x: ${window.innerWidth / 2}px;
    --click-y: ${window.innerHeight / 2}px;
    animation: radialWipe 0.6s ease-in-out;
  `;
  document.body.appendChild(transition);
  
  setTimeout(() => {
    window.location.href = href;
  }, 300);
}

// ======================================
// IMAGE LOADING WITH FILM DEVELOP
// ======================================
function setupImageLoading() {
  const images = document.querySelectorAll('img[data-film-develop]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.animation = 'filmDevelop 0.8s ease-out forwards';
        observer.unobserve(img);
      }
    });
  }, { threshold: 0.1 });
  
  images.forEach((img) => observer.observe(img));
}

// ======================================
// PARTICLE EXPLOSION EFFECT
// ======================================
function createParticleExplosion(x, y, color = '#D946EF') {
  const particleCount = 10;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    const angle = (i / particleCount) * Math.PI * 2;
    const velocity = 100 + Math.random() * 200;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;
    
    particle.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: 8px;
      height: 8px;
      background: ${color};
      border-radius: 50%;
      pointer-events: none;
      box-shadow: 0 0 10px ${color};
      --tx: ${tx}px;
      --ty: ${ty}px;
      animation: particleExplosion 0.8s ease-out forwards;
      z-index: 1000;
    `;
    
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 800);
  }
}

// ======================================
// FLOATING HEART FOR WISHLIST
// ======================================
function createFloatingHeart(x, y) {
  const heart = document.createElement('div');
  heart.innerHTML = '❤️';
  heart.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    font-size: 2rem;
    pointer-events: none;
    animation: floatingHeart 1s ease-out forwards;
    z-index: 1000;
  `;
  
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1000);
}

// ======================================
// SMOOTH SCROLL BEHAVIOR
// ======================================
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });
}

// ======================================
// KEYBOARD NAVIGATION
// ======================================
class KeyboardNavigation {
  constructor() {
    this.focusIndex = 0;
    this.focusableElements = [];
    this.setupFocusManagement();
  }
  
  setupFocusManagement() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        this.focusableElements = Array.from(
          document.querySelectorAll('button, a, input, [role="button"]')
        ).filter((el) => el.offsetParent !== null);
        
        if (e.shiftKey) {
          this.focusIndex--;
        } else {
          this.focusIndex++;
        }
        
        if (this.focusIndex < 0) {
          this.focusIndex = this.focusableElements.length - 1;
        } else if (this.focusIndex >= this.focusableElements.length) {
          this.focusIndex = 0;
        }
        
        this.focusableElements[this.focusIndex]?.focus();
      }
      
      // Escape key to close modals
      if (e.key === 'Escape') {
        const modals = document.querySelectorAll('[role="dialog"][open]');
        if (modals.length > 0) {
          modals[modals.length - 1].close();
        }
      }
    });
  }
}

// ======================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ======================================
function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'slideUpFade 0.6s ease-out forwards';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('[data-animate]').forEach((el) => {
    observer.observe(el);
  });
}

// ======================================
// AMBIENT COLOR SHIFT (Ambient Chroma Sync)
// ======================================
function setupAmbientChromaSync() {
  const cards = document.querySelectorAll('.portal-card');
  
  cards.forEach((card) => {
    const img = card.querySelector('img');
    if (!img) return;
    
    card.addEventListener('mouseenter', () => {
      // Get dominant color from image (simplified)
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      // Extract average color (simplified color extraction)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      let r = 0, g = 0, b = 0;
      for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
      }
      
      const pixels = data.length / 4;
      r = Math.floor(r / pixels);
      g = Math.floor(g / pixels);
      b = Math.floor(b / pixels);
      
      const color = `rgb(${r}, ${g}, ${b})`;
      card.style.setProperty('--accent-color', color);
      card.style.setProperty('--glow-color', `rgba(${r}, ${g}, ${b}, 0.3)`);
    });
  });
}

// ======================================
// HAPTIC FEEDBACK SIMULATION
// ======================================
function triggerHaptic(pattern = 'medium') {
  if (navigator.vibrate) {
    const patterns = {
      light: [10],
      medium: [20, 10, 20],
      heavy: [30, 20, 30],
      success: [10, 5, 20, 5, 10],
    };
    navigator.vibrate(patterns[pattern] || patterns.medium);
  }
}

// ======================================
// BUTTON CLICK ANIMATIONS
// ======================================
function setupButtonAnimations() {
  document.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', function (e) {
      // Particle explosion
      const rect = this.getBoundingClientRect();
      const x = e.clientX || rect.left + rect.width / 2;
      const y = e.clientY || rect.top + rect.height / 2;
      
      createParticleExplosion(x, y);
      triggerHaptic('medium');
      
      // Button ripple
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: scale 0.6s ease-out;
        pointer-events: none;
      `;
      
      const size = Math.max(this.clientWidth, this.clientHeight);
      const x2 = e.offsetX - size / 2;
      const y2 = e.offsetY - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x2 + 'px';
      ripple.style.top = y2 + 'px';
      
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// ======================================
// INITIALIZATION
// ======================================
function initializeFuturistic() {
  // Initialize cursor ring
  new CursorRing();
  
  // Initialize parallax
  new ScrollParallax();
  
  // Setup image loading
  setupImageLoading();
  
  // Setup smooth scroll
  setupSmoothScroll();
  
  // Setup keyboard navigation
  new KeyboardNavigation();
  
  // Setup scroll animations
  setupScrollAnimations();
  
  // Setup ambient chroma sync
  setupAmbientChromaSync();
  
  // Setup button animations
  setupButtonAnimations();
  
  // Setup form validation
  new FormValidator('form');
  
  // Remove preloader
  const preload = document.querySelector('.preload-container');
  if (preload) {
    setTimeout(() => {
      preload.style.animation = 'slideUpFade 0.6s ease-out reverse';
      setTimeout(() => preload.remove(), 600);
    }, 1000);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeFuturistic);
} else {
  initializeFuturistic();
}

// ======================================
// EXPORT FOR MODULE USE
// ======================================
window.Futuristic = {
  showToast,
  transitionPage,
  createParticleExplosion,
  createFloatingHeart,
  showMorphingLoader,
  hideMorphingLoader,
  triggerHaptic,
};
