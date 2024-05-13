import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config()

const transporter = nodemailer.createTransport({
  host: "localhost",
  port: 465,
  secure: true,
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASS,
    // type: "PLAIN"
  },
});

export const sendEmail = async ({ to, subject, temp, attachments }) => {
  const info = await transporter
    .sendMail({
      from: `'"ChatBook Application 📖 " <${process.env.EMAIL}>'`, // sender address
      to, 
      subject, 
      html: temp,
      attachments
    })
    if(info.accepted.length > 0) return true
    return false
  }
  // await sendEmail().catch((err) =>console.log(err))
  // if (info.accepted.length >= 0) return true;



