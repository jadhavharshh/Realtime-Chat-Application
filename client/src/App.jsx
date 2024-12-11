import React from 'react'
import { Button } from '@/components/ui/button';

const App = () => {
  return (
    <div className='flex items-center justify-center flex-col h-screen'>
      <h1>HELLO AND WELCOME</h1>
      <Button>Click me</Button>
      <div className="main bg-slate-500 h-1/2 w-1/2 flex items-center justify-center text-3xl tracking-widest font-black">
        THIS IS TRIAL TEXT
      </div>
    </div>
  )
}

export default App