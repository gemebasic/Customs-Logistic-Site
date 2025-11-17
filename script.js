document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Navigation Toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector("nav");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
    // 3. SLIDER CONTROL (NEW JAVASCRIPT LOGIC)
    const slider = document.querySelector(".hero-slider");
    const slides = document.querySelectorAll(".slide");

    if (slider && slides.length > 0) {
      let currentSlide = 0;
      const totalSlides = slides.length;
      const slideWidthPercentage = 100 / totalSlides; // 100 / 3 = 33.333...%
      const slideDuration = 3000; // 5 seconds per slide (includes hold and transition)

      // Function to move the slider
      const moveSlider = () => {
        // 1. Calculate the position for the next slide
        currentSlide = (currentSlide + 1) % totalSlides;

        // Calculate the total distance to shift the slider container (0%, -33.333%, -66.666%)
        const offset = currentSlide * slideWidthPercentage;

        // 2. Apply the calculated translation
        slider.style.transform = `translateX(-${offset}%)`;
      };

      // Set the initial position to Slide 1 (0%)
      slider.style.transform = "translateX(0%)";

      // Start the automatic sliding loop
      setInterval(moveSlider, slideDuration);

      // Optional: Add a smooth reset when transitioning from the last slide back to the first.
      slider.addEventListener("transitionend", () => {
        // Check if we are at the virtual end (index 0 after looping from last slide)
        if (currentSlide === 0) {
          // Temporarily remove transition for instant reset
          slider.style.transition = "none";
          slider.style.transform = "translateX(0%)";

          // Re-apply transition after a small delay (using setTimeout)
          setTimeout(() => {
            slider.style.transition = "transform 1s ease-in-out";
          }, 50);
        }
      });
    }
    // Close menu when a link is clicked (for better mobile experience)
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        // Check if the menu is open before trying to close it
        if (navMenu.classList.contains("active")) {
          navMenu.classList.remove("active");
        }
      });
    });
  }

  // NOTE: CSS handles smooth scrolling (scroll-behavior: smooth)
  // The JavaScript fallback for smooth scrolling is not strictly needed
  // unless you support very old browsers, but the CSS method is cleaner.

  // 2. Simple Contact Form Submission Handler
  const contactForm = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");

  if (contactForm && formMessage) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Stop the default jump

      // Simulate a successful submission
      formMessage.textContent =
        "Thank you for your message! We will be in touch soon.";
      formMessage.style.display = "block";
      contactForm.reset(); // Clear the form fields

      // Hide the message after 5 seconds
      setTimeout(() => {
        formMessage.style.display = "none";
      }, 5000);
    });
  }
});
