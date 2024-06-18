import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';

import connectToMongoDB from './db/connectToMongoDB.js';

const app = express();
const PORT = process.env.PORT || 8000;

dotenv.config();//without this we won't be able to access the environment variabls from .env file 
//even if we use process.env

app.use(express.json());//to parse the incoming request with JSON payload (from req.body)
app.use(cookieParser());//useful for req.cookies.jwt in protectRoutes.js file

app.use("/api/auth", authRoutes);//signup,login,logout
app.use("/api/messages", messageRoutes);//get messages and send messages
app.use("/api/users", userRoutes);//get users for sidebar

// app.get("/", (req, res) => {
//     //root route http://localhost:5000/
//     res.send("hello world!!!");
// });


app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`)
});