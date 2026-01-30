import mongoose from "mongoose";
 
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECT_STRING as string);
    console.log("connected");
  } catch (error) {
    console.error("error", error);
  }
};
export default connectToMongoDB;
 