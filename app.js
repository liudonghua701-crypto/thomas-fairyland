(() => {
  const state = { language: "zh", filter: "all", lightboxIndex: 0 };
  const root = document.documentElement;
  const publicationList = document.querySelector("#publication-list");
  const gallery = document.querySelector("#gallery");
  const lightbox = document.querySelector(".lightbox");

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

  function renderGallery() {
    gallery.innerHTML = PHOTOS.map((photo, index) => `
      <button class="gallery-item ${photo.orientation} ${photo.featured ? "featured" : ""} reveal" type="button" data-index="${index}" aria-label="${photo[state.language]}">
        <span class="image-wrap">
          <img src="./assets/photos/${photo.file}" alt="${photo[state.language]}" loading="${index < 2 ? "eager" : "lazy"}" />
        </span>
        <span class="gallery-caption"><i>${String(index + 1).padStart(2, "0")}</i><b>${photo[state.language]}</b></span>
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
    if (lightbox.open) updateLightbox();
  }

  function updateLightbox() {
    const photo = PHOTOS[state.lightboxIndex];
    const image = lightbox.querySelector("img");
    image.src = `./assets/photos/${photo.file}`;
    image.alt = photo[state.language];
    lightbox.querySelector("figcaption span").textContent = photo[state.language];
    lightbox.querySelector("figcaption i").textContent = `${state.lightboxIndex + 1} / ${PHOTOS.length}`;
  }

  function openLightbox(index) {
    state.lightboxIndex = index;
    updateLightbox();
    lightbox.showModal();
    document.body.classList.add("modal-open");
  }

  function moveLightbox(direction) {
    state.lightboxIndex = (state.lightboxIndex + direction + PHOTOS.length) % PHOTOS.length;
    updateLightbox();
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  function observeReveals() {
    const pending = document.querySelectorAll(".reveal:not(.visible)");
    pending.forEach((item) => revealObserver.observe(item));
    setTimeout(() => pending.forEach((item) => item.classList.add("visible")), 1400);
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
      ticking = false;
    });
    ticking = true;
  }, { passive: true });

  document.querySelector("#year").textContent = new Date().getFullYear();
  renderPublications();
  renderGallery();
  observeReveals();
  bindMagnetic();
  window.addEventListener("load", () => setTimeout(() => document.body.classList.add("loaded"), 350));
})();
