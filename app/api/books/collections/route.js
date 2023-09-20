import { connectDB } from "@/dbConfig/database";
import Collection from "@/models/collectionSchema";
import { NextResponse } from "next/server";


await connectDB();

export async function POST(req, res){
    try{
    const reqBody = await req.json();
    const {name} = await reqBody;
    
    const newCollection = new Collection({
        name 
    });

    const result = await newCollection.save();

    return NextResponse.json({
        message: "New Collection Added",
        success: "true"
    });
}catch(error){
    return NextResponse.json({error:error.message},
        {status:500})
}
}