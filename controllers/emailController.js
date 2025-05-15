import { Resend } from 'resend';
import dotenv from "dotenv";
dotenv.config();

sgMail.setApiKey(process.env.RESEND_API_KEY);

export const sendEmail = async (req, res) => {
  const { student, subject, html } = req.body;

  if (!student || !subject || (!text && !html)) {
    return res.status(400).json({ error: "Missing required fields: to, subject, text/html" });
  }


const resend = new Resend(process.env.RESEND_API_KEY);

resend.emails.send({
  from: 'onboarding@resend.dev',
  to: student,
  subject: subject,
  html: html
});
  try {
    await sgMail.send(msg);
    res.status(200).json({ msg: "Email sent successfully" });
  } catch (error) {
    console.error("SendGrid error:", error.response?.body || error.message);
    res.status(500).json({ error: "Failed to send email" });
  }
};
