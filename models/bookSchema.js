const { default: mongoose, model, Schema } = require("mongoose");





const bookSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",

        required: true
    },
    // add collection id
    collectionId: {
        type: Schema.Types.ObjectId,
        ref:"Collection"
    },
    bookid: {
        type: String,
        required: [true, "provide a book id"],
        
    },
    title:{
        type: String,
        required: [true, "Provide a title"]
    },
    author:{
        type: String,
        
    },
    publishedDate:{
        type: Number,
       
    },
    pages:{
        type: Number,
        
    },
    publisher:{
        type: String,
       
    },
    isbn13:{
        type: Number,
        
    },
    isbn10:{
        type: Number,
        // required: [true, "Provide an ISBN10"]
    },
    addedDate:{
        type: Date,
        // required: [true, "provide added date"]
    },
    description:{
        type: String,
        // required: [true, "Provide book description"]
    },
    image:{
        type: String
    },
    copies:{
        type: Number
    },
    price:{
        type: Number
    },
    rating:{
        type: Number
    },
    review:{
        type: String
    }
   

});

const Book = mongoose.models.Book || mongoose.model("Book",bookSchema);

export default Book;