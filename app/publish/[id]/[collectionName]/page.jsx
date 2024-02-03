"use client";
import { useVisitor } from "@/context/visitorContext";
import WindowDimensionsContext from "@/context/windowDimensionsContext";
import { useContext, useEffect } from "react";


const PublishedCollectionsPage = ({params})=>{

          // for optimzation in different screens
  const { windowWidth } = useContext(WindowDimensionsContext);
  const { setIsVisitor } = useVisitor();

  useEffect(() => {
    setIsVisitor(true);
    console.log("collectionName: ", params.collectionName, " id: ", params.id);

    // Reset when component unmounts
    return () => setIsVisitor(false);
  }, []);

    return(
        <div className={`flex ${windowWidth<=768?"justify-center items-center":"justify-between"}  
      ${windowWidth<=768?"fixed bottom-0 w-[120.79%] -ml-[1rem] mt-10 ":"sticky top-0 -ml-[4.4rem]"}  
      xl:w-[106%] p-4 ${windowWidth<=512?"pl-6":"pl-14"} 
      -ml-[4.4rem] -mt-7 shadow-md bg-cyan-500  z-10`}>
            <p className="text-white">
                {decodeURIComponent(params.collectionName)}

            </p>   
            
        </div>
    );

} 

export default PublishedCollectionsPage;