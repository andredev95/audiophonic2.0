// ================= MENU MOBILE =================
const menu = document.getElementById("menu");
const toggle = document.getElementById("menu-toggle");
const links = document.querySelectorAll("#menu a");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });
}

links.forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.remove("active");
  });
});

// ================= GSAP =================
if (typeof gsap !== "undefined") {
  gsap.from(".hero h1", { opacity: 0, y: 50, duration: 1 });
  gsap.from(".card-pro", { opacity: 0, y: 50, stagger: 0.2 });
}


// ================= CARROSSEL LINHAS =================
const track = document.getElementById("track");

if (track) {
  let isDown = false;
  let startX;
  let scrollLeft;

  track.addEventListener("mousedown", (e) => {
    isDown = true;
    track.classList.add("dragging");
    startX = e.pageX;
    scrollLeft = track.scrollLeft;
  });

  track.addEventListener("mouseleave", () => isDown = false);
  track.addEventListener("mouseup", () => isDown = false);

  track.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const walk = (e.pageX - startX) * 1.5;
    track.scrollLeft = scrollLeft - walk;
  });

  // TOUCH
  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].pageX;
    scrollLeft = track.scrollLeft;
  });

  track.addEventListener("touchmove", (e) => {
    const walk = (e.touches[0].pageX - startX) * 1.5;
    track.scrollLeft = scrollLeft - walk;
  });

  // AUTO SCROLL
  function autoScroll() {
    track.scrollLeft += 0.5;

    if (track.scrollLeft >= track.scrollWidth / 2) {
      track.scrollLeft = 0;
    }

    requestAnimationFrame(autoScroll);
  }

  autoScroll();

  // CARD ATIVO NO CENTRO
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


// ================= BUSCA DISTRIBUIDORES =================
const input = document.getElementById("searchInput");
const cardsDist = document.querySelectorAll(".card-dist");

if (input) {
  input.addEventListener("keyup", () => {
    const value = input.value.toLowerCase();

    cardsDist.forEach(card => {
      const local = card.dataset.local;
      card.style.display = local.includes(value) ? "block" : "none";
    });
  });
}


// ================= DISTRIBUIDORES (VER MAIS PRO) =================
const searchInput = document.getElementById("searchInput");
const filterState = document.getElementById("filterState");
const btnVerMais = document.getElementById("btnVerMais");

let visible = 2;
let mostrandoTodos = false;

function getCards() {
  return document.querySelectorAll(".card-dist");
}

/* ================= FILTRO ================= */
function filterDistributors() {
  const search = searchInput.value.toLowerCase();
  const state = filterState.value;

  let count = 0;

  getCards().forEach(card => {
    const city = card.dataset.city;
    const cardState = card.dataset.state;

    const matchCity = city.includes(search);
    const matchState = !state || cardState === state;

    if (matchCity && matchState) {
      if (!mostrandoTodos && count >= visible) {
        card.style.display = "none";
      } else {
        card.style.display = "block";
      }
      count++;
    } else {
      card.style.display = "none";
    }
  });
}

/* ================= BOTÃO ================= */
btnVerMais.addEventListener("click", () => {
  mostrandoTodos = !mostrandoTodos;

  btnVerMais.innerText = mostrandoTodos ? "Ver menos" : "Ver mais";

  filterDistributors();
});

/* ================= EVENTOS ================= */
searchInput.addEventListener("input", () => {
  mostrandoTodos = false;
  btnVerMais.innerText = "Ver mais";
  filterDistributors();
});

filterState.addEventListener("change", () => {
  mostrandoTodos = false;
  btnVerMais.innerText = "Ver mais";
  filterDistributors();
});

/* ================= INIT ================= */
window.addEventListener("load", filterDistributors);

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


// ================= LER MAIS =================
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


// ================= CARROSSEL TESTIMONIAL =================
const tTrack = document.getElementById("testimonialTrack");

if (tTrack) {

  let isDown = false;
  let startX;
  let scrollLeft;
  let isPaused = false;
  let autoScrollSpeed = 0.3;
  let snapTimeout;

  const cards = () => document.querySelectorAll(".testimonial-card");

  /* ================= DRAG ================= */
  tTrack.addEventListener("mousedown", (e) => {
    isDown = true;
    isPaused = true;
    startX = e.pageX;
    scrollLeft = tTrack.scrollLeft;
  });

  tTrack.addEventListener("mouseup", () => {
    isDown = false;
    isPaused = false;
    snapToClosest();
  });

  tTrack.addEventListener("mouseleave", () => {
    isDown = false;
    isPaused = false;
    snapToClosest();
  });

  tTrack.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const walk = (e.pageX - startX) * 1.5;
    tTrack.scrollLeft = scrollLeft - walk;
  });

  /* ================= TOUCH ================= */
  tTrack.addEventListener("touchstart", (e) => {
    isPaused = true;
    startX = e.touches[0].pageX;
    scrollLeft = tTrack.scrollLeft;
  });

  tTrack.addEventListener("touchend", () => {
    isPaused = false;
    snapToClosest();
  });

  tTrack.addEventListener("touchmove", (e) => {
    const walk = (e.touches[0].pageX - startX) * 1.5;
    tTrack.scrollLeft = scrollLeft - walk;
  });

  /* ================= AUTOPLAY ================= */
  function autoScroll() {

    if (!isPaused && !isDown) {
      tTrack.scrollLeft += autoScrollSpeed;
    }

    requestAnimationFrame(autoScroll);
  }

  autoScroll();

  /* ================= SNAP CENTRAL PERFEITO ================= */
  function snapToClosest() {
    clearTimeout(snapTimeout);

    snapTimeout = setTimeout(() => {
      const trackRect = tTrack.getBoundingClientRect();
      const center = trackRect.left + trackRect.width / 2;

      let closest = null;
      let closestDistance = Infinity;

      cards().forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;

        const distance = Math.abs(center - cardCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closest = card;
        }
      });

      if (closest) {
        const offset =
          closest.offsetLeft -
          tTrack.offsetWidth / 2 +
          closest.offsetWidth / 2;

        tTrack.scrollTo({
          left: offset,
          behavior: "smooth"
        });
      }

    }, 120); // delay evita conflito com drag
  }

  /* ================= CARD ATIVO ================= */
  function updateActive() {
    const trackRect = tTrack.getBoundingClientRect();
    const center = trackRect.left + trackRect.width / 2;

    cards().forEach(card => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;

      if (Math.abs(center - cardCenter) < 120) {
        card.classList.add("active");
      } else {
        card.classList.remove("active");
      }
    });

    requestAnimationFrame(updateActive);
  }

  updateActive();
}