import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB);
        console.log(`successfully connected to db ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error connecting to db ${error}`);
    }
}

export default connectDB;