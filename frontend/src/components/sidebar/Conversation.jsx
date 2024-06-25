import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation"


const Conversation = ({conversation, emoji, lastIdx}) => {
   // console.log("conver: ", conversation);

  const {selectedConversation, setSelectedConversation} =  useConversation();

  const isSelected = selectedConversation?._id === conversation._id;

  const {onlineUsers} = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);


  return (
    <>
        <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
            ${isSelected ? "bg-sky-500" : ""}
         `}
          onClick={() => setSelectedConversation(conversation)}  
            >
            {/* class online/offline indicates that whether the user is online or offline , we will change these based on the user if he/she if is online or offline*/}
            {/* these classes are built classes in daisy ui */}
            <div className={`avatar ${isOnline ? "online": ""}`}>
                <div className="w-12 rounde-full">
                    <img 
                    src={conversation.profilePic} 
                    alt="user avatar" 
                    />
                </div>
            </div>

            <div className="flex flex-col flex-1">
                <div className="flex gap-3 justify-between">
                    <p className="font-bold text-gray-200">{conversation.fullname}</p>
                    <span className="text-xl">{emoji}</span>
                </div>
            </div>
        </div>
       
       {!lastIdx && <di className="divider my-0 py-0 h-1"/>}
    </>
  )
}

export default Conversation