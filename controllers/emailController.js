import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (req, res) => {
  const { student, subject, html, text } = req.body;

  if (!student || !subject || (!text && !html)) {
    return res.status(400).json({ msg: "Missing required fields: student, subject, and text or html" });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: student,
    subject: subject,
    text: text,
    html: html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ msg: "Email sent successfully", data: info });
  } catch (error) {
    console.error("Nodemailer error:", error);
    res.status(500).json({ msg: "Failed to send email" });
  }
};
