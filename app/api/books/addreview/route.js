import { connectDB } from "@/dbConfig/database"
import { GetDataFromToken } from "@/helpers/getDataFromToken";
import Book from "@/models/bookSchema";
import { NextResponse } from "next/server";



export const POST = async (req,res)=>{
    connectDB();

    try {

        const userId = GetDataFromToken(req);
        const {bookId, rating, review} = await req.json();
        
        const book = await Book.findOne({bookid: bookId, userId});
        console.log("booooook founnnnddd :", book);

        book.rating = rating;
        book.review = review;

        await book.save();

        return NextResponse.json({
            message:"Review Added Succesfully!",
            success: true
        })
    } catch (error) {
        return NextResponse.json({error:error.message},{status:500});
    }

}