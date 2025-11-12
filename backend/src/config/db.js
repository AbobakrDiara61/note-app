import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database Connected Successfully");
    } catch(error) {
        console.log("Error In Connecting To Mongoose DB Method", error);
    }
}

export default connectDB