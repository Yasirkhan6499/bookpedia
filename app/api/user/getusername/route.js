import { connectDB } from "@/dbConfig/database";
import { GetDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export const GET = async (req,res)=>{
    try{
      
        await connectDB();
        
        const userId =  GetDataFromToken(req); 
         
        const user = await User.findById(userId);
        
         // Check if the user was found
         if (!user) {
            return NextResponse.json({ 
                success: false, 
                message: "User not found" 
            }, { status: 404 });
        }
        
        return NextResponse.json({
            success:true,
            username: user.username,
            email: user.email,
            userId
        })

    }
    catch(error){
        console.log("error getting the username :",error);
        return NextResponse.json({error:error.message},{status:500});
    }
}
