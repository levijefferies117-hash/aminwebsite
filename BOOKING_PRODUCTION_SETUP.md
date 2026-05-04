# Booking Production Setup

This AMIN site currently uses a branded booking request flow.

Default mode:

```js
requestMode: "mailto"
```

This prepares an email for the customer to send to AMIN. It works without backend credentials, but it does not automatically confirm bookings.

## Switch To Backend Email Mode

The site includes a Vercel-ready endpoint:

`api/booking-request.js`

To use it:

1. Deploy the site on Vercel or another host that supports serverless functions.
2. Create a Resend account.
3. Add these environment variables in Vercel:
   - `RESEND_API_KEY`
   - `BOOKING_TO_EMAIL`
   - `BOOKING_FROM_EMAIL`
4. In `script.js`, change:

```js
requestMode: "mailto"
```

to:

```js
requestMode: "api"
```

5. Submit a test booking.
6. Confirm AMIN receives the booking request email.

## Block Dates And Times

Use this in `script.js`:

```js
blockedDates: ["2026-05-01"],
blockedTimes: {
  "2026-05-08": ["11:00 AM", "2:00 PM"]
}
```

Use blocked dates for holidays, unavailable days, sick days, private events, or closed shop days.

Use blocked times for lunch breaks, booked-out periods, staff gaps, or manual calendar blocks.

## Before Replacing Square

Do not fully replace Square until the booking system has real calendar protection.

Required production features:

- real staff calendar source
- server-side availability checks
- double-booking protection
- customer confirmation email
- business notification
- admin way to block unavailable dates/times
- cancellation/reschedule handling
- privacy-approved customer data handling

## Safe Send-To-AMIN Wording

Use this wording when presenting the concept:

`This concept includes a branded booking request flow. It can keep linking to Square, send booking requests by email, or be upgraded into a calendar-backed booking system.`

Avoid saying:

- "This fully replaces Square now."
- "Bookings are guaranteed."
- "Availability is live."
- "Appointments are confirmed automatically."

Those claims are only true after the backend/calendar version is built and tested.
