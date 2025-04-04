import mongoose from "mongoose";

const Connection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {useUnifiedTopology: true});
        console.log('database connsction successfully');
    } catch (error) {
        console.log('Error connection with database', error.message);
    }
}

export default Connection;