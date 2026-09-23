/* =========================================================
   ELDERLY NUTRITION BAR — SCRIPT.JS
   Beginner-friendly, commented vanilla JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------------------------------------------------
     1. MOBILE HAMBURGER MENU
     Toggles the nav-links list open/closed on small screens.
  --------------------------------------------------- */
  var hamburger = document.getElementById("hamburger");
  var navLinks = document.getElementById("nav-links");

  hamburger.addEventListener("click", function () {
    var isOpen = navLinks.classList.toggle("open");
    hamburger.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Close the mobile menu after a link is clicked
  var allNavLinks = document.querySelectorAll(".nav-link");
  allNavLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");
      hamburger.classList.remove("open");
    });
  });

  /* ---------------------------------------------------
     2. SMOOTH SCROLL FOR NAV + BUTTONS
     The CSS already sets scroll-behavior: smooth, so we
     just make sure clicking any anchor link works normally.
     (Included here in case smooth-scroll needs a JS fallback.)
  --------------------------------------------------- */
  var anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      var targetId = this.getAttribute("href");
      var targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  /* ---------------------------------------------------
     3. VIDEO SOUND TOGGLE
     The hero video starts muted (required for autoplay).
     This button lets the visitor turn sound on/off.
  --------------------------------------------------- */
  var video = document.getElementById("hero-video");
  var soundToggle = document.getElementById("sound-toggle");
  var iconMuted = document.getElementById("icon-muted");
  var iconUnmuted = document.getElementById("icon-unmuted");

  if (video && soundToggle) {
    soundToggle.addEventListener("click", function () {
      video.muted = !video.muted;
      var isMuted = video.muted;
      iconMuted.style.display = isMuted ? "block" : "none";
      iconUnmuted.style.display = isMuted ? "none" : "block";
      soundToggle.setAttribute("aria-label", isMuted ? "Turn sound on" : "Turn sound off");
    });
  }

  /* ---------------------------------------------------
     4. SCROLL REVEAL ANIMATIONS
     Any element with the "reveal" class fades/slides in
     once it enters the viewport.
  --------------------------------------------------- */
  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: if IntersectionObserver isn't supported, just show everything
    revealEls.forEach(function (el) {
      el.classList.add("in-view");
    });
  }

  /* ---------------------------------------------------
     5. BACK TO TOP BUTTONS
     Both the floating button and the final-section button
     scroll the page back to the hero.
  --------------------------------------------------- */
  var backToTopBtn = document.getElementById("back-to-top");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Create a small floating "back to top" button that appears after scrolling
  var floatingTop = document.createElement("button");
  floatingTop.id = "floating-top";
  floatingTop.setAttribute("aria-label", "Back to top");
  floatingTop.innerHTML = "↑";
  document.body.appendChild(floatingTop);

  floatingTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", function () {
    if (window.scrollY > 600) {
      floatingTop.classList.add("show");
    } else {
      floatingTop.classList.remove("show");
    }
  });

  /* ---------------------------------------------------
     6. ACTIVE NAVIGATION LINK WHILE SCROLLING
     Highlights the nav link for the section currently in view.
  --------------------------------------------------- */
  var sections = document.querySelectorAll("section[id]");

  function updateActiveLink() {
    var currentId = "";
    var scrollPos = window.scrollY + 120; // offset for fixed nav height

    sections.forEach(function (section) {
      if (scrollPos >= section.offsetTop) {
        currentId = section.id;
      }
    });

    allNavLinks.forEach(function (link) {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + currentId) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink);
  updateActiveLink();

  /* ---------------------------------------------------
     7. SENSORY EVALUATION DEMO
     Lets the visitor pick a parameter (Colour, Aroma, etc.)
     and give it a 1-5 star "demo" rating. Nothing here is
     real data — it's purely an interactive illustration of
     an evaluation framework.
  --------------------------------------------------- */
  var evalParams = document.querySelectorAll(".eval-param");
  var currentParamLabel = document.getElementById("eval-current-param");
  var stars = document.querySelectorAll(".star");

  // Store demo ratings per parameter in memory (resets on page reload)
  var demoRatings = {};

  function renderStars(paramName) {
    var rating = demoRatings[paramName] || 0;
    stars.forEach(function (star) {
      var starValue = parseInt(star.getAttribute("data-value"), 10);
      star.classList.toggle("selected", starValue <= rating);
    });
  }

  evalParams.forEach(function (btn) {
    btn.addEventListener("click", function () {
      evalParams.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var paramName = btn.getAttribute("data-param");
      currentParamLabel.textContent = paramName;
      renderStars(paramName);
    });
  });

  stars.forEach(function (star) {
    star.addEventListener("click", function () {
      var activeParam = document.querySelector(".eval-param.active").getAttribute("data-param");
      var value = parseInt(star.getAttribute("data-value"), 10);
      demoRatings[activeParam] = value;
      renderStars(activeParam);
    });
  });

  // Initialise stars for the default selected parameter (Colour)
  renderStars("Colour");

});
