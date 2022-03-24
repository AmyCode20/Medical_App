const nodemailer = require("nodemailer");


const EmailNotification=async(email, message, subject)=> {
  let transporter = nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    service: "gmail.com",
    secure: true,
    auth: {
      user: "contact@proliveinvest.com",
      pass: "Pro##Live62"
    }
  });

  try {
    await transporter.sendMail({
        from: `"ProLive Invest" <contact@proliveinvest.com>`, 
        to:email,
        subject: subject,  
        html: message
      });
      console.log("message sent")
      
  } catch (error) {
      console.log(error+ " is the error")
  }
 
}

module.exports =EmailNotification