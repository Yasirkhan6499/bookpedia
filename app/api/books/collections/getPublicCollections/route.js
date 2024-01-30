import { NextResponse } from "next/server";
// import { Collection } from '@/models/collectionSchema';
import { connectDB } from "@/dbConfig/database";
import Collection from './../../../../../models/collectionSchema';
import { GetDataFromToken } from "@/helpers/getDataFromToken";


export const GET = async (req,res)=>{

    try{
        connectDB();
        // userId
      const userId = GetDataFromToken(req);  
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