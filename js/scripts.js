document.addEventListener("DOMContentLoaded", function () {
  // --- Core DOM Elements ---
  const menuToggle = document.getElementById("menuToggle");
  const mainMenu = document.getElementById("mainMenu");
  const themeToggle = document.getElementById("themeToggle");
  const languageToggle = document.getElementById("languageToggle");
  const servicesContainer = document.getElementById("services-grid");
  const aboutContainer = document.getElementById("about-container");
  const aboutTextContainer = document.getElementById("about-text-content");
  const contactForm = document.getElementById("contactForm");
  const serviceSelect = document.getElementById("service");
  const header = document.querySelector("header");

  // --- Application State ---
  let services = [];
  let aboutData = null;
  let currentLanguage = localStorage.getItem("language") || "es";

  // --- Static Texts --- 
  const staticTexts = {
    es: {
      home: "Inicio",
      services: "Nuestros Servicios",
      contact: "Contáctenos",
      about: "Nosotros",
      solutions: "Soluciones Digitales a la Medida",
      transform: "Transformamos tus ideas en soluciones digitales innovadoras para impulsar el crecimiento de tu negocio.",
      servicesBtn: "Nuestros Servicios",
      contactBtn: "Contáctenos",
      servicesDesc: "Ofrecemos soluciones integrales adaptadas a las necesidades específicas de cada cliente.",
      contactTitle: "Contáctenos",
      address: "Dirección",
      phone: "Teléfono",
      email: "Correo electrónico",
      emailPlaceholder: "ejemplo@correo.com",
      emailError: "Por favor ingrese un correo electrónico válido",
      website: "Sitio Web",
      sendMessage: "Envíenos un mensaje",
      fullName: "Nombre completo",
      serviceInterest: "Servicio de interés",
      selectService: "Seleccione un servicio",
      message: "Mensaje",
      send: "Enviar Mensaje",
      successMessage: "¡Mensaje enviado correctamente!",
      retry: "Reintentar",
      loadingError: "No se pudieron cargar los servicios.",
      aboutError: "No se pudo cargar la información de Nosotros.",
      mission: "Misión",
      vision: "Visión",
      values: "Nuestros Valores"
    },
    en: {
      home: "Home",
      services: "Our Services",
      contact: "Contact Us",
      about: "About Us",
      solutions: "Tailored Digital Solutions",
      transform: "We transform your ideas into innovative digital solutions to drive your business growth.",
      servicesBtn: "Our Services",
      contactBtn: "Contact Us",
      servicesDesc: "We offer comprehensive solutions tailored to the specific needs of each client.",
      contactTitle: "Contact Us",
      address: "Address",
      phone: "Phone",
      email: "Email address",
      emailPlaceholder: "example@email.com",
      emailError: "Please enter a valid email address",
      website: "Website",
      sendMessage: "Send us a message",
      fullName: "Full name",
      serviceInterest: "Service of interest",
      selectService: "Select a service",
      message: "Message",
      send: "Send Message",
      successMessage: "Message sent successfully!",
      retry: "Retry",
      loadingError: "Could not load services.",
      aboutError: "Could not load About Us information.",
      mission: "Mission",
      vision: "Vision",
      values: "Our Values"
    }
  };

  // --- Helper Functions ---

  /**
   * Limits function execution frequency
   * @param {Function} func - The function to debounce
   * @param {number} wait - Delay in milliseconds
   * @returns {Function} - Debounced function
   */
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  /**
   * Updates text content safely with null checks
   */
  function updateText(selector, text) {
    const element = document.querySelector(selector);
    if (element) {
      element.textContent = text;
    }
  }

  /**
   * Updates an attribute safely with null checks
   */
  function updateAttr(selector, attr, value) {
    const element = document.querySelector(selector);
    if (element) {
      element.setAttribute(attr, value);
    }
  }

  // --- Language Management ---

  /**
   * Sets the application language and updates UI
   */
  function setLanguage(language) {
    if (language !== "es" && language !== "en") language = "es";
    document.documentElement.lang = language;
    document.documentElement.setAttribute("data-language", language);
    localStorage.setItem("language", language);
    currentLanguage = language;
    updateUILanguage();
  }

  /**
   * Updates all UI elements based on current language
   */
  function updateUILanguage() {
    const texts = staticTexts[currentLanguage];
    const isSpanish = currentLanguage === "es";

    // Update navigation
    updateText(".main-menu a[href='#home']", texts.home);
    updateText(".main-menu a[href='#services']", texts.services);
    updateText(".main-menu a[href='#about']", texts.about);
    updateText(".main-menu a[href='#contact']", texts.contact);

    // Hero Section
    updateText("#home h2", texts.solutions);
    updateText("#home .hero-content p", texts.transform);
    updateText("#home .cta-buttons .btn-primary", texts.servicesBtn);
    updateText("#home .cta-buttons .btn-secondary", texts.contactBtn);

    // Services Section
    updateText("#services .section-title", texts.services);
    updateText("#services .section-description", texts.servicesDesc);

    // About Section Title/Description
    updateText("#about .section-title", texts.about);
    updateText(
      "#about .section-description",
      currentLanguage === "es"
        ? "Conoce más sobre nuestra empresa y nuestra filosofía de trabajo."
        : "Learn more about our company and work philosophy."
    );

    // Contact Section
    updateText("#contact .section-title", texts.contactTitle);
    updateText("#contact .contact-info .info-item:nth-child(1) h3", texts.address);
    updateText("#contact .contact-info .info-item:nth-child(2) h3", texts.phone);
    updateText("#contact .contact-info .info-item:nth-child(3) h3", texts.email);
    updateText("#contact .contact-info .info-item:nth-child(4) h3", texts.website);
    updateText("#contact .contact-form h3", texts.sendMessage);
    updateText("label[for='name']", texts.fullName);
    updateText("label[for='email']", texts.email);
    updateText("label[for='service']", texts.serviceInterest);
    updateText("label[for='message']", texts.message);
    updateText("#contactForm button[type='submit']", texts.send);
    updateText("#service option[value='']", texts.selectService);
    updateAttr("#email", "placeholder", texts.emailPlaceholder);

    // Footer
    updateText(".footer-links h4", isSpanish ? "Enlaces Rápidos" : "Quick Links");
    updateText(".footer-contact h4", texts.contact);
    updateText(".footer-social h4", isSpanish ? "Síguenos" : "Follow Us");
    updateText(".footer-links a[href='#home']", texts.home);
    updateText(".footer-links a[href='#services']", texts.services);
    updateText(".footer-links a[href='#about']", texts.about);
    updateText(".footer-links a[href='#contact']", texts.contact);
    updateText(
      ".footer-bottom p",
      isSpanish
        ? "© 2025 ConIngenio. Todos los derechos reservados."
        : "© 2025 ConIngenio. All rights reserved."
    );

    // Re-render dynamic content if data exists
    if (services.length > 0) {
      renderServices(services);
      populateServiceSelect(services);
    }
    if (aboutData) {
      renderAboutUs(aboutData);
    }
  }

  // --- Theme Management ---

  /**
   * Sets theme and persists to localStorage
   */
  function setTheme(theme) {
    if (theme !== "light" && theme !== "dark") theme = "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }

  // --- Navigation ---

  /**
   * Sets up smooth scrolling and active link highlighting
   */
  function setupSmoothNavigation() {
    const navLinks = document.querySelectorAll('.main-menu a, .footer-links a, .cta-buttons a[href^="#"]');
    const headerHeight = header ? header.offsetHeight : 0;
    const scrollOffset = 50;

    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);

          if (targetElement) {
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - scrollOffset;

            window.scrollTo({ top: targetPosition, behavior: 'smooth' });

            if (mainMenu && mainMenu.classList.contains('active')) {
              mainMenu.classList.remove('active');
            }
          }
        }
      });
    });

    const handleScroll = debounce(() => {
      const scrollPosition = window.scrollY;
      let activeSectionId = null;

      document.querySelectorAll("section[id]").forEach((section) => {
        const sectionTop = section.offsetTop - headerHeight - scrollOffset - 5;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          activeSectionId = section.getAttribute("id");
        }
      });

      if (scrollPosition < window.innerHeight * 0.5) {
        activeSectionId = "home";
      }

      document.querySelectorAll(".main-menu a").forEach((item) => {
        item.classList.toggle("active", item.getAttribute("href") === "#" + activeSectionId);
      });
    }, 100);

    window.addEventListener("scroll", handleScroll);
  }

  // --- API Data Loading ---

  /**
   * Generic data fetching with error handling
   * @param {string} apiUrl - API endpoint
   * @param {string} entityName - Entity type being fetched
   * @param {HTMLElement} loadingContainer - Container to show loading state
   * @param {string} errorTextKey - Key for error message in staticTexts
   * @returns {Array|null} - Fetched data or null on error
   */
  async function fetchData(apiUrl, entityName, loadingContainer, errorTextKey) {
    loadingContainer.innerHTML = `
          <div class="loading-container">
              <i class="fas fa-spinner fa-spin fa-lg loading-icon"></i>
          </div>`;
    if (entityName === "about") aboutContainer?.classList.add("loading");

    try {
      const proxyUrl = "https://cors-anywhere.herokuapp.com/";
      const response = await fetch(proxyUrl + apiUrl, {
        method: "GET",
        headers: {
          Authorization: "Bearer ciisa",
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest"
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const responseData = await response.json();

      if (!responseData || !responseData.data || !Array.isArray(responseData.data)) {
        throw new Error("Invalid API response structure");
      }

      if (entityName === "about") aboutContainer?.classList.remove("loading");
      return responseData.data;
    } catch (error) {
      console.error(`Error loading ${entityName}:`, error);
      loadingContainer.innerHTML = `
              <div class="error-container">
                  <i class="fas fa-exclamation-triangle"></i>
                  <p>${staticTexts[currentLanguage][errorTextKey]} (${error.message})</p>
                  <button class="btn btn-primary retry-btn">${staticTexts[currentLanguage].retry}</button>
              </div>`;
      if (entityName === "about") aboutContainer?.classList.add("error-state");
      else loadingContainer.className = "error-state";

      const retryButton = loadingContainer.querySelector(".retry-btn");
      if (retryButton) {
        const loadFunction = entityName === "services" ? loadServices : loadAboutUs;
        retryButton.addEventListener("click", loadFunction, { once: true });
      }
      return null;
    }
  }

  /**
   * Loads services data from API
   */
  async function loadServices() {
    const data = await fetchData(
      "https://ciisa.coningenio.cl/v1/services/",
      "services",
      servicesContainer,
      "loadingError"
    );

    if (data) {
      services = data
        .filter((service) => service.activo)
        .map((service) => ({
          id: service.id,
          name: service.titulo.esp,
          nameEng: service.titulo.eng,
          description: service.descripcion.esp,
          descriptionEng: service.descripcion.eng
        }));
      servicesContainer.className = "services-grid";
      renderServices(services);
      populateServiceSelect(services);
    }
  }

  /**
   * Loads about us data from API
   */
  async function loadAboutUs() {
    const data = await fetchData(
      "https://ciisa.coningenio.cl/v1/about-us/",
      "about",
      aboutTextContainer,
      "aboutError"
    );

    if (data && data.length >= 3) {
      aboutData = {
        description: data[0].descripcion.esp,
        descriptionEng: data[0].descripcion.eng,
        title: data[0].titulo.esp,
        titleEng: data[0].titulo.eng,
        mission: data[1].descripcion.esp,
        missionEng: data[1].descripcion.eng,
        vision: data[2].descripcion.esp,
        visionEng: data[2].descripcion.eng,
        values: []
      };
      aboutContainer?.classList.remove("loading", "error-state");
      renderAboutUs(aboutData);
    } else if (data) {
      console.error("About Us data structure incorrect, expected at least 3 items.");
    }
  }

  // --- UI Rendering Functions ---

  /**
   * Renders about section content
   * @param {Object} data - About us data
   */
  function renderAboutUs(data) {
    if (!data || !aboutTextContainer) return;
    const texts = staticTexts[currentLanguage];
    const isSpanish = currentLanguage === "es";

    aboutTextContainer.innerHTML = `
          <h3>${isSpanish ? data.title : data.titleEng}</h3>
          <p>${isSpanish ? data.description : data.descriptionEng}</p>
          <h3>${texts.mission}</h3>
          <p>${isSpanish ? data.mission : data.missionEng}</p>
          <h3>${texts.vision}</h3>
          <p>${isSpanish ? data.vision : data.visionEng}</p>
          ${
            data.values && data.values.length > 0
              ? `
            <div class="about-values">
                <h3>${texts.values}</h3>
                <div class="values-container">
                    ${data.values
                      .map(
                        (value) => `
                        <div class="value-item">
                            <div class="value-icon"><i class="fas fa-check"></i></div>
                            <div>
                                <h4>${value.name}</h4>
                                <p>${value.description}</p>
                            </div>
                        </div>`
                      )
                      .join("")}
                </div>
            </div>`
              : ""
          }
      `;
  }

  /**
   * Renders service cards
   * @param {Array} serviceData - Services data
   */
  function renderServices(serviceData) {
    if (!serviceData || serviceData.length === 0 || !servicesContainer) return;
    servicesContainer.innerHTML = "";
    const isSpanish = currentLanguage === "es";

    serviceData.forEach((service) => {
      let iconClass = "fas fa-cogs";
      const serviceName = (isSpanish ? service.name : service.nameEng).toLowerCase();
      if (serviceName.includes("consult")) iconClass = "fas fa-laptop-code";
      else if (serviceName.includes("multi")) iconClass = "fas fa-mobile-alt";
      else if (serviceName.includes("eco")) iconClass = "fas fa-project-diagram";
      else if (serviceName.includes("low-code")) iconClass = "fas fa-code";

      const serviceCard = document.createElement("div");
      serviceCard.className = "service-card";
      serviceCard.innerHTML = `
              <div class="service-card-inner">
                  <div class="service-header">
                      <div class="service-icon"><i class="${iconClass}"></i></div>
                      <h3 class="service-title">${isSpanish ? service.name : service.nameEng}</h3>
                  </div>
                  <div class="service-content">
                      <p class="service-description">${isSpanish ? service.description : service.descriptionEng}</p>
                      <div class="service-footer">
                          <a href="#contact" class="service-link">
                              ${
                                isSpanish ? "Solicitar información" : "Request information"
                              }
                              <i class="fas fa-arrow-right"></i>
                          </a>
                      </div>
                  </div>
              </div>`;
      servicesContainer.appendChild(serviceCard);
    });

    const cards = servicesContainer.querySelectorAll(".service-card");
    cards.forEach((card, index) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      setTimeout(() => {
        card.style.transition = "opacity 0.4s ease-out, transform 0.4s ease-out";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, 100 * index);
    });
  }

  /**
   * Populates service selection dropdown
   * @param {Array} serviceData - Services data
   */
  function populateServiceSelect(serviceData) {
    if (!serviceSelect || !serviceData) return;
    const isSpanish = currentLanguage === "es";
    const currentSelection = serviceSelect.value;

    while (serviceSelect.options.length > 1) {
      serviceSelect.remove(1);
    }

    serviceSelect.options[0].textContent = staticTexts[currentLanguage].selectService;

    serviceData.forEach((service) => {
      const option = document.createElement("option");
      const value = isSpanish ? service.name : service.nameEng;
      option.value = value;
      option.textContent = value;
      serviceSelect.appendChild(option);
    });

    if (currentSelection) {
      serviceSelect.value = currentSelection;
    }
  }

  // --- Form Validation ---

  /**
   * Sets up form validation
   */
  function initFormValidation() {
    if (!contactForm) return;

    const fields = {
      name: {
        element: document.getElementById("name"),
        errorEl: document.getElementById("name-error"),
        validate: (value) =>
          !value.trim()
            ? currentLanguage === "es"
              ? "Ingrese nombre"
              : "Enter name"
            : value.trim().length < 3
            ? currentLanguage === "es"
              ? "Mínimo 3 caracteres"
              : "Min 3 characters"
            : ""
      },
      email: {
        element: document.getElementById("email"),
        errorEl: document.getElementById("email-error"),
        validate: (value) => {
          if (!value.trim()) return currentLanguage === "es" ? "Ingrese correo" : "Enter email";
          const emailRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
          if (
            !emailRegex.test(value) ||
            !value.includes("@") ||
            value.split("@")[1].indexOf(".") === -1
          ) {
            return staticTexts[currentLanguage].emailError;
          }
          return "";
        }
      },
      service: {
        element: document.getElementById("service"),
        errorEl: document.getElementById("service-error"),
        validate: (value) =>
          !value ? (currentLanguage === "es" ? "Seleccione servicio" : "Select service") : ""
      },
      message: {
        element: document.getElementById("message"),
        errorEl: document.getElementById("message-error"),
        validate: (value) =>
          !value.trim()
            ? currentLanguage === "es"
              ? "Ingrese mensaje"
              : "Enter message"
            : value.trim().length < 10
            ? currentLanguage === "es"
              ? "Mínimo 10 caracteres"
              : "Min 10 characters"
            : ""
      }
    };

    for (const key in fields) {
      fields[key].group = fields[key].element?.closest(".form-group");
    }

    function validateField(field) {
      if (!field || !field.element || !field.group || !field.errorEl) return true;
      const error = field.validate(field.element.value);
      const hasError = !!error;
      field.group.classList.toggle("has-error", hasError);
      field.group.classList.toggle("is-valid", !hasError && field.element.value.trim() !== "");
      field.errorEl.textContent = error;
      return !hasError;
    }

    function validateAllFields() {
      let isFormValid = true;
      for (const key in fields) {
        if (fields[key].element) fields[key].element.dataset.touched = "true";
        if (!validateField(fields[key])) {
          isFormValid = false;
        }
      }
      return isFormValid;
    }

    for (const key in fields) {
      const field = fields[key];
      if (field.element) {
        field.element.addEventListener("blur", () => {
          field.element.dataset.touched = "true";
          validateField(field);
        });
        field.element.addEventListener("input", () => {
          if (field.element.dataset.touched === "true") {
            validateField(field);
          }
        });
      }
    }

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (validateAllFields()) {
        const formData = {
          name: fields.name.element.value,
          email: fields.email.element.value,
          service: fields.service.element.value,
          message: fields.message.element.value
        };
        console.log("Form Data:", formData);

        showToast(
          staticTexts[currentLanguage].successMessage,
          `${
            currentLanguage === "es" ? "Responderemos a" : "We'll reply to"
          } ${formData.email}`
        );

        contactForm.reset();
        for (const key in fields) {
          if (fields[key].group) {
            fields[key].group.classList.remove("has-error", "is-valid");
          }
          if (fields[key].element) {
            fields[key].element.dataset.touched = "";
          }
        }
      } else {
        const firstErrorField = Object.values(fields).find((f) =>
          f.group?.classList.contains("has-error")
        );
        firstErrorField?.element?.focus();
      }
    });
  }

  // --- Notifications ---
  
  /**
   * Displays a toast notification
   * @param {string} message - Main notification message
   * @param {string} details - Optional details text
   */
  function showToast(message, details = "") {
    const existingToast = document.querySelector(".toast-notification");
    if (existingToast) existingToast.remove();

    const toast = document.createElement("div");
    toast.className = "toast-notification";
    toast.innerHTML = `
          <i class="fas fa-check-circle"></i>
          <div>
              <span>${message}</span>
              ${details ? `<small>${details}</small>` : ""}
          </div>`;
    document.body.appendChild(toast);

    toast.addEventListener("animationend", (e) => {
      if (e.animationName === "fadeOutToast") {
        toast.remove();
      }
    });
  }

  // --- Initialization ---
  setTheme(localStorage.getItem("theme") || "light");
  setLanguage(currentLanguage);
  setupSmoothNavigation();
  initFormValidation();
  loadServices();
  loadAboutUs();

  // --- Event Listeners ---
  if (menuToggle) {
    menuToggle.addEventListener("click", () => mainMenu?.classList.toggle("active"));
  }
  
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const newTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      setTheme(newTheme);
    });
  }
  
  if (languageToggle) {
    languageToggle.addEventListener("click", () => {
      const newLanguage = currentLanguage === "en" ? "es" : "en";
      setLanguage(newLanguage);
    });
  }
});
