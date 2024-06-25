//for getting instant messages without need of refreshing the page when new message is arrived
//go through socket.js and message.controller.js in backend folder
//this custom hook is being called in Messages.jsx in order to listen to every incoming message

import { useEffect } from 'react';
import {useSocketContext} from '../context/SocketContext';
import useConversation from '../zustand/useConversation';
import notificationSound from '../assets/sounds/notification.mp3'

const useListenMessages = () => {
    const {socket} = useSocketContext();
    const {messages, setMessages} = useConversation();

    useEffect(() => {
        //the event newMessage is also listend on backend side
        //go through socket.js and message.controller.js file in backend
        socket?.on('newMessage', (newMessage) => {

            newMessage.shouldShake = true;//it is used in Message.jsx for incoming message we add animation for that message based on this property
            //also go through index.css file for animation code

            //there will be notification sound when there is new message
            const sound = new Audio(notificationSound);
            sound.play();

            setMessages([...messages, newMessage]);
        });

        //if you don't clean up the socket then you will hear notification sound multiple times when recieve message
        //it will be multiplied by number of listeners that you have
        //so clean it up and you don't have to listen to event more than once
        return () => {
            socket?.off('newMessage')
        }
    }, [socket, setMessages, messages]);
} 

export default useListenMessages;