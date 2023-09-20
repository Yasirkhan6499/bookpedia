import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextResponse } from "next/server";


export const POST = async(request)=>{
    
    try {
        const reqBody = await request.json();
        const {email} = await reqBody;
        
        // find the user using the email
        const user = await User.findOne({email});

          // send verification email
        await sendEmail({email, emailType: "RESET", 
        userId: user._id});

        return NextResponse.json({
            message: "Email Sent For Verification",
            success: true
        })

    } catch (error) {
        return NextResponse.json({error: error.message},{status: 500});
    }
  
}