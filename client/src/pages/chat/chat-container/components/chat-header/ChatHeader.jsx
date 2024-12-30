import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";
import { userAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import { RiCloseFill } from "react-icons/ri";

const ChatHeader = () => {
  const { closeChat, selectedChatData, selectedChatType } = userAppStore();
  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-5">
      <div className="flex gap-5 items-center w-full justify-between">
        <div className="flex gap-3 items-center justify-center">
          <div className="w-12 h-12 relative ">
          {
            selectedChatType === "contact" ?             (<Avatar className="w-12 h-12 rounded-full overflow-hidden">
            {selectedChatData.image ? (
              <AvatarImage
                src={encodeURI(`${HOST}/${selectedChatData.image}`)}
                alt="profile-avatar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null; // Prevents infinite loop if fallback also fails
                  e.target.style.display = "none";
                }}
              />
            ) : (
              <div
                className={`uppercase h-12 w-12 text-lg flex items-center justify-center border-[1px] rounded-full ${getColor(
                  selectedChatData.color
                )}`}
              >
                {selectedChatData.firstName
                  ? selectedChatData.firstName.charAt(0).toUpperCase()
                  : selectedChatData.email.charAt(0).toUpperCase()}
              </div>
            )}
          </Avatar> ) : (<div className="bg-[#ffffff22] w-10 h-10 rounded-full overflow-hidden flex items-center justify-center ">
                #
              </div>)
          }
          </div>
          <div>
            {selectedChatType === "channel" && selectedChatData.name}
            {selectedChatType === "contact" && (
              <div className="flex flex-col ">
                <span>
                  {selectedChatData.firstName && selectedChatData.lastName
                    ? `${selectedChatData.firstName} ${selectedChatData.lastName}`
                    : ""}
                </span>
                <span className="text-sm">{selectedChatData.email}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center gap-5">
          <button
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
            onClick={closeChat}
          >
            <RiCloseFill className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
