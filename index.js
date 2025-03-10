import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectdb from './db/connectMongo.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';

const port = process.env.PORT || 4000;
dotenv.config();
const allowedOrigins = ["http://localhost:5173", "http://localhost:3000", "https://blog-app-seven-silk.vercel.app", "https://blog-app-seven-silk.vercel.app/"];
const app=express();
app.use(cors({
    origin: (origin, callback) => {
        console.log('Request origin:', origin); // Debug log
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log('Origin not allowed:', origin); // Debug log
            callback(new Error(`Not allowed by CORS: ${origin}`));
        }
    },
    credentials:true,
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