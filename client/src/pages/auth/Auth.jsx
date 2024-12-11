import React from 'react'
import Background from '@/assets/login2.png' 
import Victory from '@/assets/victory.svg'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const Auth = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")


  const handleLogin = async () => {

  }

  const handleSignUp = async () => {

  }

  return (
    <div className="h-[100vh] flex items-center justify-center">
      <div className=" border-2 h-[80vh] w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw]  flex justify-center items-center rounded-3xl xl:grid-cols-2">
        <div className="bg-white flex flex-col items-center justify-center gap-5">
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
              <img src={ Victory } className='h-[100px]' alt="Victory IMG" />
            </div>
            <p className="text-center font-medium">
              Fill this to get Started with the Best Chat Application
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
          {/* This is the structure from SHADCN */}
          <Tabs defaultValue='login' className='w-5/6	 flex items-center justify-center flex-col'>
            <TabsList className="w-full bg-transparent rounded-none">
              <TabsTrigger value='signup' className='data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300'>Sign Up</TabsTrigger>
              <TabsTrigger value='login' className='data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300'>Login</TabsTrigger>
            </TabsList>
            <TabsContent className="flex flex-col mt-5 w-full gap-3" value='signup'>
              <Input placeholder="Email" className="rounded-xl p-6" value={email} onChange={(e)=>setEmail(e.target.value)}/>
              <Input placeholder="Password" className="rounded-xl p-6" value={password} onChange={(e)=>setPassword(e.target.value)}/>
              <Input placeholder="Confirm Password" className="rounded-xl p-6" value={password} onChange={(e)=>setConfirmPassword(e.target.value)}/>
              <Button onClick={handleSignUp} className="rounded-full p-6 hover:bg-opacity-60">Sign Up</Button>
            </TabsContent>
            <TabsContent className="flex flex-col w-full gap-3" value='login' >
            <Input placeholder="Email" className="rounded-xl p-6" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <Input placeholder="Password" className="rounded-xl p-6" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <Button onClick={handleLogin} className="rounded-full p-6 hover:bg-opacity-60">Login</Button>
            </TabsContent>
          </Tabs>
          </div>
        </div>
        <div className="hidden md:flex items-center justify-center">
          <img src={ Background } className='h-[80vh]' alt="Background IMG" />
        </div>
      </div>
    </div>
  )
}

export default Auth