
import BookEditingOptions from './BookEditingOptions';
import BookResult from './BookResult';
import CloseButton from './CloseButton';


  const BookEdit = ({book, collection}) => {
  
    // const [bookDate, setBookDate] = useState();
  // useEffect(()=>{
  //   console.log("colleciton: ",collection);
  // })
    // useEffect(()=>{
    //   console.log("BookEdit :", book);
    //  const getBookDate = async()=>{
    //   try {
    //     const response = await axios.post("/api/books/getBookDate",{
    //       book
    //     })
    //     setBookDate(response.data.bookDate);
    //   } catch (error) {
    //     console.log(error.message);
    //   }
    // }
    // getBookDate();
    // },[]);
    console.log("bookEdit", book);
  return (
    <div>

      <div className='flex justify-between sticky xl:w-[126.79%] top-0 p-4 pl-14 
      -ml-[4.4rem] -mt-7 shadow-md'>
      <BookEditingOptions 
       bookid={book.bookid}
      />
      <CloseButton
      url={"/books/additem"}
      />
      </div>

      <div className='-ml-14'>
      <BookResult 
      book={book}
      collection={collection}
      titleCss={"!text-4xl"}
      authorCss={"!text-2xl"}
      descCss={"!text-[1rem]"}
      />
      </div>
      
    </div>
  )
}

export default BookEdit