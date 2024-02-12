import { connectDB } from "@/dbConfig/database"
import { GetDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextResponse } from "next/server";


export const GET = async (req, res)=>{
    try{
    connectDB();

    const userId= GetDataFromToken(req);
    const user= await User.findById(userId);
       
  return NextResponse.json({
        message:"Publish Title Found",
        success:true,
        publishTitle:user.publishCollectionsTitle
    })
    // console.log("userrr:",user.publishCollectionsTitle);
    }catch(error){
        console.error("error Getting publis title: ",error);
      return NextResponse.json({error: error.message},{status:500});
        
    }
}