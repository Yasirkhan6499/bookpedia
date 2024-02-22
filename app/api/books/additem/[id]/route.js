import { connectDB } from "@/dbConfig/database"
import Book from "@/models/bookSchema";
import { NextResponse } from "next/server";


export const POST = async (req,res)=>{
    try {
        connectDB();
        const {bookId} = await req.json();
       const existingBook = await Book.findOne({bookid:bookId});

    //    console.log("Book found for edit :",existingBook);

       return NextResponse.json({
        message: "Book fetched successfully!",
        success: true,
        bookData: existingBook
       })
    } catch (error) {
        return NextResponse.json({error:error.message},{status: 500});
    }
}