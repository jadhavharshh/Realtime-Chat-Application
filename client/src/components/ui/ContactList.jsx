import { userAppStore } from "@/store";
import { Avatar, AvatarImage } from "./avatar";
import { HOST } from "@/utils/constants";
import { getColor } from "@/lib/utils";

const ContactList = ({ contacts = [], isChannel = false }) => {
  const {
    selectedChatData,
    selectedChatType,
    setSelectedChatData,
    setSelectedChatType,
    setSelectedChatMessages,
  } = userAppStore();

  const handleClick = (contact) => {
    if (isChannel) {
      setSelectedChatType("channel");
    } else setSelectedChatType("contact");
    setSelectedChatData(contact);
    if (selectedChatData && selectedChatData._id === contact._id) {
      setSelectedChatMessages([]);
    }
  };

  return (
    <div className="mt-5 flex flex-col">
      {contacts.map((contact) => (
        <div
          className={`pl-10 py-2 transition-all duration-300 cursor-pointer ${
            selectedChatData && selectedChatData._id === contact._id
              ? "bg-[#8417ff] hover:bg-[#8417ff]"
              : "[#f1f111]"
          }`}
          onClick={() => handleClick(contact)}
          key={contact._id}
        >
          <div className="flex gap-5 items-center justify-start text-neutral-300">
            {!isChannel && (
              <Avatar className="w-10 h-10 rounded-full overflow-hidden">
                {contact.image ? (
                  <AvatarImage
                    src={encodeURI(`${HOST}/${contact.image}`)}
                    alt="profile-avatar"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null; // Prevents infinite loop if fallback also fails
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  <div
                    className={`uppercase h-10 w-10 text-lg flex items-center justify-center border-[1px] rounded-full ${getColor(
                      contact.color
                    )}`}
                  >
                    {contact.firstName
                      ? contact.firstName.charAt(0).toUpperCase()
                      : contact.email.charAt(0).toUpperCase()}
                  </div>
                )}
              </Avatar>
            )}
            {isChannel && (
              <div className="bg-[#ffffff22] w-10 h-10 rounded-full overflow-hidden flex items-center justify-center ">
                #
              </div>
            )}
            {isChannel ? (
              <span>{contact.name}</span>
            ) : contact.firstName && contact.lastName ? (
              <span>{`${contact.firstName} ${contact.lastName}`}</span>
            ) : (
              <span>{contact.email}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
