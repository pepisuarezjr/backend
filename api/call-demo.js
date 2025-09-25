import twilio from "twilio";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ error: "Phone number required" });
  }

  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

  try {
    const call = await client.calls.create({
      to: phone,
      from: process.env.TWILIO_PHONE_NUMBER,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/twilio-voice`
    });

    return res.status(200).json({ success: true, callSid: call.sid });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
