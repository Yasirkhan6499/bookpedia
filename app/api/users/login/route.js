import {connectDB} from "@/dbConfig/database";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
// import { setCookie } from "cookies-next";




export const POST =  async(request)=>{
    
    try {
        await connectDB();
        const reqBody = await request.json()
        const {email, password} = reqBody;
        console.log(reqBody);

        //check if user exists
        const user = await User.findOne({email})
        if(!user){
            return new Response(JSON.stringify("User Does not exist"), { status: 400 })
        }
        console.log("user exists");
        
        
        //check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return new Response(JSON.stringify("invalid password"), { status: 400 })

        }
        console.log(user);
        
        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        //create token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
          });
          console.log("cookie token set,:",token)
          response.cookies.set("token", token, { 
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development', // true in production
            sameSite: 'None', // 'Strict' or 'Lax' in development
            path: '/'
          });
        // setCookie("token", token);
         // Set the cookie in the response with the appropriate attributes
        // response.headers.set("Set-Cookie", `token=${token}; HttpOnly; Path=/; Secure; SameSite=None`);
        console.log("token created: ",token);
        return response;

    } catch (error) {
        return new Response(JSON.stringify("Error: ", error), { status: 500 })
    }
}