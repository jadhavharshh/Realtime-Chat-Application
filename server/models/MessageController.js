import Message from "./MessageModels.js"

export const getMessages = async (request, response, next) => {
    try {
        const user1 = request.userId;
        const user2 = request.body.id;

        console.log("User1 ID:", user1);
        console.log("User2 ID:", user2);

        if(!user1 || !user2) {
            return response.status(400).send("Both User ID is required!");
        }

        const messages = await Message.find({
            $or:[
                {sender: user1, recipient: user2},
                {sender: user2, recipient: user1},
            ],
        }).sort({timestamp:1});

        console.log("Retrieved Messages:", messages);

        return response.status(200).json({messages});
    } catch (error) {
        console.log({ error });
        return response.status(500).send("Internal Server Error!");
    }
};