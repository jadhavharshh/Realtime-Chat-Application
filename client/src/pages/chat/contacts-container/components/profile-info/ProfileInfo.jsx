import { Avatar , AvatarImage} from "@/components/ui/avatar"
import { getColor } from "@/lib/utils"
import { userAppStore } from "@/store"
import { HOST, LOGOUT_ROUTE } from "@/utils/constants"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { FiEdit2 } from "react-icons/fi"
import { IoPowerSharp } from "react-icons/io5"  
import { useNavigate } from "react-router-dom"
import { apiClient } from "@/lib/api-client"

const ProfileInfo = () => {
    const navigate = useNavigate();
    const { userInfo , setUserInfo } = userAppStore();
    const imageUrl = userInfo.image ? encodeURI(`${HOST}/${userInfo.image}`) : null;
    const logOut = async () => {
        try {
            const response = await apiClient.post(LOGOUT_ROUTE, {} , {withCredentials:true});
            console.log(LOGOUT_ROUTE)
            if(response.status === 200){
                navigate('/auth');
                setUserInfo(null);
            }
        } catch (error) {
            console.log({error});
        }        
    }
    return (
    <div className="absolute bottom-0 h-16 flex items-center justify-between px-4 w-full  bg-[#1a1a1a] backdrop-blur-md ">
        <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 relative ">
            <Avatar className="w-12 h-12 rounded-full overflow-hidden">
                {imageUrl ? (
                    <AvatarImage 
                        src={imageUrl}
                        alt="profile-avatar"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.onerror = null; // Prevents infinite loop if fallback also fails
                            e.target.style.display = 'none';
                        }}
                    />
                ) : (
                    <div
                        className={`uppercase h-12 w-12 text-lg flex items-center justify-center border-[1px] rounded-full ${getColor(userInfo.color)}`}>
                        {userInfo.firstName
                            ? userInfo.firstName.charAt(0).toUpperCase()
                            : userInfo.email.charAt(0).toUpperCase()
                        }
                    </div>
                )}
            </Avatar>
            </div>
            <div className="font-medium">
            {
                userInfo.firstName && userInfo.lastName 
                    ? `${userInfo.firstName} ${userInfo.lastName}` 
                    : ""
            }
            </div>
        </div>
        <div className="flex gap-5">
        <TooltipProvider>
        <Tooltip>
            <TooltipTrigger>
                <FiEdit2 className="text-xl text-purple-500" onClick={()=> navigate('/profile')}/>
            </TooltipTrigger>
            <TooltipContent>
            <p>Edit</p>
            </TooltipContent>
        </Tooltip>
        <TooltipProvider>
        <Tooltip>
            <TooltipTrigger>
                <IoPowerSharp className="text-xl text-purple-500" onClick={logOut}/>
            </TooltipTrigger>
            <TooltipContent>
            <p>Log Out</p>
            </TooltipContent>
        </Tooltip>
        </TooltipProvider>
        </TooltipProvider>

        </div>
    </div>
    )
}

export default ProfileInfo