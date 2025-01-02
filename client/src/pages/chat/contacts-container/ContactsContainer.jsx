import { apiClient } from "@/lib/api-client";
import NewDM from "./components/new-dm/NewDM";
import ProfileInfo from "./components/profile-info/ProfileInfo";
import CreateChannel from "./components/create-channel/CreateChannel"
import { GET_DM_CONTACTS_ROUTE, GET_USER_CHANNELS_ROUTE } from "@/utils/constants";
import { useEffect } from "react";
import { userAppStore } from "@/store";
import ContactList from "@/components/ui/ContactList";
const ContactsContainer = () => {
  const { directMessagesContacts, setDirectMessagesContacts , channels , setChannels} = userAppStore();


  useEffect(() => {
    const getContacts = async () => {
      const response = await apiClient.get(GET_DM_CONTACTS_ROUTE, {
        withCredentials: true,
      });
      if (response.data.contacts) {
        console.log("This is the response data");
        console.log(response.data.contacts);
        setDirectMessagesContacts(response.data.contacts);
      }
    };

    const getChannels = async () => {
      const response = await apiClient.get(GET_USER_CHANNELS_ROUTE, {
        withCredentials: true,
      });
      if (response.data.channels) {
        setChannels(response.data.channels);
      }
    };
    getContacts();
    getChannels();
  }, []);

  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-gradient-to-br from-[#1a1a1a] to-[#232323] backdrop-blur-lg bg-opacity-90 border-r-2 border-[#2f303b] w-full">
      <div className="pt-3">
        <Logo />
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Direct Messages" />
          <NewDM />
        </div>
        <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden">
          < ContactList contacts={directMessagesContacts} />
        </div>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Channels" />
          < CreateChannel />
        </div>
        <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden">
          < ContactList contacts={channels} isChannel={true} />
        </div>
      </div>
      <ProfileInfo />
    </div>
  );
};

export default ContactsContainer;

const Logo = () => {
  return (
    <div className="flex p-5  justify-start items-center gap-2">
<svg
  id="custom-logo"
  width="78"
  height="32"
  viewBox="0 0 78 32"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M10 0L30 32H50L70 0H10Z"
    fill="#ff5c8e"
  ></path>
  <path
    d="M20 4L30 32H40L50 4H20Z"
    fill="#ff87a7"
  ></path>
  <path
    d="M30 8L40 32H50L60 8H30Z"
    fill="#ffb3c1"
  ></path>
</svg>

      <span className="text-3xl font-semibold ">TalkNest</span>
    </div>
  );
};

const Title = ({ text }) => {
  return (
    <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm">
      {text}
    </h6>
  );
};
