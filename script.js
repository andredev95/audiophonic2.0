// ================= MENU =================
const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

if (toggle && menu) {
  toggle.onclick = () => {
    menu.classList.toggle("active");
  };
}

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