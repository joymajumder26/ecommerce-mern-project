const nodemailer = require("nodemailer");
const { smtpUsername, smtpPassword } = require("../secret");

// console.log(smtpUsername,smtpPassword);

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: smtpUsername, // generated ethereal user
      pass: smtpPassword, // generated ethereal password
    },
  });

const EmailWithNodeMail = async (emailData) => {
  try {
    const mailOptions = {
      from: smtpUsername, // sender address
      to: emailData.email, // list of receivers
      subject: emailData.subject, // Subject line
      html: emailData.html, // html body
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Message Sent:%s", info.response);
  } catch (error) {
    console.error("Error occured while sending email");
    throw error;
  }
};
module.exports = EmailWithNodeMail;
