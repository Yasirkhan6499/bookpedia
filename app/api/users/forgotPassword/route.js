import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import { NextResponse } from 'next/server';

export const POST = async(request)=>{

    try{
    const reqBody = await request.json();
    const {password, token} = await reqBody;

    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password,salt);

    // find the user and update the password
    const user = await User.findOne({
        forgotPasswordToken: token
    })
    console.log("password : ", hashedPassword)
    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;

    await user.save();
    
    console.log("password 22: ", hashedPassword)
    return NextResponse.json({
        message: "Password Resetted Succesfully",
        success: true
    }) 
   
} catch(error){
    return NextResponse.json({error:error.message},
        {status: 500});
}
  
    
}