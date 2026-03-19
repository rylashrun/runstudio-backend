const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const WEBHOOK = process.env.WEBHOOK;

app.get("/", (req, res) => {
  res.send("Backend działa ✅");
});

app.post("/send", async (req, res) => {
  try {

    const { name, contactType, contactValue, project } = req.body;

    if (!WEBHOOK) {
      return res.status(500).json({ error: "Brak webhooka" });
    }

    await fetch(WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [{
          title: "📩 Nowe zgłoszenie — Run Studio",
          color: 3447003,
          fields: [
            { name: "👤 Imię", value: name || "Brak" },
            { name: "📞 Typ kontaktu", value: contactType || "Brak" },
            { name: "🔗 Kontakt", value: contactValue || "Brak" },
            { name: "📄 Projekt", value: project || "Brak" }
          ],
          timestamp: new Date()
        }]
      })
    });

    res.json({ success: true });

  } catch (err) {
    console.error("Błąd:", err);
    res.status(500).json({ error: "Błąd serwera" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server działa na porcie " + PORT);
});
