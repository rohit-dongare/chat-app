import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

//this middleware used in message.controller.js file as a middleware before sending message to check if the user is authorized
const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;//get the current users cookies

        if (!token){
            return res.status(401).json({
                error: "Unauthorized - No Token Provided"
            });// 401-status code for unauthorization
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded){
            return res.status(401).json({
                error: "Unauthorized - Invalid Token"
            });
        }

        //below we retrieve user data except the password
        const user = await User.findById(decoded.userId).select("-password");//go through generateToken.js file
        //there you will find how we created a token and cookie and in order to do that we have passed the userId
        //now using that id we find that user from database

        if(!user){
            return res.status(404).json({
                error: "User not found"
            });
        }

        req.user = user;//this is the current authenticated user

        next();//this will execute the sendMessage() method from message.controller.js file
        //which is called from message.routes.js file

        //you won't get the cookies so easily so also go through server.js file
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
      res.status(500).json({
        error: "internal server error"
      })   
    }
}


export default protectRoute;