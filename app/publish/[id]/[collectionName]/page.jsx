"use client";
import BookResult from "@/components/BookResult";
import { useAuthContext } from "@/context/authContext";

import { useVisitor } from "@/context/visitorContext";
import WindowDimensionsContext from "@/context/windowDimensionsContext";
import { useContext, useEffect, useState } from "react";

const groupBooksByAlphabet = (books)=>{
  return books.reduce((acc, book)=>{
    // get the first letter of title, uppercased
    const firstLetter = book.title[0].toUpperCase();
    // if there is no property of this letter, create an empty array
    if(!acc[firstLetter])
    acc[firstLetter]=[];

    // push the current book whose first alphabaet in title is same as the property
    acc[firstLetter].push(book);

    return acc;

  },{});
}


const PublishedCollectionsPage = ({params})=>{

  // const [books, setBooks] = useState(null);  
  const [groupedBooks, setGroupedBooks] = useState({});
  // // to get the menu we need to update the setCheckVisitor, which will affect the "authContext"
  // const { setCheckVisitor } = useAuthContext();
          // for optimzation in different screens
  const { windowWidth } = useContext(WindowDimensionsContext);
  const { setIsVisitor, setViewedUserId, viewedUserBooks,visitorSelectedCol   } = useVisitor();

  useEffect(() => {
    setIsVisitor(true); //for overall website
    setViewedUserId(params.id);
    // setCheckVisitor(true); //for authContext
    

    console.log("collectionName: ", params.collectionName, " id: ", params.id);

    // Reset when component unmounts
    return () => setIsVisitor(false);
  }, []);

  //Group and set books
  useEffect(()=>{
    // setBooks(viewedUserBooks);
    if(viewedUserBooks){
      const filteredBooks = viewedUserBooks.filter(book=>book.collectionId===visitorSelectedCol);
      const grouped = groupBooksByAlphabet(filteredBooks);
      setGroupedBooks(grouped);
    }
    console.log("viewedUserBooks: ",viewedUserBooks);
  },[viewedUserBooks, visitorSelectedCol]);

    return(
      <div>
        <div className={`flex ${windowWidth<=768?"justify-center items-center":"justify-between"}  
      ${windowWidth<=768?"fixed bottom-0 w-[120.79%] -ml-[1rem] mt-10 ":"sticky top-0 -ml-[4.4rem]"}  
      xl:w-[106%] p-2 sm:p-4 ${windowWidth<=512?"pl-6":"pl-14"} 
      -ml-[4.4rem] -mt-7 shadow-md bg-cyan-500  z-10`}>
            <p className="text-white text-lg sm:text-xl">
                {decodeURIComponent(params.collectionName)}

            </p>   
            
        </div>

        {/* book results */}

        <div className="mt-10">
              {Object.keys(groupedBooks).sort().map(letter=>{

                return(
                <div key={letter}> 
                <h2 className="border-b-2 border-slate-200 text-cyan-500">
                  {letter}
                </h2>
                <div className="flex flex-wrap ">
                {groupedBooks[letter].map(book=>{
                  return(
                  
                    <BookResult //------------Cover Layout Style------------------------
                    book={book}
                    key={book._id}
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
                })} </div>
                  
                </div>
                )
                
              })}
                
              
            </div>

          </div>
    );

} 

export default PublishedCollectionsPage;