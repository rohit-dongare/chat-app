import useGetMessages from "../../hooks/useGetMessages";
import Message from "./Message";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import { useEffect } from "react";
import { useRef } from "react";

const Messages = () => {

 const {messages, loading} = useGetMessages();
 //console.log("Messages:",messages);
 const lastMessageRef = useRef();//this is used for when you send message , you don't have to scroll to see that last message you sent
 //it will scroll automatically using useRef()

 useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
 }, [messages]);

  return (
    // overflow auto is used for scrolling i.e if there are too much messages then scrolling will start
    <div className='px-4 flex-1 overflow-auto'>

        {!loading && messages.length > 0 && (
          messages.map((message) => (
            <div
            key={message._id}
            ref={lastMessageRef}
            >
              <Message 
               message={message}
              />
            </div>
          ))
        )}
      
        {loading && 
        // we are calling MessageSkeleton 3 times
        [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} /> )
        }

        {!loading && messages.length === 0 && (
          <p className="text-center">Send a message to start the conversation</p>
        )}
    </div>
  )
}

export default Messages;


//STARTER CODE
// import Message from "./Message"

// const Messages = () => {
//   return (
//     // overflow auto is used for scrolling i.e if there are too much messages then scrolling will start
//     <div className='px-4 flex-1 overflow-auto'>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//     </div>
//   )
// }

// export default Messages