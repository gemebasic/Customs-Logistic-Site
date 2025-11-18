document.addEventListener("DOMContentLoaded", () => {
  /* ====================
     Mobile nav toggle
     ==================== */
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector("nav");
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () =>
      navMenu.classList.toggle("active")
    );
    // close on link click (mobile)
    navMenu
      .querySelectorAll("a")
      .forEach((a) =>
        a.addEventListener("click", () => navMenu.classList.remove("active"))
      );
  }

  /* ====================
     Lazy apply slide backgrounds (avoid CLS)
     ==================== */
  const slides = document.querySelectorAll(".slide");
  slides.forEach((s) => {
    const bg = s.getAttribute("data-bg");
    if (bg) {
      // set background image on pseudo-element by writing inline style to a custom property
      // We'll create an inline style on the slide for ::before to read via CSS (not directly readable),
      // so we'll set style.backgroundImage on the element (the ::before uses the same URL via JS)
      s.style.setProperty("--bg-url", `url("${bg}")`);
      // Also set the pseudo-element directly:
      s.style.backgroundImage = `url("${bg}")`; // for browsers that might show element background
      // finally set the ::before by adding a style element (safe approach)
      const beforeStyle = document.createElement("style");
      beforeStyle.innerHTML = `.slide[data-bg="${bg}"]::before{background-image:url("${bg}")}`;
      document.head.appendChild(beforeStyle);
    }
  });

  /* ====================
     HERO SLIDER - optimized
     ==================== */
  const slider = document.querySelector(".hero-slider");
  const slideNodes = document.querySelectorAll(".slide");
  if (slider && slideNodes.length) {
    let current = 0;
    const total = slideNodes.length;
    const intervalMs = 3500;

    // ensure transition exists (in case CSS loaded later)
    slider.style.transition =
      slider.style.transition || "transform 1s ease-in-out";
    slider.style.willChange = "transform";

    let timer = null;

    const moveTo = (index) => {
      current = (index + total) % total;
      slider.style.transform = `translateX(-${current * 100}vw)`;
      // accessibility: update aria-hidden attributes
      slideNodes.forEach((s, i) =>
        s.setAttribute("aria-hidden", i !== current)
      );
    };

    const start = () => {
      if (timer) return;
      timer = setInterval(() => moveTo(current + 1), intervalMs);
    };
    const stop = () => {
      if (!timer) return;
      clearInterval(timer);
      timer = null;
    };

    // pause when not visible
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stop();
      else start();
    });

    // wait until fonts/images ready for a stable start
    Promise.all([
      document.fonts ? document.fonts.ready : Promise.resolve(),
    ]).then(() => {
      // small delay to let layout settle
      setTimeout(() => {
        moveTo(0);
        start();
      }, 150);
    });
  }

  /* ====================
     Contact form handling
     ==================== */
  const contactForm = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");
  if (contactForm && formMessage) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      formMessage.textContent =
        "Thank you for your message! We will be in touch soon.";
      formMessage.style.display = "block";
      contactForm.reset();
      setTimeout(() => (formMessage.style.display = "none"), 5000);
    });
  }
});
