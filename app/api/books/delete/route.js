import { connectDB } from "@/dbConfig/database"
import Book from "@/models/bookSchema";
import { NextResponse } from "next/server";


export const POST = async (req,res)=>{
   try {
    console.log("enterrrrrrrrrrrr")
    connectDB();
    console.log("enterrrrrrrrrrrr22222")
    
    const {bookid} = await req.json();
    console.log("BookIddddd :", bookid);

    const book = await Book.findOneAndDelete({bookid});

    return NextResponse.json({
        message: "Book Deleted Successfully",
        Success: true,
        book
    })

   } catch (error) {
    return NextResponse.json({error:error.message},{status:500});
   }

}

