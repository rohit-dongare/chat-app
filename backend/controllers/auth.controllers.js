import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";


//firstly we have checked those post methods using Postman then created UI on website
export const signup = async (req, res) => {
    try {
        const {fullname, username, password, confirmPassword, gender} = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({
                error: "Passwords don't match!"
            });
        }

        const user = await User.findOne({username});//if user with same username already exists

        if (user){
            return res.status(400).json({
                error: "Username already exists!"
            })
        }

        //Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //avatar api:- https://avatar-placeholder.iran.liara.run/

        //below api's will provide unique avatars for each user based on male or female name
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        //creating user
        const newUser = await User({
            fullname,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === 'male' ? boyProfilePic : girlProfilePic
        });

        
        if (newUser){

            //generate JWT token here
            //take help of generateToken.js file where we create token and cookies for user
            generateTokenAndSetCookie(newUser._id, res);

            await newUser.save();//saving the user to database
    
            //sending response back to the user 
            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                profilePic: newUser.profilePic
            })//successfully created user
        } else {
            res.status(400).json({
                error: "Invalid user data"
            });
        }


    } catch (error) {
        console.log("Error in signup controller: ", error.messsage);
        res.status(500).json({
            error: "Internal Server Error!"
        })
    }
}


export const login = async (req, res) => {
    // res.send("login user");
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({
                error: "Invalid username or password"
            });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            profilePic: user.profilePic
        });


    } catch (error) {
        console.log("Error in login controller: ", error.messsage);
        res.status(500).json({
            error: "Internal Server Error!"
        });
    }
}


export const logout = async (req, res) => {
    try {

        res.cookie("jwt", "", { maxage:0 });//go through generateToken.js file, here we delete the cookie of the user so we pass empty string as a payload instead of user id to delete the session
        res.status(200).json({
            message: "Logged out successfully"
        });

    } catch (error) {
        console.log("Error in logout controller: ", error.messsage);
        res.status(500).json({
            error: "Internal Server Error!"
        });
    }
}