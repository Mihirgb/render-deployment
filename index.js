import express from 'express';
const port = process.env.PORT || 4000;

const app=express();
app.get('/',(req,res)=>{
    res.send('Basic Backend')
})
app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})