
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";


export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params; // receiver id
        const senderId = req.user._id; // go through message.route.js, protectRoute.js, and generateToken.js file

        // Ensure receiverId is converted to ObjectId
       // const receiverObjectId = new mongoose.Types.ObjectId(receiverId);

        // Find the conversation with both participants
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        // If the conversation does not exist, create a new one
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        // Create and save the new message
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        if (newMessage){
            // Add the message to the conversation's messages array
            conversation.messages.push(newMessage._id);
        }

        //SOCKET IO functionality

        //this will take a time to save those promises as one will wait for completion of another
        // await conversation.save();
        // await newMessage.save();

        //so use this to save them at once i.e run in parallel
        await Promise.all([conversation.save(), newMessage.save()]);

        res.status(200).json(newMessage);
        
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({
            error: "Internal server error!"
        });
    }
};


export const getMessages = async (req, res) => {
  try {
    
    //id of user we are chatting with
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;


    //conversation collection contains array of participants and array of message id's
    //and based on the participants and messages(via message id's) we find all messages from 'message' collection based on the message id's from 'conversation' collection
    //go through conversation.model and message.model.js file
    //we populate the messages using populate() function which returns documents i.e messages from 'message' collection
    const conversation = await Conversation.findOne({
        participants: {
            $all: [ senderId, userToChatId ]
        }
    }).populate("messages");//here messages is the array of id's in Conversation model(collection)


    if(!conversation){
        return res.status(200).json([]);
    }

    const messages = conversation.messages;

    res.status(200).json(messages);


  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({
        error: "Internal server error!"
    });
  }
}


