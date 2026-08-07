/**
 * MASTER GROUP | HOSPITALITY - INTERACTIVE CONTROLLER
 * Full client-side functionality: filtering, modals, and form submission
 */

// Dataset of Master Group Brands
const BRANDS_DATA = {
  beijing: {
    id: "beijing",
    name: "Beijing Asian Cuisine",
    category: "asiatica",
    categoryLabel: "Alta Cocina Asiática",
    image: "assets/beijing/cover.jpg",
    concept: "Inmersión Gastronómica Asiática de Autor",
    tagline: "3 restaurantes operando desde 2018, especializados en cocina china, japonesa y del sudeste asiático.",
    description: "Beijing Asian Cuisine opera 3 restaurantes desde 2018. Cocina china, japonesa y del sudeste asiático, con dim sum elaborado a diario y pato pekín preparado en horno de asado tradicional.",
    highlights: [
      "Dim Sum elaborado a diario en cocina propia.",
      "Pato Pekín preparado en hornos de asado tradicional.",
      "Carta de mixología con botánicos orientales y tés."
    ],
    tags: ["Fine Dining", "Asian Fusion", "Robata & Dim Sum", "Cocktail Bar"],
    stats: { locations: "3 Restaurantes", capacity: "180 Asientos", foundation: "2018" }
  },
  lagringa: {
    id: "lagringa",
    name: "La Gringa",
    category: "urbana",
    categoryLabel: "Street Food & Urban Casual",
    image: "assets/la-gringa/cover.jpg",
    concept: "Cocina Urbana Latina & Street Food Elevado",
    tagline: "4 locales operando desde 2020, especializados en tacos y street food urbano.",
    description: "La Gringa opera 4 locales desde 2020. Tacos y street food urbano, con tortillas de maíz nixtamalizado hechas a mano y cortes ahumados a baja temperatura.",
    highlights: [
      "Tacos en tortillas de maíz nixtamalizado hechas a mano al momento.",
      "Cortes ahumados a baja temperatura con recetas de la casa.",
      "Bar de margaritas y agaves de selección propia."
    ],
    tags: ["Casual Dining", "Tacos & Mezcal", "Urban Latin", "High Energy"],
    stats: { locations: "4 Locales", capacity: "120 Asientos", foundation: "2020" }
  },
  annkara: {
    id: "annkara",
    name: "Annkara Arabian Food",
    category: "arabe",
    categoryLabel: "Gastronomía del Medio Oriente",
    image: "assets/annkara/cover.jpg",
    concept: "La Magia y Hospitalidad del Medio Oriente",
    tagline: "2 ubicaciones operando desde 2019, especializadas en cocina turco-árabe.",
    description: "Annkara opera 2 ubicaciones desde 2019. Cocina turco-árabe con mezze, shawarma de cordero, kebabs y dulces preparados en cocina propia.",
    highlights: [
      "Hummus con piñones tostados en aceite de oliva extravirgen.",
      "Pan pita horneado frente al comensal en hornos refractarios.",
      "Té y café turco servidos en vajilla de bronce."
    ],
    tags: ["Medio Oriente", "Mezze Bar", "Hospitalidad Auténtica", "Halal Certified"],
    stats: { locations: "2 Ubicaciones", capacity: "140 Asientos", foundation: "2019" }
  },
  pushroll: {
    id: "pushroll",
    name: "Push Roll by Beijing",
    category: "asiatica",
    categoryLabel: "Asian Grab & Go / Fast-Casual",
    image: "assets/push-roll/cover.jpg",
    concept: "Sushi & Temakis de Alta Gama para la Vida Urbana",
    tagline: "6 puntos de venta operando desde 2021, formato grab & go de Beijing Asian Cuisine.",
    description: "Push Roll opera 6 puntos de venta desde 2021, bajo el mismo estándar de cocina de Beijing Asian Cuisine. Temaki bar y hand-rolls preparados en minutos, para consumo en sitio o delivery.",
    highlights: [
      "Salmón certificado de pesca sostenible y atún aleta amarilla.",
      "Formato Hand-Roll listo para consumir o delivery.",
      "Salsas propias, trufada y ponzu, desarrolladas por el equipo de cocina."
    ],
    tags: ["Grab & Go", "Temaki Bar", "Sushi Burrito", "Rápida Expansión"],
    stats: { locations: "6 Puntos de Venta", capacity: "Express & Delivery", foundation: "2021" }
  },
  camposanto: {
    id: "camposanto",
    name: "Campo Santo",
    category: "huerta",
    categoryLabel: "Cocina de Huerta & Hortalizas",
    image: "assets/campo-santo/cover.jpg",
    concept: "Gastronomía de Autor Basada en Hortalizas & Cultivo Local",
    tagline: "2 flagships operando desde 2022, especializados en cocina de huerta.",
    description: "Campo Santo opera 2 flagships desde 2022. Cocina de huerta con hortalizas de cultivo local, cosechadas a diario, y técnicas de fermentación y ahumado vegetal propias.",
    highlights: [
      "Cosecha diaria de hortalizas orgánicas de agricultores locales aliados.",
      "Fermentación casera, ahumado vegetal al carbón y deshidratación propios.",
      "Carta vegetal de temporada con aceites infusionados propios."
    ],
    tags: ["Cocina de Huerta", "Hortalizas Frescas", "Farm-to-Table", "Orgánico & Botánico"],
    stats: { locations: "2 Flagships", capacity: "160 Asientos", foundation: "2022" }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initFilterSystem();
  initModalSystem();
  initFormHandler();
  initMobileNav();
});

