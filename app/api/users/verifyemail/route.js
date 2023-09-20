import User from "@/models/userModel";
import { NextResponse } from "next/server";

const { connectDB } = require("@/dbConfig/database");



connectDB();

export async function POST(request){
    try {
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log(token);
        // find user based on the verify token and also the expiry date should be greater than the current date
       const user = await User.findOne
       ({verifyToken: token,
        verifyTokenExpiry: {$gt: Date.now()}
        })

        if(!user){
            // If user is not find for email verification, then it must mean that the token was sent to reset the password
            //  so find the user based on the forgotpassword token
            const user2 = await User.findOne({
                forgotPasswordToken: token,
                forgotPasswordTokenExpiry: {$gt: Date.now()}
            });
             
            if(!user2){
            return NextResponse.json({error: `Invalid
            token`}, {status: 400})
            }
            else{
                //  if user have "forgotPasswordToken", then send success to reset the password
                return NextResponse.json({
                    message:"password reset",
                    success: true
                });
            }
        }
        console.log("user: "+user);

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({
            message: "Email Verified successfully",
            success: true
        }
            )
        
    } catch (error) {
        return NextResponse.json({error: error.message},
            {status: 500});
    }
}