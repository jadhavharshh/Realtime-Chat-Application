import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors'; 
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import authRoutes from './routes/AuthRoutes.js';


// Load environment variables from .env file
dotenv.config(); 

//Define the App
const app = express();
const port =  process.env.Port || 3000;
const databaseURL = process.env.database_URL;

//Middleware to Communicate between different
app.use(cors({
    origin : [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials : true,
}));

// Used for getting the cookies from the frontend
app.use(cookieParser());

// Body Parser
app.use(express.json());

app.use("/api/auth", authRoutes)

// Routes
const server = app.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}`);
})

// Database Connection
mongoose.connect(databaseURL).then(()=>{
    console.log('DB Connection Successful!');
})