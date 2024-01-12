import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const GetDataFromToken = (request) => {
    try {
        const token = request.cookies.get("token")?.value || null;
        console.log("token: ", token);

        if(token){    
        
        const tokenSecret = process.env.TOKEN_SECRET || 'default_secret';
        console.log("decoded Token : ", decodedToken)
        return decodedToken.id;
        }
     
        return null;
    } catch (error) {
        throw new Error("Errori is within the Env variable,:",error.message);
    }

}