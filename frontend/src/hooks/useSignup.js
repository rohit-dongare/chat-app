import { useState } from "react"
import { toast } from 'react-hot-toast';
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);

  const { setAuthUser } = useAuthContext();

  const signup = async({
    fullname,
    username,
    password,
    confirmPassword,
    gender
  }) => {

    const success =  handleInputErrors({fullname,username,password,confirmPassword,gender});

    if(!success){
        return;
    }

    setLoading(true);
    try {
        //go through backend folder
        //bydefault fetch works for get method and if it is other than get method
        //e.g. POST method in this case then we have to add some headers 
        //actually the url for backend requesting to signup is http://localhost:5000/api/auth/signup but http://localhost:5000 is added in vite.config.js, go through vite.config.js file
        const res = await fetch('/api/auth/signup', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ fullname, username, password, confirmPassword, gender })
        });

        const data = await res.json();

        //in backend folder go through auth.controller.js file where we sent back error in json format
        //if the error occurs
        if(data.error){
            throw new Error(data.error);
            //this will catch by catch() 
        }

        //save the user at local storage because if you don't you won't know if the user is logged in or not after refresh
        //using context api to know if the user is logged in or not
        //and using context value we will navigate the user to the home page after sign up i.e creating account
        localStorage.setItem("chat-user", JSON.stringify(data));
        setAuthUser(data);

    } catch(error){
        toast.error(error.message);
    } finally{
        setLoading(false);
    }

  };


  return { loading, signup }

}

export default useSignup

function handleInputErrors({fullname,username,password,confirmPassword,gender}){

    //we are checking the errors both on server side and front end side
    if(!fullname || !username || !password || !confirmPassword || !gender){
        toast.error('Please fill in all fields');
        return false;
    }

    if(password !== confirmPassword){
        toast.error('Passwords do not match');
        return false;
    }

    if(password.length < 6){
        toast.error("Password must be at least 6 characters");
        return false;
    }

    return true;
}