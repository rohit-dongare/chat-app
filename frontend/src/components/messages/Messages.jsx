import Message from "./Message"

const Messages = () => {
  return (
    // overflow auto is used for scrolling i.e if there are too much messages then scrolling will start
    <div className='px-4 flex-1 overflow-auto'>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
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