import { XIcon } from 'lucide-react';
import React from 'react'

const SessionDetailModel = ({session, onClose}) => {

    if(!session) return null;

    const isEnded = session.status === "ended";

  return (
    <div className='fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4'>
        <div className='bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col
        shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in duration-150'>

            {/* Model Header */}
            <div className='p-6 border-b border-slate-100 flex items-center justify-between'>
                <div>
                    <div className='flex items-center gap-2'>
                        <span className='text-xs font-mono text-slate-500 font-medium bg-slate-100
                        px-2 py-0.5 rounded-md'>ID: {session.meetingId}</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isEnded
                            ? "bg-slate-100 text-slate-600" : "bg-emerald-50 text-emerald-700"
                        }`}>
                            {isEnded ? "Ended" : "Active"}
                        </span>
                    </div>
                    <h2 className='text-2xl font-medium text-slate-900 mt-1'>{session.title || "Meeting Details"}</h2>
                    <p className='text-xs text-slate-400 mt-1'>
                        Host: {session.host?.name || "Host"} • Created {new Date(session.createdAt).toLocaleString()}
                    </p>
                </div>
                <button onClick={onClose}
                className='p-2 rounded-full hover:bg-slate-100 text-slate-400
                    hover:text-slate-700 transition-colors cursor-pointer' aria-label='Close sessiondetails'>
                    <XIcon className='w-5 h-5' />
                </button>
            </div>

            {/* Tabs Title */}

            {/* Tab Content */}

        </div>
    </div>
  )
}

export default SessionDetailModel