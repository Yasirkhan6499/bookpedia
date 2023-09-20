"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    


    const verifyUserEmail = async () =>{
        try{
          const res=await axios.post('/api/users/verifyemail',
            {token});
            setVerified(true);
        } catch(error){
            setError(true);
            console.log(error.response.data);
        }
    }

    useEffect(()=>{
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    useEffect(()=>{
        if(token.length > 0){
            verifyUserEmail();
            console.log("token :",token);
        }
    }, [token]);
    
    return(
        
        <div className="flex flex-col items-center
        justify-center mt-20 py-2">

            {/* <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token?`${token}`:"No Token"}</h2> */}

            {verified && (
                <div>
                    <h2 className="text-2xl">Thank You For Verifying Your Email</h2>
                   <Link href="/login" className="switch-acc-link text-center ml-40 ">
                       Login Now
                    </Link>
                    </div>
            )}

            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">
                        Email not verified!</h2>
                </div>
            )}

        </div>

    )
}