import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://mkrfb66:QiHjXvHs5c5m6yH5@cluster0.vdtbzhy.mongodb.net/appDataBase?retryWrites=true&w=majority");
    console.log("Success: Connected to MongoDB");
  } catch (err) {
    console.log("Failure: Unconnected to MongoDB");
    throw new Error();
  }
};

export default connectDB;
