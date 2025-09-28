// ================== DARK / LIGHT MODE ==================
const modeToggle = document.getElementById('mode-toggle');
const body = document.body;

// Load saved mode
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
}

// Toggle theme
modeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
});

// ================== BACK TO TOP BUTTON ==================
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ================== NAV LINK ACTIVE ON SCROLL ==================
const navLinks = document.querySelectorAll('nav .nav-links a');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ================== SCROLL REVEAL ANIMATION ==================
const revealElements = document.querySelectorAll(
  '.skill, .project, .event, .testimonial, .award, #about img, #about p'
);

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 100;
    if (elementTop < windowHeight - revealPoint) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ================== HERO BACKGROUND PARTICLES ==================
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particlesArray;
const numParticles = 70;

// Resize canvas to fit screen
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', () => {
  resizeCanvas();
  initParticles();
});
resizeCanvas();

// Particle Class
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
    this.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

// Initialize particles
function initParticles() {
  particlesArray = [];
  for (let i = 0; i < numParticles; i++) {
    particlesArray.push(new Particle());
  }
}
initParticles();

// Connect lines between nearby particles
function connectParticles() {
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      const dx = particlesArray[a].x - particlesArray[b].x;
      const dy = particlesArray[a].y - particlesArray[b].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 120) {
        ctx.strokeStyle = `rgba(142, 45, 226, ${1 - distance / 120})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

// Animate particles
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(particle => {
    particle.update();
    particle.draw();
  });
  connectParticles();
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ================== OPTIONAL: SCROLL PROJECTS WITH MOUSE WHEEL ==================
const projectScroll = document.querySelector('.projects-scroll');
if (projectScroll) {
  projectScroll.addEventListener('wheel', (e) => {
    e.preventDefault();
    projectScroll.scrollLeft += e.deltaY;
  });
}

// ================== HERO MOUSE SPARKLES ==================
const sparkles = [];
const maxSparkles = 100;

document.addEventListener('mousemove', (e) => {
  for (let i = 0; i < 2; i++) { // generate 2 sparkles per move
    sparkles.push({
      x: e.clientX + (Math.random() * 10 - 5),
      y: e.clientY + (Math.random() * 10 - 5),
      size: Math.random() * 3 + 1,
      color: `hsl(${Math.random() * 360}, 80%, 70%)`,
      life: 30
    });
  }
});

function animateSparkles() {
  sparkles.forEach((s, index) => {
    s.y -= 0.5; // rise up
    s.life--;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
    ctx.fillStyle = s.color;
    ctx.fill();

    if (s.life <= 0) sparkles.splice(index, 1);
  });
}

function animateAll() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => { p.update(); p.draw(); });
  connectParticles();
  animateSparkles(); // add sparkles
  requestAnimationFrame(animateAll);
}

animateAll();

// ================== MOBILE HAMBURGER TOGGLE ==================
const navToggleBtn = document.createElement('button');
navToggleBtn.classList.add('hamburger');
navToggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('.nav-container').appendChild(navToggleBtn);

const navLinksContainer = document.querySelector('.nav-links');

navToggleBtn.addEventListener('click', () => {
  navLinksContainer.classList.toggle('nav-active');
  navToggleBtn.classList.toggle('open');
});
