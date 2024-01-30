import nodemailer from "nodemailer";
const createEmail = async (from, to, subject, message) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    return await transporter.sendMail({
      from,
      to,
      subject,
      html: message,
    });
  } catch (error) {
    console.log("Nodemailer Error:", error);
  }
};

export { createEmail };
