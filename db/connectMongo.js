import mongoose from 'mongoose'
const connectdb =async()=>{
    try {
        const connect =mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected`)
    } catch (error) {
        console.log(`Error: ${error.message}`)
    }
}
export default connectdb;