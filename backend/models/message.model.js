import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",//this indicates that the senderId will be coming from "User" model(collection)
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",//this indicates that the senderId will be coming from "User" model(collection)
        required: true
    },
    message: {
        type: String,
        required: true
    }

    //when we create a message it will have createdAt and updatedAt fields due the below timestamp
    //we can show the time when the message was created on chat app using message.createdAt 
}, {timestamps: true});


const Message = mongoose.model("Message", messageSchema); 

export default Message;