"use client";

import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import { Nav } from "@/components/Nav";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useBookListContext } from "./BookListContext";
import { useBodyContainerContext } from "./bodyContainerContext";
import MenuMobile from "@/components/MenuMobile";

const AuthContext = createContext();
    
export const AuthContextProvider = ({children}) => {
    const [userToken, setUserToken] = useState("");
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);


    // To set the bodyContainer CSS
    const { bodyContainerCss } = useBodyContainerContext();

    useEffect(()=>{
          // Handle window resize
          const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        // Clean up the event listener
        return () => window.removeEventListener("resize", handleResize);
    },[])

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


     // Determine the container class based on the window width
     const containerClass = windowWidth <= 768 ? "body-container-mobile" : `body-container-pc ${bodyContainerCss}`;

    return(
        <AuthContext.Provider value={{userToken, setUserToken}}>
            {!userToken?<><Nav /> <Hero /></> :(windowWidth <= 768 )?<MenuMobile />:<Menu />  }
            <div className={userToken?`${containerClass} ${bodyContainerCss}`:""}>
            {children}
            </div>
        </AuthContext.Provider>
    )
};

export const useAuthContext = ()=> useContext(AuthContext);