import Book from "@/models/bookSchema";
import Collection from "@/models/collectionSchema";
import { NextResponse } from "next/server"


export const POST = async (req,res)=>{
    try {
        const {bookid , collectionId} = await req.json();
        const currentBook = await Book.findOne({bookid});
                // Check if the book and collection exist
        if (!currentBook) {
            return NextResponse.json({ message: "Book not found", success: false }, { status: 500 });
        }
    
        // Update the collectionId of the book
        currentBook.collectionId = collectionId;
    
        // Save the updated book
        await currentBook.save();

        return NextResponse.json({
            message: "Book is moved to new collection",
            success: true
        })
    } catch (error) {
        return NextResponse.json({error:error.message},{status:500});
    }
}