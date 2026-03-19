const express = require("express");
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
    if (!WEBHOOK) {
      return res.status(500).json({ error: "Brak webhooka" });
    }

    const response = await fetch(WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: "🔥 TEST RUNSTUDIO DZIAŁA"
      })
    });

    const text = await response.text();
    console.log("DISCORD RESPONSE:", text);

    if (!response.ok) {
      return res.status(500).json({ error: text });
    }

    res.json({ success: true });

  } catch (err) {
    console.error("BŁĄD SERWERA:", err);
    res.status(500).json({ error: "Błąd serwera" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server działa na porcie " + PORT);
});
