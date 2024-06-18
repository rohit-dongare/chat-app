import express from "express";
import { sendMessage, getMessages } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

//get messages between two users
//below id is the id of the receiver
router.get("/:id", protectRoute, getMessages);

//below id is the id of receiver, senders id is provided in protectRoutes.js file
router.post("/send/:id", protectRoute, sendMessage);//we protect the route before sending message
//kind of authorization i.e if you are login then can send message


export default router;
