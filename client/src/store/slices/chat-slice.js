// Desc: Chat slice for storing selected chat type and data
export const chatSlice = (set,get ) => ({
    selectedChatType : undefined,
    selectedChatData : undefined,
    selectedChatMessages : [],
    directMessagesContacts : [],

    // Uploading and downloading files
    isUploading : false,
    isDownloading : false,
    fileUploadProgress : 0,
    fileDownloadProgress: 0,
    setIsUploading : (isUploading) => set({isUploading}),
    setIsDownloading : (isDownloading) => set({isDownloading}),
    setFileUploadProgress : (fileUploadProgress) => set({fileUploadProgress}),
    setFileDownloadProgress : (fileDownloadProgress) => set({fileDownloadProgress}),

    // Chat slice functions
    setSelectedChatType : (selectedChatType) => set({selectedChatType}),
    setSelectedChatData : (selectedChatData) => set({selectedChatData}),
    setSelectedChatMessages : (selectedChatMessages) => set({selectedChatMessages}),

    setDirectMessagesContacts : (directMessagesContacts) => set({directMessagesContacts}),

    closeChat:() => set({selectedChatType:undefined,selectedChatData:undefined, selectedChatMessages:[]}),
    addMessage:(message) => { 
        const selectedChatMessages = get().selectedChatMessages;
        const selectedChatType = get().selectedChatType;

        set({
            selectedChatMessages:[
                ...selectedChatMessages,{
                    ...message,
                    recipient: selectedChatType === "channel" 
                    ? message.recipient
                    : message.recipient._id,

                sender:
                    selectedChatType === "channel"
                    ? message.sender
                    : message.sender._id
                },
            ],
        });
    },
});