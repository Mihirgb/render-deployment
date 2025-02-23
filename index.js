import express from 'express';
import cors from 'cors';
const port = process.env.PORT || 4000;

const app=express();
app.use(cors());
app.use(express.json());
app.get('/',(req,res)=>{
    res.send('Basic Backend')
})
app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})