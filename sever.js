import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const ACCOUNT_SID = "YOUR_TWILIO_ACCOUNT_SID";
const AUTH_TOKEN = "YOUR_TWILIO_AUTH_TOKEN";
const FROM_NUMBER = "whatsapp:+14155238886"; // رقم Twilio الرسمي

// استقبال الرسائل من Twilio
app.post("/webhook", async (req, res) => {
  const from = req.body.From;
  const body = req.body.Body;
  console.log(`📩 Received from ${from}: ${body}`);

  // إرسال رد بسيط
  await axios.post(
    `https://api.twilio.com/2010-04-01/Accounts/${ACCOUNT_SID}/Messages.json`,
    new URLSearchParams({
      From: FROM_NUMBER,
      To: from,
      Body: "👋 أهلاً بك! لقد استقبلت رسالتك: " + body,
    }),
    {
      auth: { username: ACCOUNT_SID, password: AUTH_TOKEN },
    }
  );

  res.send("OK");
});

app.listen(3000, () => console.log("✅ Server running on port 3000"));
