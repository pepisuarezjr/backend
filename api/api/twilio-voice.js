export default function handler(req, res) {
  const twiml = `
    <Response>
      <Connect>
        <Stream url="${process.env.NEXT_PUBLIC_BASE_URL}/api/eleven-stream" />
      </Connect>
    </Response>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.status(200).send(twiml);
}
