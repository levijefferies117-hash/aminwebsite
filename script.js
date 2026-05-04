const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");

const BOOKING_CONFIG = {
  // Change mode to "square" if AMIN wants to keep their existing booking link.
  mode: "custom",
  squareUrl: "https://book.squareup.com/appointments/y3y4ob8pgi4tpg/location/LJV0Y0FHYQZ66/services?buttonTextColor=ffffff&color=9B804A&locale=en-AU&referrer=so",
  requestEmail: "sophiyasact@gmail.com",
  requestMode: "mailto",
  requestEndpoint: "/api/booking-request",
  blockedDates: [],
  blockedTimes: {
    // Example: "2026-05-08": ["11:00 AM", "2:00 PM"]
  },
  openDays: {
    1: { label: "9:30 AM - 5:30 PM", start: "9:30 AM", end: "5:30 PM" },
    2: { label: "9:30 AM - 5:30 PM", start: "9:30 AM", end: "5:30 PM" },
    3: { label: "9:30 AM - 5:30 PM", start: "9:30 AM", end: "5:30 PM" },
    4: { label: "9:30 AM - 5:30 PM", start: "9:30 AM", end: "5:30 PM" },
    5: { label: "9:30 AM - 7:00 PM", start: "9:30 AM", end: "7:00 PM" },
    6: { label: "9:30 AM - 5:00 PM", start: "9:30 AM", end: "5:00 PM" }
  }
};

const applyBookingMode = () => {
  const bookingLinks = document.querySelectorAll('a[href^="booking.html"]');

  if (BOOKING_CONFIG.mode !== "square") return;

  bookingLinks.forEach((link) => {
    link.href = BOOKING_CONFIG.squareUrl;
    link.target = "_blank";
    link.rel = "noreferrer";
  });
};

applyBookingMode();

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12 || Boolean(document.querySelector(".page-main")));
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    header.classList.toggle("nav-active", isOpen);
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  nav.addEventListener("click", (event) => {
    if (event.target.tagName !== "A") return;
    nav.classList.remove("is-open");
    header.classList.remove("nav-active");
    navToggle.setAttribute("aria-label", "Open navigation");
  });
}

const bookingApp = document.querySelector("[data-booking-app]");

