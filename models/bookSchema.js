const { default: mongoose, model } = require("mongoose");





const bookSchema = new mongoose.Schema({
    userId: {
        
    }
    title:{
        type: String,
        required: [true, "Provide a title"]
    },
    author:{
        type: String,
        required: [true, "Provide an author"]
    },
    publishedDate:{
        type: Date,
        required: [true, "Provide a published Date"]
    },
    pages:{
        type: Number,
        required: [true, "Provide pages number"]
    },
    publisher:{
        type: String,
        required: [true, "Provide publisher name"]
    },
    isbn13:{
        type: Number,
        required: [true, "Provide an ISBN13"]
    },
    isbn10:{
        type: Number,
        required: [true, "Provide an ISBN10"]
    },
    addedDate:{
        type: Date,
        required: [true, "provide added date"]
    },
    description:{
        type: String,
        required: [true, "Provide book description"]
    }

});

const Book = mongoose.models.Book || mongoose.model("Book",bookSchema);

export default Book;