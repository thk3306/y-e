const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw92uXObud6Fo8rLqMPpl9txJLHLbh-dfJVcb_DRdjxP8XCzs4MB9ICQdnmV5AlLOpq7Q/exec";
const form = document.getElementById("rsvp-form");
const statusMessage = document.getElementById("form-status");
const submitButton = document.getElementById("submit-btn");

function setStatus(message, state) {
  statusMessage.textContent = message;
  statusMessage.dataset.state = state;
}

function setSubmitLoading(isLoading) {
  if (!submitButton) {
    return;
  }

  submitButton.disabled = isLoading;
  submitButton.classList.toggle("is-loading", isLoading);
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (GOOGLE_APPS_SCRIPT_URL.includes("PASTE_YOUR")) {
    setStatus("Add your Google Apps Script web app URL in the code to enable submissions.", "error");
    return;
  }

  const formData = new FormData(form);
  const payload = new URLSearchParams(formData);

  try {
    setSubmitLoading(true);
    setStatus("Sending your RSVP...", "pending");

    await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      body: payload,
    });

    form.reset();
    setStatus("Thanks. Your RSVP has been sent.", "success");
  } catch (error) {
    setStatus("Something went wrong while sending your RSVP. Please try again.", "error");
  } finally {
    setSubmitLoading(false);
  }
});

function initMobileScrollAnimations() {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!isMobile || reduceMotion) {
    return;
  }

  const revealTargets = document.querySelectorAll(".event-card, .panel, details, .gift-note, footer");

  if (!revealTargets.length) {
    return;
  }

  revealTargets.forEach((element, index) => {
    element.classList.add("mobile-reveal");
    element.style.setProperty("--reveal-delay", `${Math.min(index * 55, 320)}ms`);
  });

  if (!("IntersectionObserver" in window)) {
    revealTargets.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealTargets.forEach((element) => revealObserver.observe(element));
}

function initMobileBackgroundMotion() {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!isMobile || reduceMotion) {
    return;
  }

  document.body.classList.add("mobile-bg-motion");

  let ticking = false;

  const updateBackgroundMotion = () => {
    const scrollY = window.scrollY || 0;
    const shift = Math.min(scrollY * 0.08, 22);
    const scale = 1.02 + Math.min(scrollY * 0.00012, 0.035);

    document.documentElement.style.setProperty("--bg-shift", `${shift.toFixed(2)}px`);
    document.documentElement.style.setProperty("--bg-scale", scale.toFixed(3));
    ticking = false;
  };

  const onScroll = () => {
    if (ticking) {
      return;
    }

    ticking = true;
    window.requestAnimationFrame(updateBackgroundMotion);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  updateBackgroundMotion();
}

initMobileScrollAnimations();
initMobileBackgroundMotion();
