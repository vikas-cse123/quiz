import nodemailer from "nodemailer";

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

// Wrap in an async IIFE so we can use await.

export const sendEmail = async (email, subject, html) => {
  const info = await transporter.sendMail({
    from: `"${process.env.APP_NAME}" ${process.env.USER}`,
    to: email,
    subject,
    html,
  });
  return info.messageId;

  //   console.log("Message sent:", info.messageId);
};
