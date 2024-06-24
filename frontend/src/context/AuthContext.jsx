import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();


//in order to use values i.e authUser, setAuthUser we use this below custom hook i.e useAuthContext
//also go through useSignup.js and SignUp.jsx , app.jsx file
export const useAuthContext = () => {
    return useContext(AuthContext);
}

//the whole app is wrapped inside this AuthContextProvider in main.jsx file 
export const AuthContextProvider = ({ children }) => {

    //we will set the local storage in useSignup.js file first and then get the items from local storage
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null)

    return <AuthContext.Provider value={{authUser, setAuthUser}}>
            {children}
           </AuthContext.Provider>
}