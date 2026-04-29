// ================= MENU =================
const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

toggle.addEventListener("click", () => {
  toggle.classList.toggle("active");
  menu.classList.toggle("active");
});

// ================= DARK MODE =================
const btn = document.createElement("button");
btn.innerText = "🌙";
btn.style.position = "fixed";
btn.style.bottom = "20px";
btn.style.right = "20px";
btn.style.zIndex = "9999";
document.body.appendChild(btn);

btn.onclick = () => {
  document.body.classList.toggle("light");
};

// ================= GSAP =================
if (typeof gsap !== "undefined") {
  gsap.from(".hero h1", { opacity: 0, y: 50, duration: 1 });
  gsap.from(".card", { opacity: 0, y: 50, stagger: 0.2 });
}

// ================= API TEST =================
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then(res => res.json())
  .then(data => console.log("API:", data))
  .catch(err => console.log("Erro API:", err));

// ================= CARROSSEL =================
const track = document.getElementById("track");

if (track) {

  let isDown = false;
  let startX;
  let scrollLeft;

  let autoScrollSpeed = 0.5;

  // DRAG
  track.addEventListener("mousedown", (e) => {
    isDown = true;
    track.style.cursor = "grabbing";
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  track.addEventListener("mouseleave", () => isDown = false);
  track.addEventListener("mouseup", () => {
    isDown = false;
    track.style.cursor = "grab";
  });

  track.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 2;
    track.scrollLeft = scrollLeft - walk;
  });

  // TOUCH
  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].pageX;
    scrollLeft = track.scrollLeft;
  });

  track.addEventListener("touchmove", (e) => {
    const x = e.touches[0].pageX;
    const walk = (x - startX) * 2;
    track.scrollLeft = scrollLeft - walk;
  });

  // AUTO SCROLL (mais leve)
  function autoScroll() {
    track.scrollLeft += autoScrollSpeed;

    if (track.scrollLeft >= track.scrollWidth / 2) {
      track.scrollLeft = 0;
    }

    requestAnimationFrame(autoScroll);
  }

  autoScroll();

  // ATIVO CENTRAL (otimizado)
  function updateActiveCard() {
    const cards = document.querySelectorAll(".card-pro");
    const center = window.innerWidth / 2;

    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;

      if (Math.abs(center - cardCenter) < 150) {
        card.classList.add("active");
      } else {
        card.classList.remove("active");
      }
    });

    requestAnimationFrame(updateActiveCard);
  }

  updateActiveCard();
}

// ================= BUSCA =================
const input = document.getElementById("searchInput");
const cards = document.querySelectorAll(".card-dist");

if (input) {
  input.addEventListener("keyup", () => {
    const value = input.value.toLowerCase();

    cards.forEach(card => {
      const local = card.dataset.local;

      card.style.display = local.includes(value) ? "block" : "none";
    });
  });
}

// ================= BACK TO TOP =================
const btnTop = document.getElementById("backToTop");

if (btnTop) {
  window.addEventListener("scroll", () => {
    btnTop.style.display =
      document.documentElement.scrollTop > 300 ? "block" : "none";
  });

  btnTop.onclick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
}

// ================= ler mais =================

document.querySelectorAll(".ler-mais").forEach(button => {
  button.addEventListener("click", () => {

    const parent = button.parentElement;
    const fullText = parent.querySelector(".full-text");

    if (fullText.style.display === "block") {
      fullText.style.display = "none";
      button.innerText = "Ler mais";
    } else {
      fullText.style.display = "block";
      button.innerText = "Ler menos";
    }

  });
});

// ================= carrosel linhas de produros =================

const track = document.getElementById("track");

let isDown = false;
let startX;
let scrollLeft;

/* MOUSE */
track.addEventListener("mousedown", (e) => {
  isDown = true;
  track.classList.add("dragging");
  startX = e.pageX;
  scrollLeft = track.scrollLeft;
});

track.addEventListener("mouseleave", () => {
  isDown = false;
});

track.addEventListener("mouseup", () => {
  isDown = false;
});

track.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const walk = (e.pageX - startX) * 1.5;
  track.scrollLeft = scrollLeft - walk;
});

/* TOUCH */
track.addEventListener("touchstart", (e) => {
  startX = e.touches[0].pageX;
  scrollLeft = track.scrollLeft;
});

track.addEventListener("touchmove", (e) => {
  const walk = (e.touches[0].pageX - startX) * 1.5;
  track.scrollLeft = scrollLeft - walk;
});

// ================= revendedores =================

const cards = document.querySelectorAll(".card-dist");
const btnVerMais = document.querySelector(".btn-vermais");
const searchInput = document.getElementById("searchInput");

let limiteDesktop = 4;
let limiteMobile = 2;
let mostrandoTodos = false;

