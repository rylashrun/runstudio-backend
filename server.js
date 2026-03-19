const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const WEBHOOK = process.env.WEBHOOK;

app.post("/send", async (req, res) => {

const { name, contactType, contactValue, project } = req.body;

if(!WEBHOOK){
  return res.status(500).send("Brak webhooka");
}

await fetch(WEBHOOK, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
embeds: [{
title: "Nowe zgłoszenie — Run Studio",
color: 3447003,
fields: [
{ name: "Imię", value: name || "Brak" },
{ name: "Typ kontaktu", value: contactType || "Brak" },
{ name: "Kontakt", value: contactValue || "Brak" },
{ name: "Projekt", value: project || "Brak" }
],
timestamp: new Date()
}]
})
});

res.json({ success: true });

});

app.listen(3000, () => {
console.log("Server działa");
});