import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import postrouter from './routes/posts.js'
import AuthRouter from './routes/AuthRouter.js'
const app=express();
app.use(cors());

app.use(express.json({ limit:"30mb",extended:"true"}));
app.use(express.urlencoded({ limit:"30mb",extended:"true"}));
app.use('/posts',postrouter);
const CONNECTION_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 5000;
app.use((req, res, next) => {
  console.log("REQ:", req.method, req.url);
  next();
});
app.use('/auth',AuthRouter);
mongoose.connect(CONNECTION_URL).then(()=>app.listen(PORT,()=>console.log(`Server running on port: ${PORT}`)))
.catch((error)=>console.log(error.message));

// mongoose.set('useFindAndModify',false);