import {create} from 'zustand';

//zustand is used for state management just like context api
const useConversation = create((set) => (
  {
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    messages:[],
    setMessages: (messages) => set({ messages }),
  }

)); 

export default useConversation;