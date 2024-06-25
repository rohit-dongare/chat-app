import React from 'react'
import { useAuthContext } from '../../context/AuthContext';
import useConversation from '../../zustand/useConversation';
import { extractTime } from '../../utils/extractTime';

const Message = ({ message }) => {

    const {authUser} = useAuthContext();//this is useful for knowing if the authenticated user is sending the message or the receiver
    const {selectedConversation} = useConversation();

    const fromMe = message.senderId === authUser._id;
    //console.log(fromMe);    
    const chatClassName = fromMe ? 'chat chat-end' : 'chat chat-start';
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
    const bubbleBgColor = fromMe ? 'bg-blue-500' : "";

    //go through useListenMessage.js hook
    //also go through index.css file
    const shakeClass = message.shouldShake ? "shake" : "";

    const formattedTime = extractTime(message.createdAt);

  return (
    // chat-start or chat-end are for sender and receiver , these are built classes from daisy ui
    //we will interchange those classes based on sender and receiver
    <div className={`chat ${chatClassName}`}>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                <img 
                src={profilePic}
                alt="Tailwind CSS chat bubble component" />
            </div>
        </div>

        <div 
        className={`chat-bubble pb-2 
           ${shakeClass} text-white ${bubbleBgColor}`}
        >
            {message.message}
        </div>

        <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>
            {formattedTime}
        </div>
    </div>
  )
}

export default Message;


//STARTER CODE
// const Message = () => {
//     return (
//       // chat-start or chat-end are for sender and receiver , these are built classes from daisy ui
//       //we will interchange those classes based on sender and receiver
//       <div className='chat chat-end'>
//           <div className='chat-image avatar'>
//               <div className='w-10 rounded-full'>
//                   <img 
//                   src="https://avatar.iran.liara.run/public/boy?username=Rohit" 
//                   alt="Tailwind CSS chat bubble component" />
//               </div>
//           </div>
  
//           <div className={`chat-bubble text-white bg-blue-500`}>
//               Hi, what is upp?
//           </div>
  
//           <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>
//               12:42
//           </div>
//       </div>
//     )
//   }
  
//   export default Message