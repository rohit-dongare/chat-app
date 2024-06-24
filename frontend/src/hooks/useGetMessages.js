import { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';

//this hook is used in Messages.jsx
const useGetMessages = () => {
  
    const [loading, setLoading] = useState(false);
    const {messages, setMessages, selectedConversation} = useConversation();

    useEffect(() => {

        const getMessages = async () => {
            setLoading(true);

            try {
                const res = await fetch(`api/messages/${selectedConversation._id}`);

                const data = await res.json();

                if (data.error){
                    throw new Error(data.error);
                }

                setMessages(data);

            } catch (error) {
                toast.error(error.message);
            } finally{
                setLoading(false);
            }
        }

        if(selectedConversation?._id){
            //this getMessages() will only be called when one of the profile has been clicked
            //and based on that clicked sidebar profile we change the state in Conversation.jsx 
            //i.e we store the conversation data of that profile user in the state
            
            getMessages();
        }

    }, [selectedConversation?._id, setMessages]);

    //conversation can be changed based on which profile has been clicked
    //so based on that conversation id will change and so the useEffect

   return {messages, loading}
}

export default useGetMessages