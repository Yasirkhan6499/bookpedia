import { connectDB } from "@/dbConfig/database"
import { GetDataFromToken } from "@/helpers/getDataFromToken";
import Book from "@/models/bookSchema";
import { NextResponse } from "next/server";


export const POST = async (req, res)=>{

    try{
    await connectDB();  
    console.log("itemExistsss11111111");
    const {bookid} = await req.json();
    const userId = GetDataFromToken(req);

    const existingBook = await Book.findOne({userId,bookid});
    console.log("existingbook: ",existingBook);
    if(existingBook)
    return NextResponse.json({
        message: "Book Already Exists",
        success: true
    })
    else return NextResponse.json({
        message: "Book Does not Exists",
        success: false
    })

    }catch(error){
        return NextResponse.json({error: error.message}, {status: 500});
    }
}