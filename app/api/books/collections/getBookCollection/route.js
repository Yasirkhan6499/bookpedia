import { connectDB } from "@/dbConfig/database";
import Collection from "@/models/collectionSchema";
import { NextResponse } from "next/server"

export const POST = async (req,res)=>{
    try{
        console.log("collectionnnnnnnnnnnn00000000")
        connectDB();
        console.log("collectionnnnnnnnnnnn1111111111")

        const {collectionId} = await req.json();

        const collectionData = await Collection.findById(collectionId);
        
        
        return NextResponse.json({
            message: "Succesfully got the collection",
            success: true,
            collection: collectionData
        });
    }catch(err){
        return NextResponse.json({error: err.message},{status: 500});
    }
}