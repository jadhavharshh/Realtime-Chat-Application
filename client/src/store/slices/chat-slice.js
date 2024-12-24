// Desc: Chat slice for storing selected chat type and data
export const chatSlice = (set,get ) => ({
    selectedChatType : undefined,
    selectedChatData : undefined,
    setSelectedChatType : (selectedChatType) => set({selectedChatType}),
    setSelectedChatData : (selectedChatData) => set({selectedChatData}),
})