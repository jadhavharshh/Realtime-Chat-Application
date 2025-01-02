import { animationDefaultOptions } from "@/lib/utils"
import Lottie from "react-lottie"

const EmptyChatContainer = () => {
  return (
    <div
    className="flex-1 bg-gradient-to-br from-[#1a1a1a] via-[#232323] to-[#0f0f0f] backdrop-blur-lg bg-opacity-90 md:flex flex-col justify-center items-center hidden transition-all duration-1000"

  >
    <Lottie 
    isClickToPauseDisabled={true}
    height={200}
    width={200}
    options={animationDefaultOptions}
    />
    <div className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-19 lg:text-4xl text-3xl transition-all duration-300 text-center">
        <div className="poppins-bold">
          <h1>Hi<span className="text-purple-500">!</span> Welcome to <span className="text-purple-500"> TalkNest</span> Chat App</h1>
        </div>
    </div>
    </div>
    
  )
}

export default EmptyChatContainer