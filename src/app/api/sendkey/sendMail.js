import nodemailer from "nodemailer";
import fs from "fs";

const sendMail = (name, email, key) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
      requireTLS: true,
      tls: {
        ciphers: "SSLv3",
      },
    });
    // Read the HTML template file
    const template = fs.readFileSync("./mail.html", "utf8");

    // Replace placeholders with dynamic data

    const renderedTemplate = template
      .replace("{{name}}", name)
      .replace("{{key}}", key);

    const options = {
      from: process.env.EMAIL,
      to: email,
      subject: "Verification email",
      html: renderedTemplate,
    };

    transporter.sendMail(options, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(info);
        return;
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export default sendMail;
