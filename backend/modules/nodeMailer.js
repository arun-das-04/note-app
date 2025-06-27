import nodemailer from "nodemailer";



const sendOTP = async (email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.nodeMailerUser,
      pass: process.env.nodeMailerPass,
    },
  });

  const OTP = Math.floor(100000 + Math.random() * 900000);

  const info = await transporter.sendMail({
    from: '"Note-app" <arundas.bca@gmail.com>',
    to: email,
    subject: "OTP for Note App",
    text: `Your One Time Password for email varification is: ${OTP}`, // plain‑text body
    // html: "<b>Hello world?</b>", // HTML body
  });

  return {OTP, info}

 
}

export default sendOTP;