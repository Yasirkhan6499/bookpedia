import { NextResponse } from "next/server";
// import { Collection } from '@/models/collectionSchema';
import { connectDB } from "@/dbConfig/database";
import Collection from './../../../../../models/collectionSchema';
import { GetDataFromToken } from "@/helpers/getDataFromToken";
import Book from "@/models/bookSchema";


export const POST = async (req,res)=>{

    try{
        connectDB();
        // userId
        let userId;
        const requestBody = await req.json(); // //if a visitor is viewing the public collections do this
        if (requestBody && requestBody.viewedUserId) {
            userId = requestBody.viewedUserId; // Extract the id from the request body
        } else { //if user is accessing his public collections to be showing in the select input on /publish page
            userId = GetDataFromToken(req); // Fallback to getting userId from token
        }
    
      const publicCollections = await Collection.find({userId,public: true });

      console.log("publicCollections :",publicCollections);
    //   Now get the totla number of books in each collection

    // Use Promise.all to wait for all promises from the map to resolve
        const booksInCollectionArr = await Promise.all(
        publicCollections.map(async (col) => {
          const totalBooks = await Book.count({ collectionId: col._id });
          return totalBooks;
        })
      );

       // Combine the publicCollections with their respective totalBooks count
    const publicCollectionsWithBookCount = publicCollections.map((collection, index) => ({
        ...collection.toObject(), // Assuming Mongoose documents, convert to plain object
        totalBooks: booksInCollectionArr[index]
      }));

       console.log("BooksInCollectionArr :",booksInCollectionArr);

      return NextResponse.json({
        message: "Found Public Collections",
        success: true,
        publicCollections:publicCollectionsWithBookCount
      })


    }catch(error){
        console.log("error: ", error);
        return NextResponse.json({error: error.message},{status:500});
    }

}