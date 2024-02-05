import { connectDB } from "@/dbConfig/database";
import { GetDataFromToken } from "@/helpers/getDataFromToken";
import Book from "@/models/bookSchema";
import { NextResponse } from "next/server"

export const POST = async (req,res)=>{
    connectDB();
    try {
        console.log("reacheddddddddddddddddddddddddddddddd")

        let userId;
        const reqBody = await req.json(); 
        if(reqBody && reqBody.userId)
        userId = reqBody.userId; //For Published books to be viewed for the visitor
        else
        userId = GetDataFromToken(req); //online user getting his books

        console.log("userIddddddddddddddd", userId)
        const books = await Book.find({userId})


        return NextResponse.json({
            message:"Books Array sent!",
            success: true,
            books
        })
    } catch (error) {
        console.log("error: ",error);
        return NextResponse.json({error:error.message},{status:500});
    }
}