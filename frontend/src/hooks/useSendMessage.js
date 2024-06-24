
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';
import { useState } from 'react';

//used in MessageInput.jsx file
const useSendMessage = () => {

    const [loading, setLoading] = useState(false);

    //go through Conversation.jsx where we changed the state of selectedConversation based on the click of profile sidebar
    const {messages, setMessages, selectedConversation} = useConversation();

    const sendMessage = async (message) => {

        setLoading(true);
        try {
            const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({message})
            });

            const data = await res.json();

            if(data.error){
                throw new Error(data.error);
            }

            setMessages([...messages, data]);

        } catch (error) {
            toast.error(error.message);
        } finally{
            setLoading(false);
        }

    }

    return {sendMessage, loading}
}

export default useSendMessage;