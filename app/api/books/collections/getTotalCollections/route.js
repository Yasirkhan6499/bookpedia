
import { NextResponse } from "next/server";

import Collection from './../../../../../models/collectionSchema';
import jwt  from 'jsonwebtoken';
const { connectDB } = require("@/dbConfig/database");



export  const GET = async (req,res)=>{
    
    try {
        connectDB();

         // Extract the token from the request
         const token = req.cookies.get("token")?.value;
         if (!token) {
             return NextResponse.json({ error: "Token is missing" }, { status: 401 });
         }
 
         // Decode the token to get the user ID
         const decodedToken = jwt.decode(token);
         if (!decodedToken || !decodedToken.id) {
             return NextResponse.json({
                 error: "Invalid token or user ID missing"
             }, { status: 401 });
         }

        const total = await Collection.countDocuments({ userId: decodedToken.id });

        return NextResponse.json({
            message: "Successfully got the total collections",
            totalCollections: total
        })
        
    } catch (error) {
        return NextResponse({error: error.message},
            {status:500})
    }
}