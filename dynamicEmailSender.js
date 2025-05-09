//nodemailer
//-> technical details -> SMTP service
//-> msg object

const nodemailer= require("nodemailer");
const dotenv= require("dotenv");
dotenv.config();
const fs= require("fs");


async function updateTemplateHelper(templatePath, toReplaceObject) {
    let templateContent= await fs.promises.readFile(templatePath,"utf-8");
    const keyArr= Object.keys(toReplaceObject);
    keyArr.forEach((key) => {
    templateContent= templateContent.replace(`#{${key}}`,toReplaceObject[key])
    })
    return templateContent;
}

async function emailSender(templatePath, receiverEmail, toReplaceObject) {
    try {

        const content= await updateTemplateHelper(templatePath, toReplaceObject);

        const gmailDetails= {
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "farazyt12@gmail.com",      // "apikey" in case of sendgrid
                pass: process.env.GMAIL_PASS
            }
        }
        
        
        const msg= {
            from: "farazyt12@gmail.com",
            to: receiverEmail,
            subject: "Hello from Nodemailer",
            text: "Hii",
            html: content
        }
        
        const transporter= nodemailer.createTransport(gmailDetails);
        await transporter.sendMail(msg);
        console.log("Email sent");
    }
    catch(err) {
        console.log("Email not send bcz of :",err);
    }
}

// const toReplaceObject= {
//     name: "Sarfraz",
//     otp: 1234
// }

// emailSender("./templates/otp.html","romanpkk8@gmail.com",toReplaceObject).then(() => {
//     console.log("Email sent")
// })
    
module.exports= emailSender;