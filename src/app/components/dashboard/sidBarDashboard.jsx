'use client';

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, PlusCircle, FileText, UserCircle, 
  Settings, User, LogOut, Menu,  X, ArrowRight, User2Icon, 
  BellRing,
  Sparkles
} from 'lucide-react';
import { IoIosMedical } from "react-icons/io";
import { motion, AnimatePresence } from 'framer-motion';

export default function SidBarDashboard({ name, role, myLogOut }) {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const myName = name.charAt(0).toUpperCase()

  // סנכרון עם ה-URL: אם אין פרמטר tab, ברירת המחדל היא '1'
  const activeTab = searchParams.get('tab') || '1';

  const handleTabChange = (id) => {
    router.push(`/dashboard?tab=${id}`);
    setOpen(false); // סגירה בנייד
  };

  const menuItem = [
    { id: '1', name: 'לוח בקרה', icon: <LayoutDashboard size={20} /> },
    { id: '2', name: 'צור פוסט חדש', icon: <PlusCircle size={20} /> },
    { id: '3', name: 'הפוסטים שלי', icon: <FileText size={20} /> },
    { id: '4', name: 'פרופיל משתמש שלי', icon: <UserCircle size={20} /> }
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className='bg-[#424242] h-screen w-72 rounded-md p-4 xl:flex flex-col justify-around hidden' dir="rtl">
        <div className="w-full h-[70%] bg-[#242424] rounded-xl flex flex-col overflow-hidden shadow-lg border border-white/5">
          <div className="rounded p-4 bg-gray-300 m-4 shadow-inner">
            <p className="tracking-widest font-bold text-xl border-b py-2 border-t border-black/10 text-black/75 flex gap-2 items-center justify-between">
              אזור אישי <LayoutDashboard className="text-3xl text-violet-600"/> 
            </p>
          </div>

          <nav className="p-4 space-y-2 mt-10">
            <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-4 px-2">תפריט ראשי</div>
            {menuItem.map((item) => (
              <button 
                key={item.id} 
                onClick={() => handleTabChange(item.id)}
                className={`flex items-center rounded p-2 justify-between w-full duration-300 ${activeTab === item.id ? "bg-violet-400 text-white" : 'hover:bg-white/10 text-zinc-400'}`}
              > 
                <div className="flex items-center gap-2 font-bold tracking-widest my-2">
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </div>
                {activeTab === item.id && <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />}
              </button>
            ))}
          </nav>
        </div> 

        <div className="w-full h-[27%] bg-[#242424] rounded-xl flex flex-col border border-white/5 p-7 justify-around text-zinc-400">
          <span className='flex items-center gap-2 font-bold'><User size={18}/> {name}</span>
          <span className='flex items-center gap-2 opacity-55'><Settings size={18}/> {role}</span>
          <button onClick={() => myLogOut?.()} className='flex items-center gap-2 font-bold hover:text-red-500 duration-300 text-right'>
            <LogOut size={18}/> יציאה מהמערכת
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Logic (שאר הקוד של ה-Motion נשאר אותו דבר, רק להחליף את ה-Click ל-handleTabChange) */}

      <div className='xl:hidden block'>

        <button onClick={() => setOpen(!open)} className='fixed right-3 top-3 duration-500'>{open ? <X/> : <Menu/>}</button>

        {open && (
          <>
          <motion.div className=' bg-black z-50 fixed inset-0' 
          onClick={() => setOpen(false)}
          initial={{opacity:0}}
          animate={{opacity:0.8}}
          exit={{opacity:0}}
          transition={{duration:0.8 , ease:'easeIn'}}
          />


          <motion.div className='fixed right-0 top-0 w-[60%] bg-linear-to-tr from-violet-950 to-black shadow-white/40  shadow-xl z-50 h-full p-2  flex flex-col' 
          
          initial={{opacity:0 , x:'100%'}}
          animate={{opacity:1 ,x:0}}
          exit={{opacity:0 , x:'100%'}}
          transition={{duration:0.8 , ease:'easeIn'}}

          > 
          


          <div className='flex gap-2 mb-5  items-center justify-end p-1'>
            <span className='w-4 h-4 rounded-full active:scale-125 duration-300  bg-red-600'/>
            <span className='w-4 h-4 rounded-full active:scale-125 duration-300  bg-yellow-600'/>
            <span className='w-4 h-4 rounded-full active:scale-125 duration-300  bg-green-600'/>
          </div>


          <div className='flex items-center justify-between p-2 font-bold border-b border-zinc-400 border-t  '>
              <div className='flex items-center gap-5  '>
                <button className='p-0.5 active:scale-125 duration-300 w-7 h-7  rounded-full flex items-center bg-orange-400 justify-center'><p className=''>{myName}</p></button>
                <button className='bg-violet-400 rounded-full p-1 duration-300 active:scale-125'><span><BellRing className='size-5'/></span></button>
              </div>

              <div onClick={() => myLogOut()} className='flex items-center gap-2'>
                <p>LogOut</p>
                <LogOut/>
              </div>
            </div>



            <div className='mt-20 border-b bg-white/5 rounded p-2 border-t border-zinc-400/80'>

              <div className='flex items-center gap-2 p-2'>
                <Sparkles className='size-3'/>
                <p className='text-[6pt] tracking-wider font-bold text-zinc-400 border-l w-[30%] opacity-80 text-shadow-2xs text-shadow-zinc-100'>תפריט ראשי</p>
              </div>

              <div className='p-2'>
                {menuItem?.map((item , i) => (
                  <div key={i} onClick={() => handleTabChange(item.id)} className={`my-4 p-1 rounded  `}>

                    <button className='flex justify-between w-full active:scale-105 duration-300 border-b border-b-zinc-400/20 p-0.5'>
                      <div className='flex items-center gap-2'>
                      <span className='font-extrabold tracking-tighter text-xl'>{item.icon}</span>
                      <span className='font-extrabold tracking-tighter text-xl'>{item.name}</span>
                      </div>
                      <span className={`${activeTab === item.id ? 'w-3 h-3 rounded-full bg-green-400 animate-pulse duration-300 hover:scale-150' : ''}`}/>
                    </button>

                   </div>
                ))}
              </div>

            </div>

            

     



           </motion.div>
          
          
          </>
        )}

      </div>
    </>
  );
}