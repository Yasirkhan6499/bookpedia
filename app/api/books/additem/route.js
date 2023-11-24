import { connectDB } from "@/dbConfig/database"
import Book from "@/models/bookSchema";
import { NextResponse } from "next/server";
import jwt  from 'jsonwebtoken';


export const POST = async (req,res)=>{
    try {
        console.log("addddd itemmmmmmmm1111")
      await connectDB();
        console.log("addddd itemmmmmmmm22222")
        const {bookid,title,collectionId, author,publishedDate, pages, publisher,
             isbn13,isbn10,addedDate,description,image, copies, price} = await req.json();
             console.log("addddd itemmmmmmmm3333")  
            //  console.log({title, author, publishedDate, pages, publisher, isbn13, isbn10, addedDate, description});  
        // Convert to numbers
        console.log("collectionID ",collectionId);
        const numPublishedDate = Number(publishedDate);
        const numPages = Number(pages);
        // const numIsbn13 = Number(isbn13);
        // const numIsbn10 = Number(isbn10);

         // Validate ISBNs (example validation, adjust as necessary)
         const validateISBN = (isbn) => {
            return typeof isbn === 'string' && (isbn.length === 10 || isbn.length === 13);
        };

        if (!validateISBN(isbn13) || !validateISBN(isbn10)) {
            return NextResponse.json({error: "Invalid ISBN format"}, {status: 400});
        }

        // Check if values are convertible to numbers
        if (isNaN(numPublishedDate) || isNaN(numPages)) {
            return NextResponse.json({error: "Invalid number format in the data provided"}, {status: 400});
        }
        
        const token = req.cookies.get("token")?.value;
        if(!token)
        return NextResponse.json({error: "Token is missing"},{status: 401});
        console.log("cookiesssssssssssss");
        // decoding token
        const decodedToken = jwt.decode(token);
        
        console.log("cookiesssssss222222222222");
        if(!decodedToken || !decodedToken.id)
        return NextResponse.json({
            error:"Invalid token or user id missing"
            },
            {status: 401}
            )

        // console.log(decodedToken.id);
        const newBook = new Book({
            userId: decodedToken.id,
            collectionId,
            bookid,
            title,
            author,
            publishedDate: numPublishedDate,
            pages: numPages,
            publisher,
            isbn13,
            isbn10,
            addedDate,
            description,
            image,
            copies,
            price
        });
        console.log("addddd itemmmmmmmm4444")
       await newBook.save();
       console.log("addddd itemmmmmmm5555")
        return NextResponse.json({
            message: "Book Added Succesfully",
            newBook
        })
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
  
}

