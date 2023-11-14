// Sorting function
export const sortBooks = (booksArray, sortBy, order) => {
    return booksArray.sort((a, b) => {
      let valueA, valueB;

      switch (sortBy) {
        case "1":
          valueA = a.title.toLowerCase();
          valueB = b.title.toLowerCase();
          break;
        case "2":
          valueA = a.author.toLowerCase(); // Assuming 'author' represents the creator
          valueB = b.author.toLowerCase();
          break;
        case "3":
          valueA = new Date(a.addedDate); // Assuming 'added' is the date the book was added
          valueB = new Date(b.addedDate);
          break;
        case "4":
          valueA = new Date(a.publishedDate); // Assuming 'published' is the publication date
          valueB = new Date(b.publishedDate);
          break;
        case "5":
          valueA = a.rating || 0; // Assuming 'rating' is a numeric value
          valueB = b.rating || 0;
          break;
        default:
          return 0;
      }
      if(sortBy==="3" || sortBy==="4" || sortBy==="5" ){
        if (order === 'down') {
          return valueA - valueB; // For ascending order
      } else {
          return valueB - valueA; // For descending order
      }
      }
      else{
      if (order === 'up') {
        return valueA < valueB ? -1 : 1; // For ascending order
      } else {
        return valueA > valueB ? -1 : 1; // For descending order
      }
      }
    });
  };