if (bookingApp) {
  if (BOOKING_CONFIG.mode === "square") {
    bookingApp.querySelector(".booking-layout").innerHTML = `
      <section class="booking-step">
        <div class="booking-step-heading">
          <span>01</span>
          <div>
            <h2>Continue To AMIN's Current Booking Page</h2>
            <p>AMIN can keep using their existing Square appointment system. This page can switch back to the custom flow by changing one setting in the site script.</p>
          </div>
        </div>
        <a class="button primary" href="${BOOKING_CONFIG.squareUrl}" target="_blank" rel="noreferrer">Open Booking</a>
      </section>
    `;
  } else {
  const services = [
    { id: "zero-fade", name: "Zero Fade", price: 70, duration: 30, category: "Haircuts", staff: ["Amin", "Anthony", "Gusti", "Jordan", "K-Benji"] },
    { id: "skin-fade", name: "Skin Fade", price: 75, duration: 45, category: "Haircuts", staff: ["Amin", "Anthony", "Gusti", "Jordan", "K-Benji"] },
    { id: "classic-haircut", name: "Classic Haircut", price: 65, duration: 30, category: "Haircuts", staff: ["Amin", "Anthony", "Gusti", "Jordan", "K-Benji"] },
    { id: "long-hair-restyle", name: "Long Hair Restyle", price: 100, duration: 60, category: "Haircuts", staff: ["Amin", "Anthony", "Gusti", "Jordan"] },
    { id: "crew-cut", name: "Crew Cut", price: 45, duration: 20, category: "Haircuts", staff: ["Amin", "Anthony", "Gusti", "Jordan", "K-Benji"] },
    { id: "junior-cut", name: "Toddler to Junior", price: 50, duration: 30, category: "Haircuts", staff: ["Amin", "Gusti", "K-Benji"] },
    { id: "apprentice-haircut", name: "Apprentice Haircut", price: 35, duration: 60, category: "Haircuts", staff: ["Tom"] },
    { id: "beard-tidy", name: "Beard Tidy Up + Treatment", price: 35, duration: 25, category: "Beard & Shave", staff: ["Amin", "Anthony", "Gusti", "Jordan", "K-Benji"] },
    { id: "signature-beard", name: "Signature Beard Trim & Shave", price: 45, duration: 30, category: "Beard & Shave", staff: ["Amin", "Anthony", "Jordan", "K-Benji"] },
    { id: "luxury-shave", name: "Luxury Full Face Shave", price: 75, duration: 45, category: "Beard & Shave", staff: ["Amin", "Anthony", "Jordan"] },
    { id: "facial-treatment", name: "Facial Treatment", price: 40, duration: 15, category: "Treatments", staff: ["Amin", "Anthony", "Gusti", "Jordan"] },
    { id: "hair-wash", name: "Hair Wash Add-On", price: 10, duration: 5, category: "Treatments", staff: ["Amin", "Anthony", "Gusti", "Jordan", "K-Benji"] },
    { id: "color-camo", name: "Color Camo", price: 65, duration: 45, category: "Colour", staff: ["Amin", "Anthony", "Jordan"] },
    { id: "after-hours", name: "After Hours Appointment", price: 100, duration: 45, category: "Premium", staff: ["Amin", "Jordan", "K-Benji"] }
  ];

  const staff = [
    { id: "any", name: "Fastest available", title: "Best first open time", initial: "Any" },
    { id: "amin", name: "Amin", title: "Classic cuts, shaves, colour, facials", initial: "A" },
    { id: "anthony", name: "Anthony", title: "Fades, beard services, hot towel finishes", initial: "An" },
    { id: "gusti", name: "Gusti", title: "Haircuts, fades, juniors, facials", initial: "G" },
    { id: "jordan", name: "Jordan", title: "Haircuts, fades, shaves, after-hours", initial: "J" },
    { id: "k-benji", name: "K-Benji", title: "Haircuts, fades, head shaves, juniors", initial: "K" },
    { id: "tom", name: "Tom", title: "Supervised apprentice bookings", initial: "T" }
  ];

  const times = ["9:00 AM", "9:30 AM", "10:15 AM", "11:00 AM", "11:45 AM", "12:30 PM", "1:15 PM", "2:00 PM", "2:45 PM", "3:30 PM", "4:15 PM", "5:00 PM", "5:45 PM", "6:30 PM"];
  const state = {
    serviceIds: new Set(),
    staffId: "any",
    date: "",
    time: "",
    details: {}
  };

  const serviceGrid = bookingApp.querySelector("[data-service-grid]");
  const staffGrid = bookingApp.querySelector("[data-staff-grid]");
  const dateGrid = bookingApp.querySelector("[data-date-grid]");
  const timeGrid = bookingApp.querySelector("[data-time-grid]");
  const summary = bookingApp.querySelector("[data-booking-summary]");
  const form = bookingApp.querySelector("[data-booking-form]");
  const status = bookingApp.querySelector("[data-booking-status]");

  const money = (value) => `A$${value}`;
  const minutes = (value) => value >= 60 ? `${Math.floor(value / 60)} hr${value > 60 ? ` ${value % 60} mins` : ""}` : `${value} mins`;
  const selectedServices = () => services.filter((service) => state.serviceIds.has(service.id));
  const totalPrice = () => selectedServices().reduce((sum, service) => sum + service.price, 0);
  const totalDuration = () => selectedServices().reduce((sum, service) => sum + service.duration, 0);
  const selectedStaff = () => staff.find((member) => member.id === state.staffId) || staff[0];
  const timeToMinutes = (time) => {
    const [clock, period] = time.split(" ");
    const [rawHours, rawMinutes] = clock.split(":").map(Number);
    const hours = (rawHours % 12) + (period === "PM" ? 12 : 0);
    return hours * 60 + rawMinutes;
  };
  const dateValue = (date) => date.toISOString().slice(0, 10);
  const selectedDate = () => {
    const [year, month, day] = state.date.split("-").map(Number);
    return state.date ? new Date(year, month - 1, day) : new Date();
  };
  const hoursForDate = (date) => BOOKING_CONFIG.openDays[date.getDay()];
  const todayValue = () => dateValue(new Date());
  const availableTimesFor = (date) => {
    const dateKey = dateValue(date);
    if (BOOKING_CONFIG.blockedDates.includes(dateKey)) return [];

    const hours = hoursForDate(date);
    if (!hours) return [];

    const start = timeToMinutes(hours.start);
    const end = timeToMinutes(hours.end);
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    return times.filter((time) => {
      const value = timeToMinutes(time);
      const withinHours = value >= start && value < end;
      const notPastToday = dateValue(date) !== todayValue() || value > currentMinutes + 15;
      const notBlocked = !(BOOKING_CONFIG.blockedTimes[dateKey] || []).includes(time);
      return withinHours && notPastToday && notBlocked;
    });
  };
  const availableTimesForDate = () => availableTimesFor(selectedDate());

  const canBookServiceWithStaff = (service, member) => member.id === "any" || service.staff.includes(member.name);

  const renderServices = () => {
    serviceGrid.innerHTML = services.map((service) => {
      const isSelected = state.serviceIds.has(service.id);
      return `
        <button class="booking-option service-option ${isSelected ? "is-selected" : ""}" type="button" data-service-id="${service.id}" aria-pressed="${isSelected}">
          <span>${service.category}</span>
          <strong>${service.name}</strong>
          <small>${money(service.price)} / ${minutes(service.duration)}</small>
        </button>
      `;
    }).join("");
  };

  const renderStaff = () => {
    const currentServices = selectedServices();
    staffGrid.innerHTML = staff.map((member) => {
      const isAvailable = currentServices.length === 0 || currentServices.every((service) => canBookServiceWithStaff(service, member));
      const isSelected = state.staffId === member.id;
      return `
        <button class="booking-option staff-option ${isSelected ? "is-selected" : ""}" type="button" data-staff-id="${member.id}" ${isAvailable ? "" : "disabled"} aria-pressed="${isSelected}">
          <span>${member.initial}</span>
          <strong>${member.name}</strong>
          <small>${isAvailable ? member.title : "Not available for selected service"}</small>
        </button>
      `;
    }).join("");
  };

  const buildDates = () => {
    const dates = [];
    const cursor = new Date();
    while (dates.length < 10) {
      if (hoursForDate(cursor) && availableTimesFor(cursor).length) dates.push(new Date(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }
    return dates;
  };

  const renderDates = () => {
    const formatter = new Intl.DateTimeFormat("en-AU", { weekday: "short", month: "short", day: "numeric" });
    const dates = buildDates();
    if (!state.date) state.date = dates[0].toISOString().slice(0, 10);
    dateGrid.innerHTML = dates.map((date) => {
      const value = dateValue(date);
      const isSelected = state.date === value;
      const hours = hoursForDate(date);
      return `
        <button class="booking-option date-option ${isSelected ? "is-selected" : ""}" type="button" data-date="${value}" aria-pressed="${isSelected}">
          <strong>${formatter.format(date)}</strong>
          <small>${value === todayValue() ? "Today" : hours.label}</small>
        </button>
      `;
    }).join("");
  };

  const slotIsOpen = (time, index) => {
    const serviceLoad = Math.max(1, selectedServices().length);
    const staffLoad = state.staffId === "any" ? 1 : staff.findIndex((member) => member.id === state.staffId) + 2;
    const dateLoad = Number(state.date.slice(-2));
    return (index + serviceLoad + staffLoad + dateLoad) % 4 !== 0;
  };

  const renderTimes = () => {
    const availableTimes = availableTimesForDate();
    if (!availableTimes.includes(state.time)) state.time = "";

    timeGrid.innerHTML = availableTimes.map((time, index) => {
      const isOpen = slotIsOpen(time, index);
      const isSelected = state.time === time;
      return `
        <button class="booking-option time-option ${isSelected ? "is-selected" : ""}" type="button" data-time="${time}" ${isOpen ? "" : "disabled"} aria-pressed="${isSelected}">
          <strong>${time}</strong>
          <small>${isOpen ? "Available" : "Unavailable"}</small>
        </button>
      `;
    }).join("") || `<p class="booking-status">No request times are available for this day. Choose another open day.</p>`;
  };

  const renderSummary = () => {
    const serviceNames = selectedServices().map((service) => service.name).join(", ") || "Choose at least one service";
    const staffName = selectedStaff().name;
    summary.innerHTML = `
      <div><span>Service</span><strong>${serviceNames}</strong></div>
      <div><span>Barber</span><strong>${staffName}</strong></div>
      <div><span>Date & time</span><strong>${state.date || "Select date"}${state.time ? ` at ${state.time}` : ""}</strong></div>
      <div><span>Duration</span><strong>${selectedServices().length ? minutes(totalDuration()) : "Pending"}</strong></div>
      <div><span>Total</span><strong>${selectedServices().length ? money(totalPrice()) : "Pending"}</strong></div>
    `;
  };
  const buildBookingPayload = () => ({
    service: selectedServices().map((service) => service.name).join(", "),
    barber: selectedStaff().name,
    date: state.date,
    time: state.time,
    duration: selectedServices().length ? minutes(totalDuration()) : "",
    total: selectedServices().length ? money(totalPrice()) : "",
    clientName: state.details.name,
    phone: state.details.phone,
    email: state.details.email || "",
    notes: state.details.notes || ""
  });

  const buildBookingMessage = (payload) => [
    "New AMIN booking request",
    `Service: ${payload.service}`,
    `Barber: ${payload.barber}`,
    `When: ${payload.date} at ${payload.time}`,
    `Duration: ${payload.duration}`,
    `Total: ${payload.total}`,
    `Client: ${payload.clientName}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email || "Not supplied"}`,
    `Notes: ${payload.notes || "None"}`
  ].join("\n");

  const refresh = () => {
    if (selectedServices().length && !selectedServices().every((service) => canBookServiceWithStaff(service, selectedStaff()))) {
      state.staffId = "any";
    }
    renderServices();
    renderStaff();
    renderDates();
    renderTimes();
    renderSummary();
  };

  bookingApp.addEventListener("click", (event) => {
    const serviceButton = event.target.closest("[data-service-id]");
    const staffButton = event.target.closest("[data-staff-id]");
    const dateButton = event.target.closest("[data-date]");
    const timeButton = event.target.closest("[data-time]");

    if (serviceButton) {
      const id = serviceButton.dataset.serviceId;
      state.serviceIds.has(id) ? state.serviceIds.delete(id) : state.serviceIds.add(id);
      state.time = "";
      refresh();
    }

    if (staffButton && !staffButton.disabled) {
      state.staffId = staffButton.dataset.staffId;
      state.time = "";
      refresh();
    }

    if (dateButton) {
      state.date = dateButton.dataset.date;
      state.time = "";
      refresh();
    }

    if (timeButton && !timeButton.disabled) {
      state.time = timeButton.dataset.time;
      refresh();
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    state.details = Object.fromEntries(formData.entries());

    if (!selectedServices().length || !state.time) {
      status.textContent = "Choose at least one service and an available time before confirming.";
      status.classList.remove("is-success");
      return;
    }

    const payload = buildBookingPayload();

    if (BOOKING_CONFIG.requestMode === "api") {
      status.textContent = "Sending booking request to AMIN...";
      status.classList.remove("is-success");

      try {
        const response = await fetch(BOOKING_CONFIG.requestEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const result = await response.json();

        if (!response.ok || !result.ok) {
          throw new Error(result.error || "Booking request failed.");
        }

        status.textContent = "Request sent. This appointment is not confirmed until AMIN replies.";
        status.classList.add("is-success");
      } catch (error) {
        status.textContent = `${error.message} Use the email option or contact AMIN directly.`;
        status.classList.remove("is-success");
      }

      return;
    }

    const message = buildBookingMessage(payload);
    const emailLink = `mailto:${BOOKING_CONFIG.requestEmail}?subject=${encodeURIComponent("AMIN booking request")}&body=${encodeURIComponent(message)}`;
    status.innerHTML = `Booking request ready to send. <a href="${emailLink}">Send request to AMIN</a>. This appointment is not confirmed until AMIN replies.`;
    status.classList.add("is-success");
  });

  const params = new URLSearchParams(window.location.search);
  const requestedBarber = params.get("barber");
  if (requestedBarber) {
    const match = staff.find((member) => member.name.toLowerCase() === requestedBarber.toLowerCase());
    if (match) state.staffId = match.id;
  }

  refresh();
  }
}
