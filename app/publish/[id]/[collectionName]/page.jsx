"use client";
import BookResult from "@/components/BookResult";
import { useVisitor } from "@/context/visitorContext";
import WindowDimensionsContext from "@/context/windowDimensionsContext";
import { useContext, useEffect, useState } from "react";


const PublishedCollectionsPage = ({params})=>{

  const [books, setBooks] = useState(null);  
          // for optimzation in different screens
  const { windowWidth } = useContext(WindowDimensionsContext);
  const { setIsVisitor, setViewedUserId, viewedUserBooks } = useVisitor();

  useEffect(() => {
    setIsVisitor(true);
    setViewedUserId(params.id);
    
    console.log("collectionName: ", params.collectionName, " id: ", params.id);

    // Reset when component unmounts
    return () => setIsVisitor(false);
  }, []);

  // set books
  useEffect(()=>{
    setBooks(viewedUserBooks);
    console.log("viewedUserBooks: ",viewedUserBooks);
  },[viewedUserBooks]);

    return(
      <div>
        <div className={`flex ${windowWidth<=768?"justify-center items-center":"justify-between"}  
      ${windowWidth<=768?"fixed bottom-0 w-[120.79%] -ml-[1rem] mt-10 ":"sticky top-0 -ml-[4.4rem]"}  
      xl:w-[106%] p-4 ${windowWidth<=512?"pl-6":"pl-14"} 
      -ml-[4.4rem] -mt-7 shadow-md bg-cyan-500  z-10`}>
            <p className="text-white">
                {decodeURIComponent(params.collectionName)}

            </p>   
            
        </div>

        // book results
        <div>
              {books && books.map(book=>{
                return(
                 <BookResult //------------Cover Layout Style------------------------
                 book={book}
                //  collection={selectedCollection}
                 titleCss={"!text-base border-none w-fit text-slate-500 -mb-2 mt-8 custom-md:mt-3  "}
                 imgCss={"w-[8rem] -mb-9 min-w-[7rem] h-[190px] cursor-pointer hover:shadow-2xl hover:-translate-y-2 hover:brightness-75 transition duration-300 ease-in-out "}
                 starSize={"20px"}
                 descReviewCss={"!-mt-[0.3rem] font-semibold"}
                 isBookEdit={false}
                //  handleEditIcon={handleEditIcon}
                 isListStyle={false}
                 isCoverStyle={true}
                 bookContainerCss={"!flex-col "}
                 authorCss={"text-xs"}
                 starContainerCss={"hidden"}
                 />
                )
              })}
            </div>

          </div>
    );

} 

export default PublishedCollectionsPage;