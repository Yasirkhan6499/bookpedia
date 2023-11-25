import Collection from "@/models/collectionSchema";
import { NextResponse } from "next/server"

export const GET = async (req,res)=>{
    try {
        // console.log("getCollectionsArrrrrrrrrrrr")
        const userId = GetDataFromToken(req);
        
        const collectionsArr = await Collection.find(userId);
        return NextResponse.json({
            message:"Successfully got the collections array",
            collections: collectionsArr
        })
    } catch (error) {
        return NextResponse.json({error:error.message},{status:500});
    }
}