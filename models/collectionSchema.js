import mongoose, { Schema } from "mongoose";

const CollectionSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",

        required: true
    },
    name:{
        type: String,
        requeired: true // Makes the 'name' field mandatory
    },
});

// 'Collection' is the name of the model. It'll appear as 'collections' in the MongoDB database
const Collection = mongoose.models.Collection || 
mongoose.model('Collection',CollectionSchema);

export default Collection;