import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const ACCOUNT_SID = process.env.ACCOUNT_SID;
const AUTH_TOKEN = process.env.AUTH_TOKEN;
const FROM_NUMBER = process.env.FROM_NUMBER;


app.post("/send", async (req, res) => {
  try {
    const { to, message } = req.body;
    const response = await axios.post(
      `https://api.twilio.com/2010-04-01/Accounts/${ACCOUNT_SID}/Messages.json`,
      new URLSearchParams({
        From: FROM_NUMBER,
        To: "whatsapp:" + to,
        Body: message,
      }),
      { auth: { username: ACCOUNT_SID, password: AUTH_TOKEN } }
    );
    res.json({ success: true, sid: response.data.sid });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post("/webhook", (req, res) => {
  const from = req.body.From;
  const body = req.body.Body;
  console.log(`📩 massage from  ${from}: ${body}`);

  
  res.send("OK");
});

app.listen(10000, () => console.log("✅ Server is running on port 10000"));