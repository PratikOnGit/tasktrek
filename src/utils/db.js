import mongoose from "mongoose";

const dbConnection = async () => {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("Connected to MongoDB🔥");
    } catch (e) {
      console.log("Error connecting to MongoDB❌");
    }
  } else {
    console.log("Already Connected 🪄");
  }
};

export default dbConnection;
