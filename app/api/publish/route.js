import { connectDB } from "@/dbConfig/database";
import { GetDataFromToken } from "@/helpers/getDataFromToken";
import Collection from "@/models/collectionSchema";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
    try {
        await connectDB();

        const { selectedCollections, remainingCollections, publishCollectionsTitle } = await req.json();

     // Set the 'public' flag to true for selected collections
        if (selectedCollections && selectedCollections.length > 0) {
            await Collection.updateMany(
                { _id: { $in: selectedCollections } }, // selectedCollections should be an array of ObjectIDs
                { $set: { public: true } }
            );
        }

        // Set the 'public' flag to false for remaining collections
        if (remainingCollections && remainingCollections.length > 0) {
            await Collection.updateMany(
                { _id: { $in: remainingCollections } }, // remainingCollections should be an array of ObjectIDs
                { $set: { public: false } }
            );
        }


        const baseUrl = process.env.BASE_URL;
        const publicUrls = selectedCollections.map(id => `${baseUrl}/books/collections/${id}`);

        // now save the user Publish Collection Title in the user Model
        const userId = GetDataFromToken(req);
        const user = await User.findById(userId);
        user.publishCollectionsTitle = publishCollectionsTitle;
        await user.save();


        return NextResponse.json({
            message: "Collections updated",
            success: true,
            publicUrls
        });

    } catch (error) {
        console.log("error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
