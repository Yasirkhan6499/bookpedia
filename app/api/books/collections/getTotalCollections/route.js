
import { NextResponse } from "next/server";

import Collection from './../../../../../models/collectionSchema';

const { connectDB } = require("@/dbConfig/database");



export  const GET = async (req,res)=>{
    
    try {
        connectDB();
        const total = await Collection.countDocuments();

        return NextResponse.json({
            message: "Successfully got the total collections",
            totalCollections: total
        })
        
    } catch (error) {
        return NextResponse({error: error.message},
            {status:500})
    }
}