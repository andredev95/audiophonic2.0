// ======================================================
// MENU MOBILE PREMIUM
// ======================================================

const menu = document.getElementById("menu");
const toggle = document.getElementById("menu-toggle");
const links = document.querySelectorAll("#menu a");

if (toggle && menu) {

  toggle.addEventListener("click", () => {

    menu.classList.toggle("active");
    toggle.classList.toggle("active");

    document.body.classList.toggle("menu-open");

  });

  links.forEach(link => {
    link.addEventListener("click", () => {

      menu.classList.remove("active");
      toggle.classList.remove("active");
      document.body.classList.remove("menu-open");

    });
  });

}


// ======================================================
// GSAP ANIMAÇÕES
// ======================================================

// ======================================================
// GSAP ANIMAÇÕES
// ======================================================

if (typeof gsap !== "undefined") {

  gsap.fromTo(
    ".hero-content h1",
    {
      opacity: 0,
      y: 60
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    }
  );

  gsap.fromTo(
    ".hero-content p",
    {
      opacity: 0,
      y: 30
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.2,
      ease: "power3.out"
    }
  );

  gsap.fromTo(
    ".hero-buttons .btn",
    {
      opacity: 0,
      y: 20
    },
    {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      delay: 0.4,
      duration: 0.8,
      ease: "power3.out"
    }
  );

  gsap.fromTo(
    ".card-pro",
    {
      opacity: 0,
      y: 40
    },
    {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power3.out"
    }
  );

}


// ======================================================
// SCROLL HEADER
// ======================================================

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

  if (window.scrollY > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

});



// ======================================================
// ABOUT - LER MAIS
// ======================================================

// ======================================================
// ABOUT - LER MAIS
// ======================================================

document.querySelectorAll(".ler-mais").forEach(button => {

  button.addEventListener("click", () => {

    const aboutText = button.closest(".about-text");

    if (!aboutText) return;

    const fullText =
      aboutText.querySelector(".full-text");

    if (!fullText) return;

    fullText.classList.toggle("show");

    button.innerText =
      fullText.classList.contains("show")
        ? "Ler menos"
        : "Descubra mais";

  });

});

// ======================================================
// CARDS LINHAS - ACTIVE CENTER
// ======================================================

const cards = document.querySelectorAll(".card-pro");

function updateCardCenter() {

  const center = window.innerWidth / 2;

  cards.forEach(card => {

    const rect = card.getBoundingClientRect();
    const cardCenter = rect.left + rect.width / 2;

    if (Math.abs(center - cardCenter) < 180) {
      card.classList.add("active");
    } else {
      card.classList.remove("active");
    }

  });

  requestAnimationFrame(updateCardCenter);

}

if (cards.length) {
  updateCardCenter();
}


// ======================================================
// DISTRIBUIDORES
// ======================================================

const searchInput = document.getElementById("searchInput");
const filterState = document.getElementById("filterState");
const btnVerMais = document.getElementById("btnVerMais");

let visibleCards = 3;

/* PEGA TODOS OS CARDS */
function getDistributorCards() {
  return document.querySelectorAll(".card-dist");
}

/* FILTRO */
function filterDistributors() {

  const search =
    searchInput
      ? searchInput.value.toLowerCase().trim()
      : "";

  const state =
    filterState
      ? filterState.value.toLowerCase()
      : "";

  let visibleCount = 0;
  let totalMatches = 0;

  getDistributorCards().forEach(card => {

    const city =
      (card.dataset.city || "").toLowerCase();

    const cardState =
      (card.dataset.state || "").toLowerCase();

    const title =
      card.querySelector("h3")
        ?.innerText.toLowerCase() || "";

    const matchSearch =
      city.includes(search) ||
      title.includes(search);

    const matchState =
      !state || cardState === state;

    const shouldShow =
      matchSearch && matchState;

    if (shouldShow) {

      totalMatches++;

      if (visibleCount < visibleCards) {

        card.style.display = "block";
        visibleCount++;

      } else {

        card.style.display = "none";

      }

    } else {

      card.style.display = "none";

    }

  });

  /* BOTÃO */

  if (btnVerMais) {

    if (visibleCards >= totalMatches) {

      btnVerMais.style.display = "none";

    } else {

      btnVerMais.style.display = "inline-flex";

    }

  }

}

/* VER MAIS */

/* VER MAIS / MENOS */

/* VER MAIS / MENOS */

if (btnVerMais) {

  btnVerMais.addEventListener("click", () => {

    const totalCards =
      [...getDistributorCards()]
        .filter(card => card.style.display !== "none")
        .length;

    if (btnVerMais.innerText === "Ver mais") {

      visibleCards += 3;

    } else {

      visibleCards = 3;

      window.scrollTo({
        top:
          document.getElementById("distribuidores")
            .offsetTop - 100,
        behavior: "smooth"
      });

    }

    filterDistributors();

  });

}

/* FILTROS */

if (searchInput) {

  searchInput.addEventListener("input", () => {

    visibleCards = 3;

    filterDistributors();

  });

}

if (filterState) {

  filterState.addEventListener("change", () => {

    visibleCards = 3;

    filterDistributors();

  });

}

/* INIT */

