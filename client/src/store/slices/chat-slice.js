// Desc: Chat slice for storing selected chat type and data
export const chatSlice = (set,get ) => ({
    selectedChatType : undefined,
    selectedChatData : undefined,
    selectedChatMessages : [],
    setSelectedChatType : (selectedChatType) => set({selectedChatType}),
    setSelectedChatData : (selectedChatData) => set({selectedChatData}),
    setSelectedChatMessages : (selectedChatMessages) => set({selectedChatMessages}),
    closeChat:() => set({selectedChatType:undefined,selectedChatData:undefined, selectedChatMessages:[]}),
})