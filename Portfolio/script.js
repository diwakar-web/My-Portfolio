/* =============================================
   PORTFOLIO — SCRIPT.JS
   Interactivity, Animations, Contact Form
   ============================================= */

'use strict';

/* ═══════════════════════════════════════════╗
   1. THEME TOGGLE (Dark / Light)
╚═══════════════════════════════════════════ */
const html       = document.documentElement;
const themeBtn   = document.getElementById('theme-toggle');
const themeIcon  = document.getElementById('theme-icon');

const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
syncThemeIcon(savedTheme);

themeBtn.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('portfolio-theme', next);
  syncThemeIcon(next);
});

function syncThemeIcon(theme) {
  themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}


/* ═══════════════════════════════════════════╗
   2. NAVBAR — scroll behaviour & active links
╚═══════════════════════════════════════════ */
const navbar    = document.getElementById('navbar');
const navLinks  = document.querySelectorAll('.nav-link');
const sections  = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Frosted glass on scroll
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active nav link via IntersectionObserver-like approach
  let current = '';
  sections.forEach(sec => {
    const sectionTop = sec.offsetTop - 100;
    if (window.scrollY >= sectionTop) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });

  // Back-to-top button
  backToTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });


/* ═══════════════════════════════════════════╗
   3. HAMBURGER MENU (Mobile)
╚═══════════════════════════════════════════ */
const hamburger = document.getElementById('hamburger');
const navList   = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = navList.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close on link click
navList.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('open');
    hamburger.classList.remove('open');
  });
});


/* ═══════════════════════════════════════════╗
   4. TYPEWRITER EFFECT
╚═══════════════════════════════════════════ */
const roles = [
  'Full Stack Developer 💻',
  'UI/UX Enthusiast 🎨',
  'Open Source Contributor 🌐',
  'Problem Solver 🧩',
  'Tech Innovator 🚀',
  'Student 📖'
];

let roleIndex = 0;
let charIndex = 0;
let deleting  = false;
const typeEl  = document.getElementById('typewriter');

function typeWriter() {
  const currentRole = roles[roleIndex];
  if (!deleting) {
    typeEl.textContent = currentRole.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      deleting = true;
      setTimeout(typeWriter, 1800);
      return;
    }
  } else {
    typeEl.textContent = currentRole.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeWriter, deleting ? 60 : 95);
}

typeWriter();


/* ═══════════════════════════════════════════╗
   5. FLOATING PARTICLES (Hero Background)
╚═══════════════════════════════════════════ */
const particleContainer = document.getElementById('particles');
const PARTICLE_COUNT     = 30;

for (let i = 0; i < PARTICLE_COUNT; i++) {
  createParticle();
}

