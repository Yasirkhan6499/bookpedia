import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import  bcryptjs  from 'bcryptjs';
import { verify } from 'jsonwebtoken';


export const sendEmail = async({email, emailType, userId})=>{
    try {
        // console.log("sendEmail 1");
        // create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        // console.log("sendEmail 2");
        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                })
                // console.log("sendEmail 3");

        } else if(emailType === "RESET"){
            await User.findOneAndUpdate(userId,{
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now()+3600000
            })
        }
        // console.log("sendEmail 4");
        // create a transporter  
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.NODEMAILER_ID,
              pass: process.env.NODEMAILER_PASS
            }
          });
        //   console.log("sendEmail 5",process.env.NODEMAILER_ID);
        //   mail options

        const mailOptions = {
            from: 'yasirkhan6499@gmail.com',
            to: email,
            subject: emailType==="VERIFY"? `Verify 
            Your email`: "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/
            verifyemail?token=${hashedToken}">
            here</a> to ${emailType === "VERIFY" ? "verify your email":
            "reset your password"}
            or copy paste the link in your
            browser. <br> ${process.env.domain}/${emailType==="VERIFY"?"verifyemail"
            :"forgotPassword"}?
            token=${hashedToken}
            </p>`
        }
        // console.log("sendEmail 6", process.env.NODEMAILER_PASS);
        const mailResponse = await transporter.sendMail
        (mailOptions); 
        // console.log("sendEmail 7");
        return mailResponse;

    } catch (error) {
        throw new Error(error.message);        
    }
}