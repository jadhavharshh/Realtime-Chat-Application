import {
Tooltip,
TooltipContent,
TooltipProvider,
TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaPlus } from "react-icons/fa";
import { useState , useEffect} from "react";
import {
Dialog,
DialogContent,
DialogDescription,
DialogHeader,
DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Lottie from "react-lottie";
import { animationDefaultOptions, getColor } from "@/lib/utils";
import { apiClient } from "@/lib/api-client";
import { CREATE_CHANNEL_ROUTE, GET_ALL_CONTACTS_ROUTE, HOST, SEARCH_CONTACTS_ROUTE } from "@/utils/constants";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { userAppStore } from "@/store";
import { Button } from "@/components/ui/button";
import MultipleSelector from "@/components/ui/multipleselect";

const CreateChannel = () => {
    const { setSelectedChatData, setSelectedChatType, addChannel} = userAppStore();
    const [newChannelModal, setNewChannelModal] = useState(false);
    const [searchedContacts, setSearchedContacts] = useState([]);
    const [allContacts, setAllContacts] = useState([]);
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [channelName , setChannelName ] = useState("");


    useEffect(() => {
        const getData = async () => {
            const response = await apiClient.get(GET_ALL_CONTACTS_ROUTE, 
            { withCredentials: true });
            setAllContacts(response.data.contacts);
            console.log(response.data.contacts);
        };
        getData();
    }, [])

    const createChannel = async () => {
        try {
            if(channelName.length > 0 && selectedContacts.length > 0){
            console.log("CALLED CREATE CHNANEL")
            const response = await apiClient.post(CREATE_CHANNEL_ROUTE, {
                name: channelName,
                members : selectedContacts.map((contact)=> contact.value),
            },{
                withCredentials: true,
            });
            if(response.status===201){
                toast.success("Channel Created Successfully");
                setChannelName("");
                setSelectedContacts([]);
                setNewChannelModal(false);
                addChannel(response.data.channel);
            }
            }
            else{
                toast.info("Please fill all the fields");
            }
        } catch (error) {
            console.log(error);
        }
    };
    


    return (
        <>
        <TooltipProvider>
            <Tooltip>
            <TooltipTrigger>
                <FaPlus
                className="text-lg text-neutral-400 text-opacity-90 text-start hover:text-neutral-100 cursor-pointer duration-300 transition-all"
                onClick={() => setNewChannelModal(true)}
                />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3">
                Create New Channel
            </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        <Dialog open={newChannelModal} onOpenChange={setNewChannelModal}>
            <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col items-center">
            <DialogHeader>
                <DialogTitle>Please fill up the details for a NEW Channel</DialogTitle>
                <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="w-full">
                <Input
                placeholder="Channel Name"
                className="w-full p-6 rounded-lg bg-[#2c2e3b] border-neutral-500"
                onChange={(e) => setChannelName(e.target.value)}
                value={channelName}
                />
            </div>
            <div className="w-full ">
                <MultipleSelector 
                className=" p-6 rounded-lg bg-[#2c2e3b] border-none py-2 text-white w-full"
                defaultOptions={allContacts}
                placeholder="Select Members"
                value={selectedContacts}
                onChange={setSelectedContacts}
                emptyIndicator={
                    <div className="text-gray-600  leading-10 text-center">
                    No contacts found
                    </div>
                }
                />
            </div>
            <div>
                <Button className="w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300" 
                onClick={createChannel}>
                    Create Channel
                </Button>
            </div>
            </DialogContent>
        </Dialog>
        </>
    );
};

export default CreateChannel;
