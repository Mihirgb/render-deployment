import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectdb from './db/connectMongo.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';

const port = process.env.PORT || 4000;
dotenv.config();
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://blog-app-seven-silk.vercel.app"  // Remove trailing slash
];

const app=express();
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`Not allowed by CORS: ${origin}`));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['Set-Cookie'],
    preflightContinue: true,
    optionsSuccessStatus: 200
}));

// Add headers middleware
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cookie');
    next();
});

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