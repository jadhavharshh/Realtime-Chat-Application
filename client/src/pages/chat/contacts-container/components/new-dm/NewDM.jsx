import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { FaPlus } from "react-icons/fa"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import Lottie from "react-lottie"
import { animationDefaultOptions } from "@/lib/utils"


const NewDM = () => {
  const [openNewContactModel, setopenNewContactModel] = useState(false)
  const [searchedContacts, setSearchedContacts] = useState([]);
  const searchContacts = async (searchTerm) => {
    
  }
  return (
    <>
        <TooltipProvider>
        <Tooltip>
            <TooltipTrigger>
                <FaPlus className="text-lg text-neutral-400 text-opacity-90 text-start hover:text-neutral-100 cursor-pointer duration-300 transition-all" onClick={()=> setopenNewContactModel(true)}/>
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3">
            Select New Contact
            </TooltipContent>
        </Tooltip>
        </TooltipProvider>
        <Dialog open={openNewContactModel} onOpenChange={setopenNewContactModel}>
        <DialogContent  className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col items-center">
          <DialogHeader>
            <DialogTitle>Please Select a Contact</DialogTitle>
            <DialogDescription>
            </DialogDescription>
          </DialogHeader>
          <div className="w-full">
            <Input placeholder="Search for a contact" 
            className="w-full p-6 rounded-lg bg-[#2c2e3b] border-neutral-500" 
            onChange={e=>searchContacts(e.target.value)}/>
          </div>
          {
            searchedContacts.length <= 0 && (
              <div className="flex-1 md:flex flex-col justify-center items-center hidden duration-1000 transition-all mt-5">
              <Lottie 
              isClickToPauseDisabled={true}
              height={100}
              width={100}
              options={animationDefaultOptions}
              />
              <div className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-5 lg:text-2xl text-xl transition-all duration-300 text-center">
                  <h3 className="poppins-medium">
                      <h1>Hi<span className="text-purple-500">! </span>Search New  <span className="text-purple-500"> Contact</span></h1>
                  </h3>
              </div>
              </div>
            )
          }
        </DialogContent>
      </Dialog>

    </>
  )
}

export default NewDM