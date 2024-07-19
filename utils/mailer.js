"use strict";

import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
export const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAILER_HOST,
      service: process.env.MAILER_SERVICE,
      port: process.env.MAILER_PORT,
      secure: true,
      auth: {
        user: process.env.MAILER_USERNAME,
        pass: process.env.MAILER_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.MAILER_USERNAME,
      to: email,
      subject: subject,
      text: text,
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};
