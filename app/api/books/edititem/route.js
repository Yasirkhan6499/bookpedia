import { connectDB } from "@/dbConfig/database";
import Book from "@/models/bookSchema";
import { NextResponse } from "next/server";


export const POST = async (req,res)=>{

    try{
    connectDB();
    
    const {bookid,title,author,description,price,image} = await req.json();
    
    const existingBook = await Book.findOne({bookid});

    if(!existingBook)
    return NextResponse.json({message: "Book not found!"},{status: 500});
    
    existingBook.title = title;
    existingBook.author = author;
    existingBook.description = description;
    if(price>0)
    existingBook.price=price;
    if(image)    
    existingBook.image=image;

    await existingBook.save();

    return NextResponse.json({
        message: "Book Updated!",
        success: true
    })

        
            
    }catch(error){
        return NextResponse.json({error:error.message}, {status: 500});
    }

}