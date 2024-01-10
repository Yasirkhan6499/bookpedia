"use client";
import { useEffect } from "react";


const PublishedCollectionsPage = ({params})=>{

    useEffect(()=>{
        console.log("collectionName: ",params.collectionName," id: ",params.id);
    },[]);

    return(
        <div>

        </div>
    );

} 

export default PublishedCollectionsPage;