// DEFINIR LIMITE RESPONSIVO
function getLimite() {
  return window.innerWidth <= 768 ? limiteMobile : limiteDesktop;
}

// MOSTRAR CARDS
function atualizarCards() {
  const limite = getLimite();

  cards.forEach((card, index) => {
    if (mostrandoTodos) {
      card.style.display = "block";
    } else {
      card.style.display = index < limite ? "block" : "none";
    }
  });

  btnVerMais.innerText = mostrandoTodos ? "Ver menos" : "Ver mais";
}

// BOTÃO VER MAIS
const cards = document.querySelectorAll(".card-dist");
const btnVerMais = document.querySelector(".btn-vermais");

let mostrandoTodos = false;

function atualizarCards() {
  const isMobile = window.innerWidth <= 768;
  const limite = isMobile ? 2 : 4;

  cards.forEach((card, index) => {
    if (!mostrandoTodos && index >= limite) {
      card.style.display = "none";
    } else {
      card.style.display = "block";
    }
  });

  btnVerMais.innerText = mostrandoTodos ? "Ver menos" : "Ver mais";
}

function mostrarMais() {
  mostrandoTodos = !mostrandoTodos;
  atualizarCards();
}

// GARANTE QUE RODA DEPOIS DO LOAD
window.addEventListener("load", atualizarCards);
window.addEventListener("resize", atualizarCards);

// revendedores 

const trackDist = document.getElementById("trackDist");
const cardsDist = document.querySelectorAll(".card-dist");
const btnVerMais = document.querySelector(".btn-vermais");

let isDown = false;
let startX;
let scrollLeft;
let mostrandoTodos = false;

/* DRAG */
trackDist.addEventListener("mousedown", (e) => {
  isDown = true;
  trackDist.style.cursor = "grabbing";
  startX = e.pageX - trackDist.offsetLeft;
  scrollLeft = trackDist.scrollLeft;
});

trackDist.addEventListener("mouseleave", () => isDown = false);
trackDist.addEventListener("mouseup", () => {
  isDown = false;
  trackDist.style.cursor = "grab";
});

trackDist.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - trackDist.offsetLeft;
  const walk = (x - startX) * 2;
  trackDist.scrollLeft = scrollLeft - walk;
});

/* TOUCH */
trackDist.addEventListener("touchstart", (e) => {
  startX = e.touches[0].pageX;
  scrollLeft = trackDist.scrollLeft;
});

trackDist.addEventListener("touchmove", (e) => {
  const x = e.touches[0].pageX;
  const walk = (x - startX) * 2;
  trackDist.scrollLeft = scrollLeft - walk;
});

/* LIMITAR CARDS */
function atualizarDistribuidores() {
  const limite = window.innerWidth <= 768 ? 3 : 4;

  cardsDist.forEach((card, index) => {
    if (!mostrandoTodos && index >= limite) {
      card.style.display = "none";
    } else {
      card.style.display = "block";
    }
  });

  btnVerMais.innerText = mostrandoTodos ? "Ver menos" : "Ver mais";
}

/* BOTÃO */
function mostrarMais() {
  mostrandoTodos = !mostrandoTodos;
  atualizarDistribuidores();
}

/* INIT */
window.addEventListener("load", atualizarDistribuidores);
window.addEventListener("resize", atualizarDistribuidores);

/* carrosel testimonial */

const tTrack = document.getElementById("testimonialTrack");

let isDown = false;
let startX;
let scrollLeft;

/* DRAG */
tTrack.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - tTrack.offsetLeft;
  scrollLeft = tTrack.scrollLeft;
});

tTrack.addEventListener("mouseleave", () => isDown = false);
tTrack.addEventListener("mouseup", () => isDown = false);

tTrack.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  const x = e.pageX - tTrack.offsetLeft;
  const walk = (x - startX) * 2;
  tTrack.scrollLeft = scrollLeft - walk;
});

/* TOUCH */
tTrack.addEventListener("touchstart", (e) => {
  startX = e.touches[0].pageX;
  scrollLeft = tTrack.scrollLeft;
});

tTrack.addEventListener("touchmove", (e) => {
  const x = e.touches[0].pageX;
  const walk = (x - startX) * 2;
  tTrack.scrollLeft = scrollLeft - walk;
});

/* ATIVO NO CENTRO */
function updateTestimonial() {
  const cards = document.querySelectorAll(".testimonial-card");
  const center = window.innerWidth / 2;

  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const cardCenter = rect.left + rect.width / 2;

    if (Math.abs(center - cardCenter) < 150) {
      card.classList.add("active");
    } else {
      card.classList.remove("active");
    }
  });
}

setInterval(updateTestimonial, 100);