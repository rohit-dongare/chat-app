import { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }) => {
    
    //socket connection
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const {authUser} = useAuthContext();

    useEffect(() => {
        if(authUser) {
            //here we check if there is authenticated user so we create socket io creation
            //below user id is used in backend in socket.js file for checking if he/she is online or not
            //while developing the project the url of the backend was : http://localhost:5000
            //but after deployment it the url of the website is: 
            const socket = io("https://chat-app-prod-m1j9.onrender.com", {
                query: {
                    userId: authUser._id
                }
            });

            //create connection
            setSocket(socket);
            //once we connected we would like to see who is online and who is not
            //getOnlineUsers is the event we have written on backend in socket.js file
            //it will be triggred when the socket connection is created
            //and this event will return users who are online as a callback function
            //socket.on() is used to listen to the events . can be used both on client and server side
            //as you can see we have used the same event on frontend and backend using socket.io
            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            })

            //for performance purpose 
            //below cleanp function will close the socket connection when the component is unmounted i.e no longer in use in browser
            //i guess we have used similar clean up the function in MessageContainer.jsx file too
            return () => socket.close();
        } else{
            //if no such authenticated user then close the socket connection
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return (
        <SocketContext.Provider value={{socket, onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}