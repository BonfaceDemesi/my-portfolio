// Fade in effect when scrolling
document.addEventListener('scroll', () => {
  document.querySelectorAll('.animate-fade').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    }
  });
});



// Initial style
document.querySelectorAll('.animate-fade').forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'all 0.6s ease-out';
});
// Balloon background generator
(function () {
  // Only run once
  if (!document.body) return;

  // Use a light-body wrapper class (you can add to <body> in HTML)
  document.body.classList.add('body-light-bg');

  // create cloud blur layer
  const clouds = document.createElement('div');
  clouds.className = 'bg-clouds';
  document.body.appendChild(clouds);

  // balloon layer
  const layer = document.createElement('div');
  layer.className = 'balloon-layer';
  document.body.appendChild(layer);

  const COLORS = [
    'rgba(99,102,241,0.85)',   // indigo
    'rgba(96,165,250,0.85)',   // blue
    'rgba(99,179,115,0.85)',   // green
    'rgba(236,72,153,0.85)',   // pink
    'rgba(249,115,22,0.85)',   // orange
    'rgba(139,92,246,0.85)'    // purple
  ];

  const COUNT = 8; // how many balloons active at once

  function rand(min, max) { return Math.random() * (max - min) + min; }

  function spawnBalloon() {
    const b = document.createElement('div');
    b.className = 'balloon';
    // random size
    const size = `${Math.round(rand(48, 120))}px`;
    b.style.setProperty('--balloon-size', size);
    // color
    const color = COLORS[Math.floor(rand(0, COLORS.length))];
    b.style.setProperty('--balloon-color', color);
    // horizontal start position (percent)
    const left = rand(5, 92);
    b.style.left = left + 'vw';
    // drift amount for floatUp translateX
    const drift = (rand(-8, 8)).toFixed(1) + 'vw';
    b.style.setProperty('--drift', drift);
    // sway magnitude & duration
    const sway = Math.round(rand(8, 28)); // px
    const swayDur = (rand(3, 7)).toFixed(1) + 's';
    b.style.setProperty('--sway', sway);
    b.style.setProperty('--swayDuration', swayDur);
    // float duration
    const duration = (rand(12, 28)).toFixed(1) + 's';
    b.style.setProperty('--duration', duration);

    // random delay so not all line up
    b.style.animationDelay = rand(0, 6).toFixed(2) + 's';

    // add string
    const s = document.createElement('div');
    s.className = 'balloon-string';
    b.appendChild(s);

    layer.appendChild(b);

    // small timeout to trigger opacity/animation (ensures CSS applied)
    requestAnimationFrame(() => {
      b.classList.add('animate');
    });

    // remove after animation finishes (duration + delay + small buffer)
    const total = (parseFloat(duration) + parseFloat(b.style.animationDelay || 0)) * 1000 + 2000;
    setTimeout(() => {
      if (b && b.parentElement) b.parentElement.removeChild(b);
    }, total);
  }

  // continuous spawn loop to keep COUNT balloons on screen
  function maintain() {
    const current = layer.querySelectorAll('.balloon').length;
    if (current < COUNT) {
      spawnBalloon();
    }
    // check regularly
    setTimeout(maintain, 1200);
  }

  // start
  maintain();

  // cleanup when leaving page
  window.addEventListener('beforeunload', () => {
    if (layer.parentElement) layer.parentElement.remove();
    if (clouds.parentElement) clouds.parentElement.remove();
  });
})();
function createBalloon() {
  const layer = document.getElementById('balloonLayer');
  const balloon = document.createElement('div');
  balloon.classList.add('balloon');

  const size = Math.random() * 50 + 40; // Balloon size
  const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#1dd1a1', '#5f27cd', '#ff9ff3'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const duration = `${Math.random() * 10 + 12}s`;
  const left = `${Math.random() * 100}%`;

  balloon.style.setProperty('--balloon-size', `${size}px`);
  balloon.style.setProperty('--balloon-color', color);
  balloon.style.setProperty('--duration', duration);
  balloon.style.setProperty('--drift', `${Math.random() * 100 - 50}px`);
  balloon.style.setProperty('--sway', `${Math.random() * 15}px`);
  balloon.style.setProperty('--swayDuration', `${Math.random() * 5 + 3}s`);
  balloon.style.left = left;

  // Add string
  const string = document.createElement('div');
  string.classList.add('balloon-string');
  balloon.appendChild(string);

  layer.appendChild(balloon);

  // Remove balloon after animation
  setTimeout(() => balloon.remove(), parseFloat(duration) * 1000);
}

// Create new balloon every 1.8s
setInterval(createBalloon, 1800);
function createBalloon() {
  const layer = document.getElementById('balloonLayer');
  const balloon = document.createElement('div');
  balloon.classList.add('balloon');

  const size = Math.random() * 50 + 40;
  const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#1dd1a1', '#5f27cd', '#ff9ff3'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const duration = `${Math.random() * 10 + 12}s`;
  const left = `${Math.random() * 100}%`;

  balloon.style.setProperty('--balloon-size', `${size}px`);
  balloon.style.setProperty('--balloon-color', color);
  balloon.style.setProperty('--duration', duration);
  balloon.style.setProperty('--drift', `${Math.random() * 100 - 50}px`);
  balloon.style.setProperty('--sway', `${Math.random() * 15}px`);
  balloon.style.setProperty('--swayDuration', `${Math.random() * 5 + 3}s`);
  balloon.style.left = left;

  const string = document.createElement('div');
  string.classList.add('balloon-string');
  balloon.appendChild(string);

  layer.appendChild(balloon);

  setTimeout(() => balloon.remove(), parseFloat(duration) * 1000);
}

// Create balloons continuously
setInterval(createBalloon, 1800);
// Email validation
if (!data.email.includes('@')) {
  document.getElementById('emailError').classList.remove('hidden');
  return; // Stop form submission
} else {
  document.getElementById('emailError').classList.add('hidden');
}
const emailInput = document.querySelector('input[name="email"]');
const emailError = document.getElementById('emailError');
const loginBtn = document.getElementById('loginBtn');

emailInput.addEventListener('input', () => {
  if (!emailInput.value.includes('@')) {
    emailError.classList.remove('hidden');
    loginBtn.disabled = true;
    loginBtn.classList.add('opacity-50', 'cursor-not-allowed');
  } else {
    emailError.classList.add('hidden');
    loginBtn.disabled = false;
    loginBtn.classList.remove('opacity-50', 'cursor-not-allowed');
  }
});
const form = document.getElementById('signupForm');
const firstnameField = document.getElementById('firstnameField');
const lastnameField = document.getElementById('lastnameField');
const firstnameError = document.getElementById('firstnameError');
const lastnameError = document.getElementById('lastnameError');

form.addEventListener('submit', (e) => {
  let valid = true;

  // Validate first name (letters only)
  if (!/^[A-Za-z]+$/.test(firstnameField.value.trim())) {
    firstnameError.classList.remove('hidden');
    valid = false;
  } else {
    firstnameError.classList.add('hidden');
  }

  // Validate last name (letters only)
  if (!/^[A-Za-z]+$/.test(lastnameField.value.trim())) {
    lastnameError.classList.remove('hidden');
    valid = false;
  } else {
    lastnameError.classList.add('hidden');
  }

  if (!valid) {
    e.preventDefault(); // Stop form submit
  }
});
