import { NextResponse } from "next/server";
// import { Collection } from '@/models/collectionSchema';
import { connectDB } from "@/dbConfig/database";
import Collection from './../../../../../models/collectionSchema';
import { GetDataFromToken } from "@/helpers/getDataFromToken";


export const POST = async (req,res)=>{

    try{
        connectDB();
        // userId
        let userId;
        const requestBody = await req.json(); // //if a visitor is viewing the public collections do this
        if (requestBody && requestBody.viewedUserId) {
            userId = requestBody.viewedUserId; // Extract the id from the request body
        } else { //if user is accessing his public collections to be showing in the select input on /publish page
            userId = GetDataFromToken(req); // Fallback to getting userId from token
        }
    
      const publicCollections = await Collection.find({userId,public: true });

      return NextResponse.json({
        message: "Found Public Collections",
        success: true,
        publicCollections
      })


    }catch(error){
        console.log("error: ", error);
        return NextResponse.json({error: error.message},{status:500});
    }

}