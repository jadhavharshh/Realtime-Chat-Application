import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors'; 
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';


// Load environment variables from .env file
dotenv.config(); 

//Define the App
const app = express();
const port =  process.env.Port || 3000;
const databaseURL = process.env.database_URL;


const server = app.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}`);
})