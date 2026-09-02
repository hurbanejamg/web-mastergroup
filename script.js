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
    categoryLabel: "Cocina Asiática · Marca Principal",
    image: "assets/beijing/cover.jpg",
    concept: "Cocina Asiática en Tres Modelos Operativos",
    tagline: "12 sedes activas: 5 Bar Rest, 6 Express y operación centralizada To Go.",
    description: "Beijing Asian Cuisine es la marca más grande del holding. Opera bajo tres formatos estructurados según el momento de consumo: Beijing Bar Rest (restaurantes de servicio a la mesa, experiencia de lujo y ambiente familiar), Beijing Express (ferias de comida en centros comerciales, con servicio ágil y precios accesibles manteniendo el estándar de calidad Beijing) y Beijing To Go (delivery para todas las sedes, respaldado en la dark kitchen de San Bernardino).",
    highlights: [
      "Bar Rest (5 sedes): La Tahona (sede matriz), La Boyera, Los Naranjos, Altamira y Lechería.",
      "Express (6 sedes en ferias de CC): Millennium, Chacao, El Recreo, Sambil La Candelaria, Multiplaza El Paraíso y Sambil Barquisimeto.",
      "To Go: Dark kitchen central en San Bernardino y despacho a domicilio para toda la red."
    ],
    tags: ["Bar Rest", "Express", "Dark Kitchen", "12 Sedes"],
    stats: { locations: "12 Sedes", capacity: "Bar Rest & Express", foundation: "2018" }
  },
  lagringa: {
    id: "lagringa",
    name: "La Gringa",
    category: "urbana",
    categoryLabel: "Urbana & Casual · Burgers & Tacos",
    image: "assets/la-gringa/cover.jpg",
    concept: "Cruce Gastronómico de Burgers Americanas y Tacos Mexicanos",
    tagline: "Ni solo hamburguesería ni solo taquería: el cruce de las dos es el punto.",
    description: "La Gringa une dos tradiciones de comida callejera en una sola carta: hamburguesas de estilo americano y tacos mexicanos sobre tortillas artesanales. Un formato casual, desenfadado y sin poses pensado para el público joven-adulto que busca sabor contundente y ambiente relajado.",
    highlights: [
      "Carta híbrida: smash burgers americanas y tacos mexicanos de receta propia.",
      "Formato casual dining con servicio ágil, coctelería y cervezas.",
      "Ambiente urbano sin poses, con operación optimizada para salón y delivery."
    ],
    tags: ["Burgers Americanas", "Tacos Mexicanos", "Casual Dining", "Sin Poses"],
    stats: { locations: "Caracas", capacity: "Salón & Delivery", foundation: "2020" }
  },
  annkara: {
    id: "annkara",
    name: "Annkara Arabian Food",
    category: "arabe",
    categoryLabel: "Medio Oriente · Sazón Venezolana",
    image: "assets/annkara/cover.jpg",
    concept: "Comida Árabe con Sazón y Mestizaje Venezolano",
    tagline: "El mestizaje cultural entre las recetas árabes y el paladar venezolano.",
    description: "Annkara adapta la cocina tradicional del Medio Oriente al gusto local venezolano. Ese mestizaje de sabores es su factor diferenciador en feria de centros comerciales, ofreciendo platos reconocibles, porciones generosas y precios competitivos para comensales curiosos y familias.",
    highlights: [
      "2 sedes en formato express: CC El Recreo y Sambil La Candelaria.",
      "Shawarmas, mezze, falafel y platos mixtos con sazón y aderezos adaptados al gusto local.",
      "Servicio de feria de alta rotación con estandarización de porciones y tiempos de despacho."
    ],
    tags: ["Árabe con Sazón Local", "Formato Express", "Centros Comerciales", "2 Sedes"],
    stats: { locations: "2 Sedes Express", capacity: "Ferias de CC", foundation: "2019" }
  },
  pushroll: {
    id: "pushroll",
    name: "Push Roll by Beijing",
    category: "asiatica",
    categoryLabel: "Fast Casual · Sushi On The Go",
    image: "assets/push-roll/cover.jpg",
    concept: "Sushi y Rolls para Llevar, Listos en Minutos",
    tagline: "6 puntos activos entre Caracas y Lechería con la cocina de Beijing.",
    description: "Push Roll lleva la calidad y recetas de Beijing Asian Cuisine a un formato rápido, práctico y portátil. Diseñado para un público joven y en movimiento, entrega sushi rolls, temakis y combos armados en minutos sin sacrificar la frescura del pescado ni la técnica oriental.",
    highlights: [
      "6 puntos de venta operativos distribuidos entre Caracas y Lechería.",
      "Apalancado en la infraestructura, compras y cocina central de Beijing Asian Cuisine.",
      "Formato grab & go con empaques diseñados para consumo inmediato o take-away."
    ],
    tags: ["Sushi On The Go", "Grab & Go", "Calidad Beijing", "6 Puntos"],
    stats: { locations: "6 Puntos", capacity: "Caracas & Lechería", foundation: "2021" }
  },
  camposanto: {
    id: "camposanto",
    name: "Campo Santo",
    category: "huerta",
    categoryLabel: "Siembra & Suministro · Productos del Campo",
    image: "assets/campo-santo/cover.jpg",
    concept: "Producción Agrícola, Suministro Interno y Vida de Campo",
    tagline: "Motor de suministro para el holding y productos de la tierra para comer sano.",
    description: "Campo Santo opera en dos dimensiones: hacia adentro, es el motor de siembra y suministro que abastece de hortalizas y vegetales frescos a los restaurantes de Master Group, reduciendo intermediarios y asegurando calidad desde la raíz. Hacia afuera, es una marca agrícola que conecta con quienes viven en el campo o buscan una alimentación sana, limpia y natural.",
    highlights: [
      "Cara interna: Siembra propia que abastece directamente a las marcas del grupo.",
      "Cara de marca: Hortalizas, cosecha fresca y productos de la tierra para consumo saludable.",
      "Control integral de la cadena: trazabilidad desde la semilla hasta la cocina."
    ],
    tags: ["Siembra Propia", "Suministro Interno", "Productos del Campo", "Alimentación Sana"],
    stats: { locations: "Siembra Central", capacity: "Abastecimiento & Marca", foundation: "Producción Propia" }
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
    const icon = toggle.querySelector(".material-symbols-outlined");

    toggle.addEventListener("click", () => {
      const isActive = navLinks.classList.toggle("active");
      if (icon) {
        icon.textContent = isActive ? "close" : "menu";
      }
    });

    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        if (icon) {
          icon.textContent = "menu";
        }
      });
    });
  }
}
