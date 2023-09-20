import mongoose from "mongoose";

let isConnected;

export async function connectDB() {
    // Enable strictQuery option
    // mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log("Using existing database connection");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: "bookipedia",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the application
    }
}
