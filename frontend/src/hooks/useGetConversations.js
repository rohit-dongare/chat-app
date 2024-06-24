import { useEffect, useState } from "react"
import toast from "react-hot-toast";

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const getConversations = async () => {

            setLoading(true);

            try {
                const res = await fetch('/api/users');//this is a get request so don't have to provide the options like methods
                const data = await res.json();

                if(data.error){
                    throw new Error(data.error);
                }

                console.log(data);

                setConversations(data);

            } catch (error) {
                toast.error(error.message);
            } finally{
                setLoading(false);
            }
        }

        getConversations();//calling the function everytime page gets reloaded

    } ,[]);

    return { loading, conversations }
}

export default useGetConversations;