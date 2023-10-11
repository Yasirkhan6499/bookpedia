import { connectDB } from "@/dbConfig/database";
import Collection from "@/models/collectionSchema";
import { NextResponse } from "next/server"

export const POST = async (req,res)=>{
    try{
        console.log("collectionnnnnnnnnnnn00000000")
        connectDB();
        console.log("collectionnnnnnnnnnnn1111111111")
        const {collectionId} = await req.json();
        console.log("collectionnnnnnnnnnnn22222222", collectionId)
        const collectionData = await Collection.findById(collectionId);
        
        
        return NextResponse.json({
            message: "Succesfully got the collection",
            collection: collectionData
        });
    }catch(err){
        return NextResponse.json({error: err.message},{status: 500});
    }
}