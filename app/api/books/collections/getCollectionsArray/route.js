import { GetDataFromToken } from "@/helpers/getDataFromToken";
import Collection from "@/models/collectionSchema";
import { NextResponse } from "next/server"

export const POST = async (req,res)=>{
    try {
        // console.log("getCollectionsArrrrrrrrrrrr")
        const userId = GetDataFromToken(req);
        
        // console.log("userrrIDDDDDD : ",userId);

        const collectionsArr = await Collection.find({userId});
        // console.log("collectionssssARRRRR : ",collectionsArr);
        return NextResponse.json({
            message:"Successfully got the collections array",
            collections: collectionsArr
        })
    } catch (error) {
        console.error("Error fetching collections:", error);
        return NextResponse.json({error: error.message}, {status: 500});
    }
}