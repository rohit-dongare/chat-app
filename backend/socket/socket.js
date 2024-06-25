import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        //below is the address of frontend application where we are going to send and receive message
        //between sender and receiver
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"]
    }
});


//for getting instant messages without need of refreshing the page
//also go through message.controller.js
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
}

//below how we check if the user is online or not
const userSocketMap = {}; //{userId: socketId}

//below how we see for connections in socket io
//here below socket is the user who is connected
//this socket is has id and other properties
io.on('connection', (socket) => {
  console.log("a user connected ", socket.id);

  const userId = socket.handshake.query.userId;//this userId is send from frontend, go through SocketContext.jsx file in frontend

  
  if(userId != "undefined") {
      userSocketMap[userId] = socket.id;
  }

    // io.emit() is used to send events to all the connected clients
   //we can add events because we set userId with socket id
   //you can give any name to the event, so once the user is connect, it will immediately send this event
   //to check who is online and who is offline
   //we will use the below event name(getOnlineUsers) on frontend to check the online/offline status of people on frontend
    io.emit('getOnlineUsers', Object.keys(userSocketMap));

  //socket.on() is used to listen to the events . can be used both on client and server side
  //we are going to use socket.on on frontend
  socket.on("disconnect", () => {
    console.log("user disconnected ", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  })
});

export { app , io, server};