window.addEventListener("load", () => {

  filterDistributors();

});

// ======================================================
// TESTIMONIAL CAROUSEL PRO
// ======================================================

const tTrack = document.getElementById("testimonialTrack");

if (tTrack) {

  let isDown = false;
  let startX;
  let scrollLeft;
  let pause = false;

  const testimonialCards = () =>
    document.querySelectorAll(".testimonial-card");

  /* DRAG */

  tTrack.addEventListener("mousedown", (e) => {

    isDown = true;
    pause = true;

    startX = e.pageX;
    scrollLeft = tTrack.scrollLeft;

  });

  tTrack.addEventListener("mouseup", () => {

    isDown = false;

    setTimeout(() => {
      pause = false;
    }, 1500);

  });

  tTrack.addEventListener("mouseleave", () => {
    isDown = false;
  });

  tTrack.addEventListener("mousemove", (e) => {

    if (!isDown) return;

    e.preventDefault();

    const walk = (e.pageX - startX) * 1.5;

    tTrack.scrollLeft = scrollLeft - walk;

  });

  /* TOUCH */

  tTrack.addEventListener("touchstart", (e) => {

    pause = true;

    startX = e.touches[0].pageX;
    scrollLeft = tTrack.scrollLeft;

  });

  tTrack.addEventListener("touchmove", (e) => {

    const walk = (e.touches[0].pageX - startX) * 1.2;

    tTrack.scrollLeft = scrollLeft - walk;

  });

  tTrack.addEventListener("touchend", () => {

    setTimeout(() => {
      pause = false;
    }, 1500);

  });

  /* AUTOPLAY */

  function autoPlay() {

    if (!pause) {
      tTrack.scrollLeft += 0.4;
    }

    requestAnimationFrame(autoPlay);

  }

  autoPlay();

  /* ACTIVE CARD */

  function updateTestimonialActive() {

    const center =
      tTrack.getBoundingClientRect().left +
      tTrack.offsetWidth / 2;

    testimonialCards().forEach(card => {

      const rect = card.getBoundingClientRect();

      const cardCenter =
        rect.left + rect.width / 2;

      if (Math.abs(center - cardCenter) < 140) {
        card.classList.add("active");
      } else {
        card.classList.remove("active");
      }

    });

    requestAnimationFrame(updateTestimonialActive);

  }

  updateTestimonialActive();

}


// ======================================================
// BACK TO TOP
// ======================================================

const btnTop = document.getElementById("backToTop");

if (btnTop) {

  window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {
      btnTop.classList.add("show");
    } else {
      btnTop.classList.remove("show");
    }

  });

  btnTop.addEventListener("click", () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });

}


// ======================================================
// AUTO BUSCA PRODUTO
// ======================================================

const params = new URLSearchParams(window.location.search);
const produto = params.get("produto");

if (produto && searchInput) {

  searchInput.value = produto.toLowerCase();

  searchInput.dispatchEvent(
    new Event("input")
  );

}

// ======================================================
// WHY CAROUSEL PRO
// ======================================================

const whyTrack = document.querySelector(".track-why");

if (whyTrack) {

  let isDown = false;
  let startX;
  let scrollLeft;
  let pause = false;

  const cards = () =>
    document.querySelectorAll(".card-why");

  /* DRAG */

  whyTrack.addEventListener("mousedown", (e) => {

    isDown = true;
    pause = true;

    startX = e.pageX;
    scrollLeft = whyTrack.scrollLeft;

  });

  whyTrack.addEventListener("mouseup", () => {

    isDown = false;

    setTimeout(() => {
      pause = false;
    }, 1200);

  });

  whyTrack.addEventListener("mouseleave", () => {
    isDown = false;
  });

  whyTrack.addEventListener("mousemove", (e) => {

    if (!isDown) return;

    e.preventDefault();

    const walk = (e.pageX - startX) * 1.5;

    whyTrack.scrollLeft = scrollLeft - walk;

  });

  /* TOUCH */

  whyTrack.addEventListener("touchstart", (e) => {

    pause = true;

    startX = e.touches[0].pageX;
    scrollLeft = whyTrack.scrollLeft;

  });

  whyTrack.addEventListener("touchmove", (e) => {

    const walk = (e.touches[0].pageX - startX) * 1.3;

    whyTrack.scrollLeft = scrollLeft - walk;

  });

  whyTrack.addEventListener("touchend", () => {

    setTimeout(() => {
      pause = false;
    }, 1200);

  });

  /* AUTOPLAY */

  function autoPlay() {

    if (!pause) {
      whyTrack.scrollLeft += 0.4;
    }

    requestAnimationFrame(autoPlay);

  }

  autoPlay();

  /* ACTIVE CARD */

  function updateWhyActive() {

    const center =
      whyTrack.getBoundingClientRect().left +
      whyTrack.offsetWidth / 2;

    cards().forEach(card => {

      const rect = card.getBoundingClientRect();

      const cardCenter =
        rect.left + rect.width / 2;

      if (Math.abs(center - cardCenter) < 140) {
        card.classList.add("active");
      } else {
        card.classList.remove("active");
      }

    });

    requestAnimationFrame(updateWhyActive);

  }

  updateWhyActive();

}


