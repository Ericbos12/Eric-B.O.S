// ============================================
// CUSTOM CURSOR
// ============================================

const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursor-ring");

let mx = 0;
let my = 0;

let rx = 0;
let ry = 0;

document.addEventListener("mousemove", (e) => {

  mx = e.clientX;
  my = e.clientY;

  cursor.style.left = mx - 5 + "px";
  cursor.style.top = my - 5 + "px";
});

(function animateRing(){

  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;

  ring.style.left = rx - 18 + "px";
  ring.style.top = ry - 18 + "px";

  requestAnimationFrame(animateRing);

})();

document.querySelectorAll("a, button, .skill-card")
.forEach(el => {

  el.addEventListener("mouseenter", () => {
    cursor.classList.add("hover");
    ring.classList.add("hover");
  });

  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("hover");
    ring.classList.remove("hover");
  });

});

// ============================================
// NAVBAR + SCROLL UI
// ============================================

const navbar = document.getElementById("navbar");
const backTop = document.getElementById("backTop");
const progressBar = document.querySelector(".scroll-progress");

function updateScrollUI(){

  navbar.classList.toggle(
    "scrolled",
    window.scrollY > 50
  );

  backTop.classList.toggle(
    "show",
    window.scrollY > 400
  );

  const scrollTop = window.scrollY;

  const docHeight =
    document.documentElement.scrollHeight -
    window.innerHeight;

  const progress = (scrollTop / docHeight) * 100;

  progressBar.style.width = progress + "%";
}

window.addEventListener("scroll", updateScrollUI);

// ============================================
// MOBILE NAV
// ============================================

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {

  hamburger.classList.toggle("open");
  navLinks.classList.toggle("open");

});

navLinks.querySelectorAll("a")
.forEach(link => {

  link.addEventListener("click", () => {

    hamburger.classList.remove("open");
    navLinks.classList.remove("open");

  });

});

// ============================================
// TYPING EFFECT
// ============================================

const typingText = document.querySelector(".typing-text");

const phrases = [
  "Software Engineer",
  "Frontend Developer",
  "Problem Solver"
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect(){

  const currentPhrase = phrases[phraseIndex];

  if(!deleting){

    typingText.textContent =
      currentPhrase.slice(0, charIndex++);

  } else {

    typingText.textContent =
      currentPhrase.slice(0, charIndex--);
  }

  let speed = deleting ? 45 : 90;

  if(!deleting && charIndex > currentPhrase.length){

    deleting = true;
    speed = 1400;
  }

  if(deleting && charIndex < 0){

    deleting = false;

    phraseIndex =
      (phraseIndex + 1) % phrases.length;

    speed = 300;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();

// ============================================
// STAGGER REVEALS
// ============================================

document.querySelectorAll("section")
.forEach(section => {

  const items =
    section.querySelectorAll(".fade-up");

  items.forEach((item, index) => {

    item.style.setProperty(
      "--delay",
      `${index * 120}ms`
    );

  });

});

// ============================================
// INTERSECTION OBSERVER
// ============================================

const observer = new IntersectionObserver(

  entries => {

    entries.forEach(entry => {

      if(entry.isIntersecting){

        entry.target.classList.add("show");
      }

    });

  },

  {
    threshold:0.1,
    rootMargin:"0px 0px -60px 0px"
  }

);

document
.querySelectorAll(".fade-up, .timeline-item")
.forEach(el => observer.observe(el));

// ============================================
// SKILL CARD GLOW + TILT
// ============================================

document.querySelectorAll(".skill-card")
.forEach(card => {

  card.addEventListener("mousemove", e => {

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mx", x + "px");
    card.style.setProperty("--my", y + "px");

    const rotateY =
      ((x / rect.width) - 0.5) * 10;

    const rotateX =
      ((y / rect.height) - 0.5) * -10;

    card.style.transform = `
      perspective(900px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-6px)
    `;

  });

  card.addEventListener("mouseleave", () => {

    card.style.transform = `
      perspective(900px)
      rotateX(0deg)
      rotateY(0deg)
      translateY(0px)
    `;

  });

});

// ============================================
// COUNTER ANIMATION
// ============================================

function animateCounter(el){

  const target =
    parseInt(el.dataset.target);

  const suffix =
    el.dataset.suffix || "";

  const duration = 1500;

  const start = performance.now();

  function step(now){

    const progress =
      Math.min((now - start) / duration, 1);

    const ease =
      1 - Math.pow(1 - progress, 3);

    el.textContent =
      Math.floor(ease * target) + suffix;

    if(progress < 1){
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

const statsSection =
  document.querySelector(".hero-stats");

const statsObserver =
  new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if(entry.isIntersecting){

        entry.target
        .querySelectorAll("[data-target]")
        .forEach(animateCounter);

        statsObserver.unobserve(entry.target);
      }

    });

  }, { threshold:0.5 });

if(statsSection){
  statsObserver.observe(statsSection);
}

// ============================================
// CONTACT FORM
// ============================================

document
.getElementById("contactForm")
.addEventListener("submit", function(e){

  e.preventDefault();

  const status =
    document.getElementById("formStatus");

  const btn =
    this.querySelector("button[type=submit]");

  btn.disabled = true;
  btn.textContent = "Sending…";

  setTimeout(() => {

    status.className =
      "form-status success";

    status.textContent =
      "✓ Message sent successfully!";

    this.reset();

    btn.disabled = false;
    btn.textContent = "Send Message";

  }, 1200);

});

// ============================================
// SMOOTH SCROLL
// ============================================

document.querySelectorAll('a[href^="#"]')
.forEach(anchor => {

  anchor.addEventListener("click", function(e){

    const target =
      document.querySelector(
        this.getAttribute("href")
      );

    if(target){

      e.preventDefault();

      target.scrollIntoView({
        behavior:"smooth"
      });

    }

  });

});

// ============================================
// INITIAL STATE
// ============================================

updateScrollUI();