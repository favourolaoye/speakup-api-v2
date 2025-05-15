import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (req, res) => {
  const { student, subject, html, text } = req.body;

  if (!student || !subject || (!text && !html)) {
    return res.status(400).json({ error: "Missing required fields: student, subject, and text or html" });
  }

  try {
    const response = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: student,
      subject,
      html,
      text
    });

    res.status(200).json({ msg: "Email sent successfully", data: response });
  } catch (error) {
    console.error("Resend error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};
