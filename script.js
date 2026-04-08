const STORAGE_KEY = "krishna_tailors_bookings";

const form = document.getElementById("bookingForm");
const bookingList = document.getElementById("bookingList");
const clearBtn = document.getElementById("clearBookings");
const formMessage = document.getElementById("formMessage");
const yearNode = document.getElementById("year");
const dateInput = document.getElementById("date");

yearNode.textContent = new Date().getFullYear();
dateInput.min = new Date().toISOString().split("T")[0];

function getBookings() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveBookings(bookings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

function renderBookings() {
  const bookings = getBookings();
  bookingList.innerHTML = "";

  if (!bookings.length) {
    const item = document.createElement("li");
    item.textContent = "No booking requests yet.";
    bookingList.appendChild(item);
    return;
  }

  bookings.slice().reverse().forEach((entry) => {
    const item = document.createElement("li");
    item.innerHTML = `
      <strong>${entry.name}</strong> • ${entry.service}
      <small>Phone: ${entry.phone}</small>
      <small>Date: ${entry.date}</small>
      <small>Notes: ${entry.notes || "N/A"}</small>
      <small>Requested at: ${entry.createdAt}</small>
    `;
    bookingList.appendChild(item);
  });
}

function setMessage(text, type) {
  formMessage.textContent = text;
  formMessage.className = "form-message";
  if (type) formMessage.classList.add(type);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);

  const data = {
    name: String(formData.get("name") || "").trim(),
    phone: String(formData.get("phone") || "").trim(),
    service: String(formData.get("service") || "").trim(),
    date: String(formData.get("date") || "").trim(),
    notes: String(formData.get("notes") || "").trim(),
    createdAt: new Date().toLocaleString(),
  };

  if (!data.name || !data.service || !data.date || !/^\d{10}$/.test(data.phone)) {
    setMessage("Please enter valid details. Mobile number must be 10 digits.", "error");
    return;
  }

  const selectedDate = new Date(`${data.date}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (selectedDate < today) {
    setMessage("Please choose today or a future date.", "error");
    return;
  }

  const bookings = getBookings();
  bookings.push(data);
  saveBookings(bookings);
  form.reset();
  setMessage("Booking submitted successfully. We will contact you soon.", "ok");
  renderBookings();
});

clearBtn.addEventListener("click", () => {
  const shouldClear = window.confirm("Clear all saved booking requests?");
  if (!shouldClear) return;
  localStorage.removeItem(STORAGE_KEY);
  renderBookings();
  setMessage("All saved requests have been cleared.", "ok");
});

renderBookings();
