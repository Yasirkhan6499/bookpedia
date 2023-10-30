"use client";

const { createContext, useContext, useState } = require("react");

const bodyContainerContext = createContext();

export const useBodyContainerContext = ()=>{
    return useContext(bodyContainerContext);
}

export const BodyContainerProvider = ({children})=>{
    const [bodyContainerCss, setBodyContainerCss] = useState("");

    const value = {
        bodyContainerCss,
        setBodyContainerCss
    }

    return <bodyContainerContext.Provider value={value}>
        {children}
    </bodyContainerContext.Provider>

}