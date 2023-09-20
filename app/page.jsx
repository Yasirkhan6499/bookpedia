"use client";

import Hero from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { useRouter } from "next/navigation";
import { useEffect } from "react";



const Home = () => {
  const router = useRouter();
  // const [searchTerm, setSearchTerm] = useState("");
  // const [books, setBooks] = useState([]);

  // const router = useRouter();

  // useEffect(() => {
  //   const getSearchResult = async () => {
  //     useEffect(() => {
  //   const getSearchResult = async () => {
  //     if (searchTerm) {
  //       try {
  //         const data = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)}`);
  //         const books = await data.json();
  //         setBooks(books.items || []);
  //         console.log(books)
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     }
  //   };

  //   getSearchResult();
  // }, [searchTerm]);

  //   getSearchResult();
  // }, [searchTerm]);

  // const handleSearchBar = (e) => {
  //   setSearchTerm(e.target.value);
  // };

  // const handleSearchBtn = (e) => {
    
  //   // router.push(`/books`);
    
  // };

  useEffect(()=>{
    router.push("/signup");
  },[]);

  return (
    <div>
      
      {/* <Nav />
      <Hero /> */}
      
    {/* <Search
      value={searchTerm}
      handleSearchBar={handleSearchBar}
      handleSearchBtn={handleSearchBtn}
    /> */}
    </div>
  );
};

export default Home;
