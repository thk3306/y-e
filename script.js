const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw92uXObud6Fo8rLqMPpl9txJLHLbh-dfJVcb_DRdjxP8XCzs4MB9ICQdnmV5AlLOpq7Q/exec";
const form = document.getElementById("rsvp-form");
const statusMessage = document.getElementById("form-status");

function setStatus(message, state) {
  statusMessage.textContent = message;
  statusMessage.dataset.state = state;
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
  }
});
