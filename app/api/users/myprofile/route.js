import { GetDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

const { connectDB } = require("@/dbConfig/database");



await connectDB();

export const GET = async (request)=>{
    try {
        // console.log("reach 1");
       const userID = await GetDataFromToken(request); //<= issue here
       console.log("reach 2, userId:",userID);
       if(userID){
        // console.log("reach 3");
       const user = await User.findOne({_id: userID});
    //    console.log("reach 4");
       return NextResponse.json({
        message: "user Found",
        data: user
       });
       }
       else{
        // console.log("reach 5, error");
        // return NextResponse.json("User not found", {status: 400});
        return new Response(JSON.stringify("Myprofile not founddd"), { status: 200 })
       
       }
    } catch (error) {
        console.log("reach 6, 2nd error");
        return NextResponse.json({error: error.message}, {status: 400});
    }
}