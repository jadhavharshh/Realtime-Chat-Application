import { userAppStore } from '@/store'
import React , {useState , useEffect, useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5'
import { FaTrash , FaPlus } from 'react-icons/fa'
import { Avatar,  AvatarImage } from "@/components/ui/avatar"
import { colors, getColor } from "@/lib/utils"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { apiClient } from '@/lib/api-client';
import { ADD_PROFILE_IMAGE_ROUTE, HOST, UPDATE_PROFILE_ROUTE , REMOVE_PROFILE_IMAGE_ROUTE} from '@/utils/constants';


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
  const fileInputRef = useRef(null);

  useEffect(() => {
    if(userInfo.profileSetup){
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setSelectedColor(userInfo.color);
    };
    if(userInfo.image){
      setImage(encodeURI(`${HOST}/${userInfo.image}`));
     
    }

  }, [userInfo])
  

  const validateProfile = () => {
    if(!firstName){
      toast.error("First Name is required!");
      return false;
    }
    if(!lastName){
      toast.error("Last Name is required!");
      return false;
    }
    return true;
  };

  const saveChanges = async () => {
    if(validateProfile()) {
      try {
        console.log(selectedColor)
        const response = await apiClient.post(UPDATE_PROFILE_ROUTE, 
          {firstName, lastName, color : selectedColor},
          {withCredentials:true}
      );
      console.log(response);
      if(response.status === 200 && response.data){
        setUserInfo({...response.data });
        toast.success("Profile Updated Successfully!");
      }
      } catch (error) {
        console.log(error);
      }
    };
  };
  
  const handleNavigate = () => {
    if(userInfo.profileSetup){
      navigate("/chat");
    } else {
      toast.error("Please complete your profile setup!");
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      const formData = new FormData();
      formData.append("profile-image", file);
      try {
        const response = await apiClient.post(ADD_PROFILE_IMAGE_ROUTE, formData, { withCredentials: true });
        if (response.status === 200 && response.data.image) {
          setUserInfo({ ...userInfo, image: response.data.image });
          toast.success("Profile Image Updated Successfully!");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image. Please try again.");
      }
    }
  };

  const handleDeleteImage = async () => {
    try {
      const response = await apiClient.delete(REMOVE_PROFILE_IMAGE_ROUTE , {withCredentials:true});
      // Additional logic after successful deletion
      if(response.status===200 ){
        setUserInfo({...userInfo, image:null});
        toast.success("Image Removed Successfully!");
        setImage(null);
      }
    } catch (error) {
      console.error("Error removing profile image:", error);
      toast.error("Failed to remove profile image.");
    }
  };   
  return (
    <div className="  bg-gradient-to-br from-[#141414]/95 via-[#1a1a1a]/98 to-[#0f0f0f]/95 h-screen w-full flex items-center justify-center flex-col gap-10">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div>
          <IoArrowBack onClick={handleNavigate} className="text-4xl lg:text-6xl cursor-pointer text-white/90" />
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
              hovered && <div className='absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer' onClick={image ? handleDeleteImage : handleFileInputClick}>
              {image ? <FaTrash className='text-3xl text-white cursor-pointer'/> : <FaPlus className='text-3xl text-white cursor-pointer'/>}</div>
            }
            {<input type="file" ref={fileInputRef} className='hidden' onChange={handleImageChange} name='profile-image' accept='.png,.jpg ,.jpeg ,.svg, .webp'/>}
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