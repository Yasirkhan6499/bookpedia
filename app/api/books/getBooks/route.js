import { connectDB } from "@/dbConfig/database";
import { GetDataFromToken } from "@/helpers/getDataFromToken";
import Book from "@/models/bookSchema";
import { NextResponse } from "next/server"

export const POST = async (req,res)=>{
    connectDB();
    try {
        console.log("reacheddddddddddddddddddddddddddddddd")
        const userId = GetDataFromToken(req);
        console.log("userIddddddddddddddd", userId)
        const books = await Book.find({userId})


        return NextResponse.json({
            message:"Books Array sent!",
            success: true,
            books
        })
    } catch (error) {
        return NextResponse.json({error:error.message},{status:500});
    }
}