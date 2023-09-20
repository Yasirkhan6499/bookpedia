import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import { sendEmail } from "@/helpers/mailer";

const { connectDB } = require("@/dbConfig/database");




export const POST = async (request)=>{
    try {
        // console.log("REACHED POST")
        await connectDB();
        const {username, email, password} = await request.json();

        // check if user already exists
        const user = await User.findOne({email});
        // console.log("REACHED POST 222")
        if(user){
            return NextResponse.json({ error: "User already exists" },
             { status: 400 });
        }
        // console.log("REACHED POST333")
        // hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);
        // console.log("REACHED POST 444")
        // save user in db
      const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        // console.log("REACHED POST555")
        await newUser.save();
        // console.log("Reached Verify666");
        // send verification email
        await sendEmail({email, emailType: "VERIFY", //<= ISSUE HERE! 
        userId: newUser._id});

        // console.log("after verify")

        return NextResponse.json({
        message: "User Created Succesfully",
        success: true,
        newUser
      }); 
       
    } catch (error) {
        return NextResponse.json({ error: error.message }, 
            { status: 500 });
    }
}