function createParticle() {
  const p    = document.createElement('div');
  p.className = 'particle';
  const size  = Math.random() * 4 + 1;
  const left  = Math.random() * 100;
  const dur   = Math.random() * 15 + 8;
  const delay = Math.random() * 10;

  p.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${left}%;
    bottom: -10px;
    animation-duration: ${dur}s;
    animation-delay: ${delay}s;
  `;
  particleContainer.appendChild(p);
}


/* ═══════════════════════════════════════════╗
   6. SCROLL ANIMATIONS (Custom AOS)
╚═══════════════════════════════════════════ */
const aosElements = document.querySelectorAll('[data-aos]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el    = entry.target;
      const delay = parseInt(el.dataset.delay || '0');
      setTimeout(() => {
        el.classList.add('aos-animate');
        // Trigger skill bars once visible
        el.querySelectorAll && el.querySelectorAll('.skill-fill').forEach(bar => {
          bar.classList.add('animate');
        });
      }, delay);
      observer.unobserve(el);
    }
  });
}, { threshold: 0.12 });

aosElements.forEach(el => observer.observe(el));

// Also watch skill bars that might be inside already-visible sections
const allSkillBars = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

allSkillBars.forEach(bar => skillObserver.observe(bar));


/* ═══════════════════════════════════════════╗
   7. BACK TO TOP
╚═══════════════════════════════════════════ */
const backToTop = document.getElementById('back-to-top');
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ═══════════════════════════════════════════╗
   8. CONTACT FORM — Validation + mailto/WhatsApp
   ─────────────────────────────────────────────
   Backend option: Replace the mailto: fallback
   with a fetch() call to your own backend or
   a service like EmailJS / Formspree.
   See comments below for the switchover.
╚═══════════════════════════════════════════ */

/* ── CONFIGURATION ── 
   Replace these with your real details before deploying.
*/
const OWNER_EMAIL     = 'diwakarrajeshnagar@gmail.com';           // Your email address
const WHATSAPP_NUMBER = '919906251573';                   // Your WhatsApp number with country code (no + or spaces)
const EMAILJS_SERVICE_ID  = 'YOUR_EMAILJS_SERVICE_ID';   // (optional) EmailJS service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_EMAILJS_TEMPLATE_ID';  // (optional) EmailJS template ID
const EMAILJS_PUBLIC_KEY  = 'YOUR_EMAILJS_PUBLIC_KEY';   // (optional) EmailJS public key
const USE_EMAILJS        = false;                         // Set true after configuring EmailJS

const contactForm  = document.getElementById('contact-form');
const formStatus   = document.getElementById('form-status');
const submitBtn    = document.getElementById('submit-btn');
const btnText      = document.getElementById('btn-text');
const btnLoader    = document.getElementById('btn-loader');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Clear previous errors
  clearErrors();

  // Gather values
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  // Validate
  let valid = true;
  if (!name)             { showError('name', 'Please enter your name.');     valid = false; }
  if (!isValidEmail(email)) { showError('email', 'Enter a valid email address.'); valid = false; }
  if (!subject)          { showError('subject', 'Please enter a subject.');   valid = false; }
  if (message.length < 10) { showError('message', 'Message must be at least 10 characters.'); valid = false; }
  if (!valid) return;

  // Loading state
  setLoading(true);

  try {
    if (USE_EMAILJS && window.emailjs) {
      /* ── Option A: EmailJS ──────────────────────────
         1. Sign up at https://www.emailjs.com/
         2. Create a service + email template
         3. Add this script tag to index.html before script.js:
            <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
         4. Set USE_EMAILJS = true and fill the IDs above.
      */
      await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name:    name,
        from_email:   email,
        subject:      subject,
        message:      message,
        to_email:     OWNER_EMAIL,
      }, EMAILJS_PUBLIC_KEY);
      showSuccess('🎉 Message sent! I\'ll get back to you soon.');
    } else {
      /* ── Option B: Mailto fallback ──────────────────
         Opens the user's default mail client.
         This works offline / without a backend.
      */
      const mailtoLink = buildMailtoLink({ name, email, subject, message });
      window.open(mailtoLink, '_blank');
      showSuccess('📬 Your default mail client has opened. Send the email to reach me!');
    }

    contactForm.reset();
  } catch (err) {
    console.error('Form submission error:', err);
    showFormError('❌ Something went wrong. Please try WhatsApp or email directly.');
  } finally {
    setLoading(false);
  }
});

/* ── HELPER: Build mailto link ── */
function buildMailtoLink({ name, email, subject, message }) {
  const body = `Name: ${name}\nFrom: ${email}\n\n${message}`;
  return `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/* ── HELPER: WhatsApp direct message (from connect section) ── */
function buildWhatsAppLink(text) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

// Update all WhatsApp links dynamically
document.querySelectorAll('a[href*="wa.me/919906251573"]').forEach(link => {
  const originalText = decodeURIComponent(link.href.split('?text=')[1] || '');
  link.href = buildWhatsAppLink(originalText || 'Hi Diwak, I saw your portfolio and would love to connect!');
});


/* ── FORM VALIDATION helpers ── */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function showError(fieldId, msg) {
  document.getElementById(fieldId).classList.add('error');
  document.getElementById(`${fieldId}-error`).textContent = msg;
}
function clearErrors() {
  ['name','email','subject','message'].forEach(id => {
    document.getElementById(id).classList.remove('error');
    document.getElementById(`${id}-error`).textContent = '';
  });
  hideStatus();
}
function setLoading(loading) {
  submitBtn.disabled = loading;
  btnText.style.display   = loading ? 'none' : 'inline';
  btnLoader.style.display = loading ? 'inline' : 'none';
}
function showSuccess(msg) {
  formStatus.className     = 'form-status success';
  formStatus.innerHTML     = `<i class="fas fa-check-circle"></i> ${msg}`;
  formStatus.style.display = 'block';
  formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
function showFormError(msg) {
  formStatus.className     = 'form-status error';
  formStatus.innerHTML     = msg;
  formStatus.style.display = 'block';
}
function hideStatus() {
  formStatus.style.display = 'none';
}


/* ═══════════════════════════════════════════╗
   9. SMOOTH SCROLL for in-page links
╚═══════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* ═══════════════════════════════════════════╗
   10. PHOTO ERROR FALLBACK
╚═══════════════════════════════════════════ */
const heroPhoto = document.getElementById('hero-photo');
if (heroPhoto) {
  heroPhoto.addEventListener('error', () => {
    // If profile.png fails, show a gradient avatar
    heroPhoto.style.display = 'none';
    const parent = heroPhoto.parentElement;
    const fallback = document.createElement('div');
    fallback.style.cssText = `
      width:100%; height:100%; border-radius:50%;
      background: var(--accent-gradient);
      display:flex; align-items:center; justify-content:center;
      font-size:6rem; font-family:var(--font-heading); color:#fff; font-weight:800;
    `;
    fallback.textContent = 'DK';
    parent.appendChild(fallback);
  });
}

console.log('%c👨‍💻 Diwakar Nagar Portfolio', 'font-size:18px; font-weight:bold; color:#a78bfa;');
console.log('%cBuilt with HTML, CSS & Vanilla JS', 'color:#6060a0;');
