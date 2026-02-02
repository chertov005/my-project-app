'use client';

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, PlusCircle, FileText, UserCircle, 
  Settings, User, LogOut, Menu, ArrowRight, User2Icon 
} from 'lucide-react';
import { IoIosMedical } from "react-icons/io";
import { motion, AnimatePresence } from 'framer-motion';

export default function SidBarDashboard({ name, role, myLogOut }) {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  // סנכרון עם ה-URL: אם אין פרמטר tab, ברירת המחדל היא '1'
  const activeTab = searchParams.get('tab') || '1';

  const handleTabChange = (id) => {
    router.push(`/dashboard?tab=${id}`);
    setOpen(false); // סגירה בנייד
  };

  const menuItem = [
    { id: '1', name: 'לוח בקרה', icon: <LayoutDashboard size={20} /> },
    { id: '3', name: 'צור פוסט חדש', icon: <PlusCircle size={20} /> },
    { id: '2', name: 'הפוסטים שלי', icon: <FileText size={20} /> },
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
                {activeTab === item.id && <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />}
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
    </>
  );
}