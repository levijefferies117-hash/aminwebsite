# AMIN QA Report

Date: 2026-04-29

Active folder:

`06 Business/Website Creation Business/AMIN-Website-Concept-wed apr29 2026`

## Summary

The AMIN concept is polished enough to send as a strong concept/demo.

The custom booking flow is working as a branded booking request system. It should not be described as a fully confirmed live booking engine until a backend/calendar system is added.

## Files Checked

- `index.html`
- `services.html`
- `about.html`
- `gallery.html`
- `contact.html`
- `booking.html`
- `booking-policy.html`
- `privacy.html`
- `styles.css`
- `script.js`
- `assets/`

## Fixes Made During QA

- Removed public-facing "before launch" style wording from gallery, booking policy and privacy pages.
- Added missing meta descriptions to `about.html`, `contact.html` and `gallery.html`.
- Corrected public opening hours on `contact.html` to match the booking config:
  - Monday-Thursday: 9:30am-5:30pm
  - Friday: 9:30am-7pm
  - Saturday: 9:30am-5pm
  - Sunday: closed
- Changed booking button wording from "Prepare Request" to "Send Booking Request".
- Changed booking status wording so customers understand requests are not confirmed until AMIN replies.
- Removed `localStorage` storage of booking request details from the booking flow.
- Changed disabled time wording from "Booked" to "Unavailable" so the prototype does not imply real confirmed calendar state.
- Reduced mobile heading size so narrow screens feel less cramped.
- Added backend-ready booking request endpoint at `api/booking-request.js`.
- Added `requestMode`, `requestEndpoint`, `blockedDates`, and `blockedTimes` to `BOOKING_CONFIG`.
- Kept default booking mode as `mailto` until email/API credentials are configured.
- Removed the Skin Fade highlighted/featured styling from homepage and services page so the service list feels neutral.
- Added production setup notes in `BOOKING_PRODUCTION_SETUP.md`.

## Checks Passed

- `script.js` passes `node --check`.
- `api/booking-request.js` passes `node --check`.
- All local `href` and `src` references resolve.
- All HTML pages have a `<title>`.
- All HTML pages have a meta description.
- No remaining matches for:
  - `TODO`
  - `FIXME`
  - `lorem`
  - `before launch`
  - `launch-ready draft`
  - `future payment`
  - `simulated`
  - `prototype`
  - `localStorage`
  - `Confirm Request`
  - `Bookings are sent`
  - `live-style`
  - `Booked`
- Browser pass opened every main page with expected content and no console errors:
  - Home
  - Services
  - About
  - Gallery
  - Contact
  - Booking Policy
  - Privacy
  - Booking
- Mobile navigation opened and navigated successfully to Services.
- Booking page rendered:
  - 14 service options
  - 7 staff options
  - 10 date options
  - 13 time options in the tested date/state after backend-ready additions
  - booking status area
- Positive booking request test passed:
  - selected service
  - selected staff/time path
  - filled customer details
  - checked policy agreement
- clicked Send Booking Request
- received status explaining the request is ready to send to AMIN and is not confirmed until AMIN replies.
  - no console errors

## Remaining Production Limitation

This is not yet a true live booking engine.

Before replacing Square or another real booking platform, add:

- real staff calendars
- server-side availability checks
- double-booking protection
- business notification
- customer confirmation email
- admin way to block unavailable dates/times
- cancellation/reschedule handling

Partially added:

- `api/booking-request.js` can send booking request emails through Resend once environment variables are configured.
- This is not enabled by default.
- Calendar-backed confirmation still needs AMIN-owned Google Calendar or another booking data source.

Until then, call it a booking request system.

## Send-Ready Position

Safe wording:

`This concept includes a custom branded booking request flow. A production version can start as a booking request system, then be upgraded with a calendar-backed booking backend when AMIN is ready for real slot locking and automatic confirmations.`
