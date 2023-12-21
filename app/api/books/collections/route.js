import { connectDB } from "@/dbConfig/database";
import Collection from "@/models/collectionSchema";
import { NextResponse } from "next/server";
import jwt  from 'jsonwebtoken';


await connectDB();

export async function POST(req, res){
    try{
    const reqBody = await req.json();
    const {name} = await reqBody;
    console.log("cookiesssssssssssss111111111111");
     // getting user id from the browser token
     const token = req.cookies.get("token")?.value;
     if(!token)
     return NextResponse.json({error: "Token is missing"},{status: 401});
    //  console.log("cookiesssssssssssss22222222222222");
     // decoding token
     const decodedToken = jwt.decode(token);
     
    //  console.log("cookiesssssss33333333333");
     if(!decodedToken || !decodedToken.id)
     return NextResponse.json({
         error:"Invalid token or user id missing"
         },
         {status: 401}
         )
        //  console.log("cookiesssssssssssss4444444444444");
        console.log("decoded tokeeeennnnnn :",decodedToken.id);
        let newCollection="";

        // Check if a collection with the given name already exists
        const existingCollection = await Collection.findOne({ name });

        if(existingCollection){
            return NextResponse.json({
                message: "Collection name already exists in this account!",
                success:false
            }, {status: 409})
        }
        else{
        newCollection = new Collection({
        userId: decodedToken.id,
        name 
    });
    }
    const result = await newCollection.save();

    return NextResponse.json({
        message: "New Collection Added",
        success: true
    });
}catch(error){
    console.log("Errorrrrrrr: ",error);
    return NextResponse.json({error:error.message},
        {status:500})
}
}