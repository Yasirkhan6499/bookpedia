// pages/api/sendEmail.js
import { compareSync } from 'bcryptjs';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const POST = async (req, res) => {

    // Extract the form data from the request body
    const { name, email, message } = await req.json();

    console.log("namee", name, email, message);

    // Setup the nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Or your email service
      auth: {
        user: process.env.EMAIL_USERNAME, // Your email address
        pass: process.env.EMAIL_PASSWORD, // Your email password
      },
    });
    

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USERNAME, // Your authenticated Gmail address
      replyTo: email, // The submitter's email address
      to: 'yasircrusher@gmail.com',
      subject: `New message from Booklib by ${name}`,
      text: message,
    };
    // console.log("reacheddd");
    // Send the email
    try{
    await transporter.sendMail(mailOptions);

  return NextResponse.json({
    message: "Email sent successfully",
    success: true
  });
}catch(error){
  console.log("error message :", error);
  return NextResponse.json({ error: error.message }, { status: 500 });
}
  

};
