"use client";

import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import { Nav } from "@/components/Nav";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
    
export const AuthContextProvider = ({children}) => {
    const [userToken, setUserToken] = useState("");

    useEffect(()=>{
        const checkTokenData = async ()=>{
            try{
            const res = await axios.get("/api/users/myprofile");
            setUserToken(res.data.data?._id || null);
            }catch (error) {
                if (error.response && error.response.data) {
                    console.log("Error: " + error.response.data); // Access the error message from the response
                } else {
                    console.log("Error: " + error.message);
                }
            }
        }
        checkTokenData();
        
    },[userToken]);

    return(
        <AuthContext.Provider value={{userToken, setUserToken}}>
            {userToken?<Menu /> : <><Nav /> <Hero /> </> }
            <div className={userToken?"body-container":""}>
            {children}
            </div>
        </AuthContext.Provider>
    )
};

export const useAuthContext = ()=> useContext(AuthContext);