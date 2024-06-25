import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path'

import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';

import connectToMongoDB from './db/connectToMongoDB.js';
import { app, server } from './socket/socket.js'

// const app = express(); //we create a server over the expres server i.e socket server
//we created the express app in socket.js file which is then exported here in this file
//go through socket.js 
const PORT = process.env.PORT || 8000;

const __dirname = path.resolve();//this is for joining backend with frontend

dotenv.config();//without this we won't be able to access the environment variabls from .env file 
//even if we use process.env

app.use(express.json());//to parse the incoming request with JSON payload (from req.body)
app.use(cookieParser());//useful for req.cookies.jwt in protectRoutes.js file

app.use("/api/auth", authRoutes);//signup,login,logout
app.use("/api/messages", messageRoutes);//get messages and send messages
app.use("/api/users", userRoutes);//get users for sidebar


//this is for serving static files such as css, js, sounds files, images
//__dirname will lead you to root directory of this project , then /frontend/dist folders
app.use(express.static(path.join(__dirname, '/frontend/dist')));//dist folder is what we share on github or on any platform for hosting purpose

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});//with this we are able to run our frontend application from server as well

// app.get("/", (req, res) => {
//     //root route http://localhost:5000/
//     res.send("hello world!!!");
// });

//before socket io server has been created
// app.listen(PORT, () => {
//     connectToMongoDB();
//     console.log(`Server Running on port ${PORT}`)
// });


//after socket.io server is created
server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`);
});