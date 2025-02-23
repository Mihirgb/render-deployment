import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectdb from './db/connectMongo.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';

const port = process.env.PORT || 4000;
dotenv.config();
const allowedOrigins = ["http://localhost:5173", "https://blog-app-seven-silk.vercel.app/"];
const app=express();
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, origin); // Reflect origin dynamically
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials:true,
    allowedHeaders: "Content-Type, Authorization"
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())//middleware for parsing cookies

//routes
app.use('/user',userRoutes);

app.get('/',(req,res)=>{
    res.send('Basic Backend')
})
app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
    connectdb();
})