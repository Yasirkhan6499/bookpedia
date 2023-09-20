import Collection from "@/models/collectionSchema";
import { NextResponse } from "next/server"

export const GET = async (req,res)=>{
    try {
        console.log("getCollectionsArrrrrrrrrrrr")
        const collectionsArr = await Collection.find();
        return NextResponse.json({
            message:"Successfully got the collections array",
            collections: collectionsArr
        })
        console.log(collectionsArr);
    } catch (error) {
        return NextResponse.json({error:error.message},{status:500});
    }
}