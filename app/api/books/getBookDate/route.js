import { NextRequest, NextResponse } from "next/server"

export const POST = async (req,res)=>{
    try {
        const {book} = await req.json();
        console.log("book date",book);
         
    } catch (error) {
        return NextResponse.json({error: error.message},{status:500});
    }
}