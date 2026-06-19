(() => {
  document.body.classList.add("motion-ready");
  const state = { language: "zh", filter: "all", photoMode: "film", camera: "all", film: "all", lightboxIndex: 0, visiblePhotos: [] };
  const root = document.documentElement;
  const publicationList = document.querySelector("#publication-list");
  const gallery = document.querySelector("#gallery");
  const photoFilters = document.querySelector("#photo-filters");
  const lightbox = document.querySelector(".lightbox");
  const contactLink = document.querySelector("#contact-link");
  const educationList = document.querySelector("#education-list");

  contactLink.href = `mailto:${SITE.contactEmail}`;
  document.querySelector("#contact-email").textContent = SITE.contactEmail;

  function renderPublications() {
    const visible = PUBLICATIONS.filter((paper) => state.filter === "all" || String(paper.year) === state.filter);
    publicationList.innerHTML = visible.map((paper, index) => {
      const authorMarkup = paper.authors.map((author) => author === "Donghua Liu" ? `<strong>${author}</strong>` : author).join(", ");
      return `
        <article class="publication reveal" style="--order:${index}">
          <div class="publication-year">${paper.year}</div>
          <div class="publication-main">
            <h3>${paper.title}</h3>
            <p class="publication-authors">${authorMarkup}</p>
            <p class="publication-journal"><i>${paper.journal}</i> · ${paper.details}</p>
          </div>
          <a class="publication-link magnetic" href="https://doi.org/${paper.doi}" target="_blank" rel="noreferrer" aria-label="${I18N[state.language].doiLabel}: ${paper.title}">
            <span>DOI</span><b>↗</b>
          </a>
        </article>`;
    }).join("");
    observeReveals();
    bindMagnetic();
  }

  function renderEducation() {
    educationList.innerHTML = EDUCATION.map((item) => `
      <li class="education-item">
        <time>${item.period[state.language]}</time>
        <div>
          <h3>${item.institution[state.language]}</h3>
          <p>${item.program[state.language]}</p>
          <p class="education-advisor">${I18N[state.language].advisorLabel} · ${item.advisor[state.language]}</p>
        </div>
      </li>`).join("");
  }

  function uniqueValues(items, key) {
    return [...new Set(items.map((item) => item[key]).filter(Boolean))];
  }

  function renderPhotoFilters() {
    const modePhotos = PHOTOS.filter((photo) => photo.type === state.photoMode);
    const cameras = uniqueValues(modePhotos, "camera");
    const films = uniqueValues(modePhotos, "film");
    const dictionary = I18N[state.language];
    const button = (kind, value, label, active) => `<button class="photo-filter ${active ? "active" : ""}" type="button" data-photo-filter="${kind}" data-value="${value}">${label}</button>`;

    photoFilters.innerHTML = `
      <div class="photo-filter-group">
        <span>${dictionary.cameraLabel}</span>
        ${button("camera", "all", dictionary.filterAll, state.camera === "all")}
        ${cameras.map((camera) => button("camera", camera, camera, state.camera === camera)).join("")}
      </div>
      ${state.photoMode === "film" ? `<div class="photo-filter-group">
        <span>${dictionary.filmLabel}</span>
        ${button("film", "all", dictionary.filterAll, state.film === "all")}
        ${films.map((film) => button("film", film, film, state.film === film)).join("")}
      </div>` : ""}`;
  }

  function renderGallery() {
    state.visiblePhotos = PHOTOS.filter((photo) => photo.type === state.photoMode && (state.camera === "all" || photo.camera === state.camera) && (state.film === "all" || photo.film === state.film));
    renderPhotoFilters();
    if (!state.visiblePhotos.length) {
      gallery.innerHTML = `<p class="gallery-empty">${I18N[state.language].photoEmpty}</p>`;
      return;
    }
    gallery.innerHTML = state.visiblePhotos.map((photo, index) => `
      <button class="gallery-item ${photo.orientation} ${photo.featured ? "featured" : ""} reveal" type="button" data-index="${index}" aria-label="${I18N[state.language][photo.type === "film" ? "photoTypeFilm" : "photoTypeDigital"]} ${index + 1}">
        <span class="image-wrap">
          <img src="./assets/photos/${photo.file}" alt="${I18N[state.language][photo.type === "film" ? "photoTypeFilm" : "photoTypeDigital"]} ${index + 1}" loading="${index < 2 ? "eager" : "lazy"}" />
        </span>
        <span class="gallery-caption"><i>${String(index + 1).padStart(2, "0")}</i><b>${photo.camera}${photo.film ? ` · ${photo.film}` : ""}</b></span>
      </button>`).join("");
    gallery.querySelectorAll(".gallery-item").forEach((item) => item.addEventListener("click", () => openLightbox(Number(item.dataset.index))));
    observeReveals();
  }

  function setLanguage(language) {
    state.language = language;
    root.lang = language === "zh" ? "zh-CN" : "en";
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      node.textContent = I18N[language][node.dataset.i18n];
    });
    document.querySelectorAll(".language-toggle span").forEach((node, index) => {
      node.classList.toggle("active", language === "zh" ? index === 0 : index === 2);
    });
    renderGallery();
    renderPublications();
    renderEducation();
    if (lightbox.open) updateLightbox();
  }

  function updateLightbox() {
    const photo = state.visiblePhotos[state.lightboxIndex];
    const image = lightbox.querySelector("img");
    image.src = `./assets/photos/${photo.file}`;
    image.alt = `${I18N[state.language][photo.type === "film" ? "photoTypeFilm" : "photoTypeDigital"]} ${state.lightboxIndex + 1}`;
    lightbox.querySelector("figcaption span").textContent = `${photo.camera}${photo.film ? ` · ${photo.film}` : ""}`;
    lightbox.querySelector("figcaption i").textContent = `${state.lightboxIndex + 1} / ${state.visiblePhotos.length}`;
  }

  function openLightbox(index) {
    state.lightboxIndex = index;
    updateLightbox();
    lightbox.showModal();
    document.body.classList.add("modal-open");
  }

  function moveLightbox(direction) {
    state.lightboxIndex = (state.lightboxIndex + direction + state.visiblePhotos.length) % state.visiblePhotos.length;
    updateLightbox();
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

  function observeReveals() {
    const pending = document.querySelectorAll(".reveal:not(.visible)");
    pending.forEach((item) => revealObserver.observe(item));
    requestAnimationFrame(revealInViewport);
  }

  function revealInViewport() {
    document.querySelectorAll(".reveal:not(.visible)").forEach((item) => {
      const rect = item.getBoundingClientRect();
      if (rect.top < innerHeight * 0.94 && rect.bottom > 0) {
        item.classList.add("visible");
        revealObserver.unobserve(item);
      }
    });
  }

  function bindMagnetic() {
    if (!matchMedia("(pointer:fine)").matches) return;
    document.querySelectorAll(".magnetic:not([data-magnetic])").forEach((element) => {
      element.dataset.magnetic = "true";
      element.addEventListener("pointermove", (event) => {
        const rect = element.getBoundingClientRect();
        element.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * 0.16}px, ${(event.clientY - rect.top - rect.height / 2) * 0.16}px)`;
      });
      element.addEventListener("pointerleave", () => { element.style.transform = ""; });
    });
  }

  document.querySelector(".language-toggle").addEventListener("click", () => setLanguage(state.language === "zh" ? "en" : "zh"));
  document.querySelectorAll(".filter").forEach((button) => button.addEventListener("click", () => {
    state.filter = button.dataset.filter;
    document.querySelectorAll(".filter").forEach((item) => item.classList.toggle("active", item === button));
    renderPublications();
  }));

  document.querySelectorAll(".photo-mode-button").forEach((button) => button.addEventListener("click", () => {
    state.photoMode = button.dataset.photoMode;
    state.camera = "all";
    state.film = "all";
    document.querySelectorAll(".photo-mode-button").forEach((item) => item.classList.toggle("active", item === button));
    renderGallery();
  }));

  photoFilters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-photo-filter]");
    if (!button) return;
    state[button.dataset.photoFilter] = button.dataset.value;
    renderGallery();
  });

  lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
  lightbox.querySelector(".previous").addEventListener("click", () => moveLightbox(-1));
  lightbox.querySelector(".next").addEventListener("click", () => moveLightbox(1));
  lightbox.addEventListener("close", () => document.body.classList.remove("modal-open"));
  lightbox.addEventListener("click", (event) => { if (event.target === lightbox) lightbox.close(); });
  document.addEventListener("keydown", (event) => {
    if (!lightbox.open) return;
    if (event.key === "ArrowLeft") moveLightbox(-1);
    if (event.key === "ArrowRight") moveLightbox(1);
  });

  const cursor = document.querySelector(".cursor");
  if (matchMedia("(pointer:fine)").matches) {
    window.addEventListener("pointermove", (event) => {
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    });
    document.addEventListener("pointerover", (event) => cursor.classList.toggle("hover", Boolean(event.target.closest("a, button"))));
  }

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    requestAnimationFrame(() => {
      const progress = scrollY / (document.documentElement.scrollHeight - innerHeight);
      document.querySelector(".scroll-progress").style.transform = `scaleX(${progress})`;
      document.querySelector(".hero-image").style.transform = `translateY(${Math.min(scrollY * 0.14, 120)}px) scale(1.05)`;
      revealInViewport();
      ticking = false;
    });
    ticking = true;
  }, { passive: true });

  document.querySelector("#year").textContent = new Date().getFullYear();
  renderPublications();
  renderGallery();
  renderEducation();
  observeReveals();
  bindMagnetic();
  window.addEventListener("load", () => setTimeout(() => document.body.classList.add("loaded"), 350));
})();
