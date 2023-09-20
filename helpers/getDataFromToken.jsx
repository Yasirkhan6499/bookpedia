import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const GetDataFromToken = (request) => {
    try {
        const token = request.cookies.get("token")?.value || null;
        console.log("token: ", token);
        if(token){
            console.log("token2");
        const decodedToken= jwt.verify(token, process.env.TOKEN_SECRET);
        console.log("decoded Token : ", decodedToken)
        return decodedToken.id;
        }
        console.log("token 3");
        return null;
    } catch (error) {
        throw new Error(error.message);
    }

}