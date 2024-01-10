import { connectDB } from "@/dbConfig/database"
import Collection from "@/models/collectionSchema";
import { NextResponse } from "next/server";


export const POST = async (req, res)=>{
    // console.log("publishhh111");
    try{
        // console.log("publishhh22");
        await connectDB();
        // console.log("publishhh33");

        const {collections} = await req.json();
        // console.log("publishhh44");

        // console.log("Successfully Got coleectionssss :",collections);
          // Set the 'public' flag to true for selected collections
          await Collection.updateMany(
            { _id: { $in: collections } },
            { $set: { public: true } }
        );
        // console.log("publishhh33");

        const baseUrl = process.env.BASE_URL;
        const publicUrls = collections.map(id => `${baseUrl}/books/collections/${id}`);
        // console.log("publishhh44");

        return NextResponse.json({
            message: "collections are published",
            success: true,
            publicUrls
        })

    } catch(error){
        console.log("error :",error);
        return NextResponse.json({error: error.message},{status: 500});
    }
}