import { ArrowRightIcon, KeyboardIcon, PlusIcon, ShieldCheckIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { dummyStats, dummyUser } from '../assets/asset.js'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const user = dummyUser;
  const userName = user.fullName;
  const userEmail= user.primaryEmailAddress.emailAddress;
  const navigate = useNavigate()

  const [isCreating, setIsCreating] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const stats = dummyStats;
  const [joinId, setJoinId] = useState("")

  useEffect(()=>{
    const timer = setInterval(()=> setCurrentTime(new Date()), 1000);
    return ()=> clearInterval(timer)
  }, [])

  const handleCreateMeeting = () =>{

  }

  const handleJoinMeeting = (e) =>{

  }

  return (
    <div className='flex-1 max-w-7xl w-full mx-auto p-6 md:p-12 flex flex-col justify-center'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'>
        {/* Left Column - Actions */}
        <div className='lg:col-span-7 space-y-8'>

          <div className='space-y-3'>
            <div className='inline-flex items-center gap-2 rounded-full bg-primary-light/70 px-4 py-2.5 pr-6 text-sm font-medium text-slate-800 shadow-sm'>
              <ShieldCheckIcon size={17} strokeWidth={2.25} />
              <span>Secure Peer-to-Peer Encryption</span>
            </div>
            <h1 className='text-4xl sm:text-5xl text-slate-800 leading-tight font-medium'>
              High quality video call. <br />
              <span className='text-primary'>Built for everyone.</span>
            </h1>
            <p className='text-slate-700 text-base sm:text-lg max-w-xl leading-relaxed'>
              Connect, collaborate, and celebrate from anywhere with ultra-low latency video,
              screen sharing, and real-time chat.
            </p>

            <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2'>
              <button onClick={handleCreateMeeting}
              disabled={isCreating}
              className='bg-primary hover:bg-primary-hover text-white font-medium px-6 py-3.5
              rounded-full shadow-md shadow-primary/20 flex items-center justify-center
              gap-2.5 transition-all cursor-pointer disabled:opacity-50'>
                <PlusIcon className='w-5 h-5'/>
                <span>{isCreating ? "Creating..." : "New Meeting"}</span>
              </button>

              <form onSubmit={handleJoinMeeting} className='flex-1 flex items-center gap-2'>
                <div className='relative flex-1'>
                  <KeyboardIcon className='w-5 h-5 text-primary/90 absolute left-4 top-1/2 -translate-y-1/2' />

                  <input type='text' placeholder='Enter meeting code (e.g. abc-def-ghi)' 
                  value={joinId} onChange={(e)=>setJoinId(e.target.value)}
                  className='w-full bg-white/75 border border-primary-border/80
                  focus:border-primary/60 focus:ring-1 focus:ring-primary/60 rounded-full
                  pl-12 pr-4 py-3.5 text-sm text-slate-800 placeholder-slate-400
                  outline-none transsition-all' />
                </div>
                <button type='submit'
                disabled={!joinId.trim()}
                className='bg-slate-900 hover:bg-slate-800 disabled:opacity-40
                disabled:hover:bg-slate-900 text-white font-medium px-6 py-3.5 rounded-full
                transition-all flex items-center justify-center cursor-pointer shadow-xs'>
                  <span>Join</span>
                  <ArrowRightIcon className='w-4 h-4 ml-1.5'/>
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Right Column - Hero Graphic & Clock Card */}

      </div>
    </div>
  )
}

export default Dashboard