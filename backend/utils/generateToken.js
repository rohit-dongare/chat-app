import jwt from 'jsonwebtoken';


//below functiion is used in auth.controllers.js file
const generateTokenAndSetCookie = (userId, res) => {
    //later with the help this userId we check if the user is authorized to send the messages or not
    //also go through protectRoute.js file
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15d'
    });//this creates a token for the user

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,//Millisecond
        httpOnly: true, //prevent XSS attacks cross-site scripting attacks i.e cookie can't be accessible vai javascript
        sameSite: "strict", //CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development" //during the development i.e on localhost secure field is false and we will make it to true during the deployment i.e production level by changing the environment variable
    });
};

export default generateTokenAndSetCookie;