import mongoose, { Schema } from "mongoose";

const CollectionSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",

        required: true
    },
    name:{
        type: String,
        required: true // Makes the 'name' field mandatory
    },
    public: {
        type: Boolean,
        default: false // collections are private by default
    },
});

// 'Collection' is the name of the model. It'll appear as 'collections' in the MongoDB database
const Collection = mongoose.models.Collection || 
mongoose.model('Collection',CollectionSchema);

export default Collection;