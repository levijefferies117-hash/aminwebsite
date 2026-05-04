const json = (response, status, payload) => {
  response.status(status).setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(payload));
};

const requiredFields = ["service", "barber", "date", "time", "clientName", "phone"];

const hasMissingFields = (body) => requiredFields.filter((field) => !String(body[field] || "").trim());

const buildEmailHtml = (body) => `
  <h1>New AMIN booking request</h1>
  <p><strong>Service:</strong> ${body.service}</p>
  <p><strong>Barber:</strong> ${body.barber}</p>
  <p><strong>Date:</strong> ${body.date}</p>
  <p><strong>Time:</strong> ${body.time}</p>
  <p><strong>Duration:</strong> ${body.duration || "Not supplied"}</p>
  <p><strong>Total:</strong> ${body.total || "Not supplied"}</p>
  <hr />
  <p><strong>Client:</strong> ${body.clientName}</p>
  <p><strong>Phone:</strong> ${body.phone}</p>
  <p><strong>Email:</strong> ${body.email || "Not supplied"}</p>
  <p><strong>Notes:</strong> ${body.notes || "None"}</p>
  <p>This is a booking request. Confirm the appointment with the customer before treating it as locked in.</p>
`;

export default async function handler(request, response) {
  response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (request.method === "OPTIONS") {
    return response.status(204).end();
  }

  if (request.method !== "POST") {
    return json(response, 405, { ok: false, error: "Method not allowed" });
  }

  const body = typeof request.body === "string" ? JSON.parse(request.body || "{}") : request.body || {};
  const missing = hasMissingFields(body);

  if (missing.length) {
    return json(response, 400, { ok: false, error: "Missing required fields", missing });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.BOOKING_TO_EMAIL || "sophiyasact@gmail.com";
  const fromEmail = process.env.BOOKING_FROM_EMAIL || "AMIN Booking <onboarding@resend.dev>";

  if (!resendKey) {
    return json(response, 503, {
      ok: false,
      error: "Booking email service is not configured. Set RESEND_API_KEY before enabling API mode."
    });
  }

  const emailResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: body.email || undefined,
      subject: `AMIN booking request: ${body.service}`,
      html: buildEmailHtml(body)
    })
  });

  if (!emailResponse.ok) {
    const detail = await emailResponse.text();
    return json(response, 502, { ok: false, error: "Booking email failed", detail });
  }

  return json(response, 200, {
    ok: true,
    message: "Booking request sent. AMIN will confirm the appointment."
  });
}
