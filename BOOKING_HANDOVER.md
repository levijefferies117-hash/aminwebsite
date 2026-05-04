# AMIN Booking Handover

The site is currently set to use the custom booking flow at `booking.html`.

To switch every booking button back to AMIN's current Square booking link:

1. Open `script.js`.
2. Find `BOOKING_CONFIG` near the top of the file.
3. Change:

```js
mode: "custom",
```

to:

```js
mode: "square",
```

The current custom flow is a front-end booking request system. For live bookings, the next production step is a secure backend that checks barber availability and creates events in Google Calendar.

Recommended live setup:

- One Google Calendar per barber.
- Website sends booking requests to a secure backend.
- Backend checks the chosen barber's calendar before confirming.
- Backend creates the calendar event.
- AMIN receives an email/calendar notification.
- Customer receives a confirmation email.
- SMS reminders can be added later.
