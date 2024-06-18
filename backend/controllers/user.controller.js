
import User from "../models/user.model.js";

export const getUsersForSidebar = async () => {
    try {

        const  loggedInUserId = req.user._id;//go through protectRoute.js file

        //fetch info of users excluding their passwords
        const filteredUsers = await User.find({
            _id: { $ne: loggedInUserId }
        }).select("-password");//this means find all users with id's not equal to loggedInuserId 
        //i.e find all users except the user itself i.e the sender because we don't want to see our profile in the sidebar chat and don't want to chat to ourselves
        //ne = not equal to, every user except currently authenticated user
        //if you even want to chat yourself then just write query as await User.find();

        res.status(200).json(filteredUsers);

    } catch (error) {
        console.log("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({
            error: "Internal server error!"
        })
    }
}