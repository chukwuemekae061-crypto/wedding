// Wedding date: 27 December 2026. Countdown uses the visitor's local time.
const weddingDate = new Date("2026-12-27T10:00:00");

function updateCountdown() {
  const now = new Date();
  const difference = weddingDate.getTime() - now.getTime();
  const safeDifference = Math.max(0, difference);
  const days = Math.floor(safeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((safeDifference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((safeDifference / (1000 * 60)) % 60);
  const seconds = Math.floor((safeDifference / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");

  if (difference <= 0) {
    document.querySelector(".countdown-section h2").textContent = "Today, we celebrate forever!";
  }
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Mobile navigation
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "✕" : "☰";
});
nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// RSVP is prepared as a WhatsApp message. Replace the placeholder number below
// with the couple's preferred RSVP phone number, including country code, digits only.
const RSVP_WHATSAPP_NUMBER = "2340000000000";

document.getElementById("rsvp-form").addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("guest-name").value.trim();
  const guests = document.getElementById("guest-count").value;
  const attendance = document.getElementById("attendance").value;
  const message = `Hello! My name is ${name}. RSVP for Nneoma Prisca and Chinonso Joshua's traditional wedding on 27 December 2026: ${attendance}. Number attending: ${guests}.`;
  const status = document.getElementById("form-status");

  if (RSVP_WHATSAPP_NUMBER === "2340000000000") {
    status.textContent = "Before publishing, add the couple's WhatsApp number in script.js (RSVP_WHATSAPP_NUMBER). Your RSVP message is: " + message;
    return;
  }

  const whatsappUrl = `https://wa.me/${RSVP_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  status.textContent = "Your RSVP message is ready in WhatsApp.";
});
