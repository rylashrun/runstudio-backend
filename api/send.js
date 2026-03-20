export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { name, contactType, contactValue, project } = req.body;

    const WEBHOOK = process.env.WEBHOOK;

    if (!WEBHOOK) {
      return res.status(500).json({ error: "Brak webhooka" });
    }

    const response = await fetch(WEBHOOK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content: "📩 NOWE ZGŁOSZENIE",
        embeds: [{
          title: "Run Studio",
          color: 3447003,
          fields: [
            { name: "👤 Imię", value: name || "Brak" },
            { name: "📞 Typ kontaktu", value: contactType || "Brak" },
            { name: "🔗 Kontakt", value: contactValue || "Brak" },
            { name: "📄 Projekt", value: project || "Brak" }
          ]
        }]
      })
    });

    const text = await response.text();

    if (!response.ok) {
      return res.status(500).json({ error: text });
    }

    return res.status(200).json({ success: true });

  } catch (err) {
    return res.status(500).json({ error: "Błąd serwera" });
  }
}
