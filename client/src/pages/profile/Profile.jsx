import { userAppStore } from '@/store'
import React , {useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5'
import { FaTrash , FaPlus } from 'react-icons/fa'
import { Avatar,  AvatarImage } from "@/components/ui/avatar"
import { colors, getColor } from "@/lib/utils"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';
const Profile = () => {
  const navigate = useNavigate();

  // Get the user info from the store
  const {userInfo , setUserInfo} = userAppStore();

  // State Effects to handle the form inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);

  const saveChanges = async () => {
    
  };
  return (
    <div className="bg-[#1b1c24] h-screen w-full flex items-center justify-center flex-col gap-10">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div>
          <IoArrowBack className="text-4xl lg:text-6xl cursor-pointer text-white/90" />
        </div>
        <div className="grid grid-cols-2">
          <div className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center"
            onMouseEnter={() => setHovered(true)} 
            onMouseLeave={() => setHovered(false)}>
            
            <Avatar className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden" >
              {
                image ? (<AvatarImage 
                  src={image}
                  alt="profile-avatar"
                  className="w-full h-full object-cover bg-black"
                />
                 ): (<div className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl flex items-center justify-center border-[1px] rounded-full ${getColor(selectedColor)} `}>
                  {firstName
                    ? firstName.split("").shift().toUpperCase()
                    : userInfo.email.split("").shift().toUpperCase()
                  }
                </div>)
              }
            </Avatar>
            {
              hovered && <div className='absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer'>
              {image ? <FaTrash className='text-3xl text-white cursor-pointer'/> : <FaPlus className='text-3xl text-white cursor-pointer'/>}</div>
            }
            {/* {<input type="text" />} */}
          </div>
          <div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
            <div className="w-full">
              <Input placeholder="Email" type="email" disabled value={userInfo.email} className="rounded-lg p-6 border-none !bg-slate-800"/>
            </div>
            <div className="w-full">
              <Input placeholder="First Name" type="text" value={firstName} onChange={(e)=> setFirstName(e.target.value)} className="rounded-lg p-6 border-none bg-slate-800"/>
            </div>
            <div className="w-full">
              <Input placeholder="Last Name" type="text" value={lastName} onChange={(e)=> setLastName(e.target.value)} className="rounded-lg p-6 border-none bg-slate-800"/>
            </div>
            <div className="w-full flex gap-5 justify-center">
            {
              colors.map((color, index) => (
                <div className={`${color} h-8 w-8 rounded-full  cursor-pointer transition-all duration-300 
                ${
                  selectedColor===index
                  ? "outline outline-white/50 outline-3"
                  : ""
                }
                `} key={index} onClick={()=>setSelectedColor(index)}></div>

              ))
            }
          </div>
          </div>
        </div>
        <div className="w-full flex items-center">
          <Button className="h-12 w-full bg-purple-800 hover:bg-purple-950 rounded-3xl hover:"
          onClick={saveChanges}
          >Save Changes</Button>
        </div>
      </div>
    </div>
  )
}

export default Profile