"use client";

import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import { Nav } from "@/components/Nav";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useBodyContainerContext } from "./bodyContainerContext";
import MenuMobile from "@/components/MenuMobile";
import { useVisitor } from "./visitorContext";


const AuthContext = createContext();
    
export const AuthContextProvider = ({children}) => {
    const [userToken, setUserToken] = useState("");
    const [windowWidth, setWindowWidth] = useState(0);
    // const [ checkVisitor, setCheckVisitor ] = useState(false);
    const { isVisitor } = useVisitor();

    // To set the bodyContainer CSS
    const { bodyContainerCss } = useBodyContainerContext();

     // if a visitor is visiting to check someones public collections, 
    //then just set the "userToken" to some number or otherwise the
    //public collections will not be shown unless he is logged in
    //so to avoid logging in, we will just set it to 1.
    // useEffect(()=>{
       
    //     if(checkVisitor)
    //     setUserToken("1");
    // },[checkVisitor]);


    useEffect(() => {


        // Check if window is defined (client-side)
        if (typeof window !== "undefined") {
            setWindowWidth(window.innerWidth);

            // Handle window resize
            const handleResize = () => {
                setWindowWidth(window.innerWidth);
            };

            window.addEventListener("resize", handleResize);

            // Clean up the event listener
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);

    useEffect(()=>{
        const checkTokenData = async ()=>{
            try{
            const res = await axios.post("/api/users/myprofile");
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


     // Determine the container class based on the window width
     const containerClass = windowWidth <= 768 ? "body-container-mobile" : `body-container-pc ${bodyContainerCss}`;

    return(
        <AuthContext.Provider value={{userToken, setUserToken}}>
            {(!userToken && !isVisitor)?<><Nav /> <Hero /></> :(windowWidth <= 768 )?<MenuMobile />:<Menu />  }
            <div className={(userToken || isVisitor)?`${containerClass} ${bodyContainerCss} `:""}>
            {children}
            </div>
        </AuthContext.Provider>
    )
};

export const useAuthContext = ()=> useContext(AuthContext);