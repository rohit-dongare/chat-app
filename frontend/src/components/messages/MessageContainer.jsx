import Messages from "./Messages"
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";
import useConversation from '../../zustand/useConversation';
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {

 const {selectedConversation, setSelectedConversation} = useConversation();//we change the state globally based on profile has been clicked
  //go through Conversation.jsx and useConversation.js file
  //when one of the conversation has been clicked we store the conversation of that user in selectedConversation globally in Conversation.jsx file

  useEffect(() => {
    //cleanup function (unmounts)
    //when this component is no longer in the browser we unmount the state
    //i.e. we make the state as it was
    //e.g when user logged out then he/she can't visit the component due to unauthorization
    //so at that time this MessageContainer.jsx component is no longer in the browser that's why we cleanup the state and bring it to it's default state
    //otherwise when you log out and again log in you will see you will be seing the chat of the person you last visited
    //because we didn't cleaup up the state after log out
      return () => setSelectedConversation(null);
  }, []);

  return (
    <div className='md:min-w-[450px] flex flex-col'>
        { !selectedConversation ? <NoChatSelected/> : (
          <>
            {/* Header */}
            <div className='bg-slate-500 px-4 py-2 mb-2'>
                <span className='label-text'>To:</span>{" "}
                <span className='text-gray-900 font-bold'>{selectedConversation.fullname}</span>
            </div>

            {/* Messages  */}
            <Messages/>

            {/* Input field to enter message */}
            <MessageInput/>      
          </>
          )
        }
    </div>
  )
}

export default MessageContainer;


const NoChatSelected = () => {

  const {authUser} = useAuthContext();

  return (
    <div className="flex items-center justify-center w-full h-full">

        <div className="px-4 text-center sm:text-lg 
        md:text-xl text-gray-200 font-semibold 
        flex flex-col items-center gap-2">
            <p>Welcome 👏 {authUser.fullname} ✨</p>
            <p>Select a chat to start messaging</p>
            <TiMessages className="text-3xl md:text-6xl text-center"/>
        </div>

    </div>
  )
}

//STARTER CODE
// const MessageContainer = () => {
//     return (
//       <div className='md:min-w-[450px] flex flex-col'>
//           <>
//               {/* Header */}
//               <div className='bg-slate-500 px-4 py-2 mb-2'>
//                   <span className='label-text'>To:</span>{" "}
//                   <span className='text-gray-900 font-bold'>John doe</span>
//               </div>
  
//               <Messages/>
//               <MessageInput/>      
//           </>
//       </div>
//     )
//   }
  
//   export default MessageContainer;