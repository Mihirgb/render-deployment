import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectdb from './db/connectMongo.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';

const port = process.env.PORT || 4000;
dotenv.config();

const app=express();
app.use(cors());
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