/* 1. Header scroll detection */
function initHeader() {
  const header = document.querySelector(".header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

/* 2. Brand Filtering System */
function initFilterSystem() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const brandCards = document.querySelectorAll(".brand-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      brandCards.forEach(card => {
        const category = card.getAttribute("data-category");

        if (filterValue === "all" || category === filterValue) {
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(20px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });
}

/* 3. Modal Popup System */
function initModalSystem() {
  const backdrop = document.getElementById("brandModal");
  const closeBtn = document.getElementById("closeModalBtn");
  const modalHeroImg = document.getElementById("modalHeroImg");
  const modalTitle = document.getElementById("modalTitle");
  const modalCategory = document.getElementById("modalCategory");
  const modalTagline = document.getElementById("modalTagline");
  const modalDesc = document.getElementById("modalDesc");
  const modalHighlights = document.getElementById("modalHighlights");
  const modalStats = document.getElementById("modalStats");

  // Open modal trigger
  document.querySelectorAll(".open-brand-modal").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const brandKey = btn.getAttribute("data-brand");
      const data = BRANDS_DATA[brandKey];
      if (!data) return;

      modalHeroImg.src = data.image;
      modalTitle.textContent = data.name;
      modalCategory.textContent = data.categoryLabel;
      modalTagline.textContent = `"${data.tagline}"`;
      modalDesc.textContent = data.description;

      // Populate highlights
      modalHighlights.innerHTML = data.highlights
        .map(h => `<li style="margin-bottom: 0.6rem; color: var(--color-clear-gray);"><strong style="color: var(--color-master-gold);">✓</strong> ${h}</li>`)
        .join("");

      // Populate stats
      modalStats.innerHTML = `
        <div style="background: rgba(35,31,32,0.6); padding: 1rem; border-radius: 8px; text-align: center; border: var(--border-gold-subtle);">
          <div style="font-size: 1.1rem; font-weight: 700; color: var(--color-master-gold);">${data.stats.locations}</div>
          <div style="font-size: 0.75rem; color: var(--color-clear-gray);">PRESENCIA</div>
        </div>
        <div style="background: rgba(35,31,32,0.6); padding: 1rem; border-radius: 8px; text-align: center; border: var(--border-gold-subtle);">
          <div style="font-size: 1.1rem; font-weight: 700; color: var(--color-master-gold);">${data.stats.capacity}</div>
          <div style="font-size: 0.75rem; color: var(--color-clear-gray);">CAPACIDAD</div>
        </div>
        <div style="background: rgba(35,31,32,0.6); padding: 1rem; border-radius: 8px; text-align: center; border: var(--border-gold-subtle);">
          <div style="font-size: 1.1rem; font-weight: 700; color: var(--color-master-gold);">${data.stats.foundation}</div>
          <div style="font-size: 0.75rem; color: var(--color-clear-gray);">LANZAMIENTO</div>
        </div>
      `;

      backdrop.classList.add("active");
    });
  });

  // Close handlers
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      backdrop.classList.remove("active");
    });
  }

  if (backdrop) {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove("active");
      }
    });
  }
}

/* 4. Form Handler */
function initFormHandler() {
  const form = document.getElementById("investorForm");
  const successNotice = document.getElementById("formSuccessNotice");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector("button[type='submit']");
    const originalText = btn.innerHTML;

    btn.innerHTML = `<span>Procesando Solicitud...</span>`;
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = `<span>✓ Solicitud Enviada con Éxito</span>`;
      btn.style.background = "#2e7d32";
      btn.style.color = "#ffffff";
      if (successNotice) {
        successNotice.style.display = "block";
      }
      form.reset();

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        btn.style.background = "";
        btn.style.color = "";
        if (successNotice) {
          successNotice.style.display = "none";
        }
      }, 5000);
    }, 1200);
  });
}

/* 5. Mobile Toggle Navigation */
function initMobileNav() {
  const toggle = document.querySelector(".mobile-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }
}
