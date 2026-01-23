'use client' // הגדרת רכיב צד לקוח - מאפשר שימוש ב-React Hooks כמו useState ב-Next.js

import React, { useState } from 'react'
// ייבוא אייקונים ספציפיים מספריית lucide-react לשימוש בתפריט
import { 
  LayoutDashboard, 
  PlusCircle, 
  FileText, 
  UserCircle,
  Settings,
  User ,
  LogOut ,
  Menu ,
  ArrowRight
} from 'lucide-react'

import { motion ,AnimatePresence } from 'framer-motion'

export default function SidBarDashboard({name , role ,myLogOut}) {
  
  // הגדרת State לשמירת הנתיב (href) של הכפתור שנבחר כרגע. ברירת מחדל היא '#'
  const [onClickItemMenu, setOnClickItemMenu] = useState('#')
  const [open , setOpen] = useState(false)
  // יצירת מערך של אובייקטים המייצגים את פריטי התפריט - שם, נתיב ואייקון לכל אחד
  const menuItem = [
    { name: 'לוח בקרה', href: '#', icon: <LayoutDashboard size={20} /> },
    { name: 'צור פוסט חדש', href: '#add', icon: <PlusCircle size={20} /> },
    { name: 'הפוסטים שלי', href: '#posts', icon: <FileText size={20} /> },
    { name: 'פרופיל משתמש שלי', href: '#profile', icon: <UserCircle size={20} /> }
  ]

  return (


 <>
    <div className='bg-[#424242] h-screen w-72 rounded-md p-4 2xl:xl:flex flex-col justify-around hidden' dir="rtl">

      {/* מיכל עליון (70% גובה): מכיל את הכותרת ואת רשימת הניווט */}
      <div className="w-full h-[70%] bg-[#242424] rounded-xl flex flex-col overflow-hidden shadow-lg">

        {/* תיבת הכותרת "אזור אישי" עם רקע אפור ועיצוב בולט */}
        <div className="rounded p-4 bg-gray-300 m-4 shadow-inner">
          <p className="tracking-widest font-bold text-xl border-b py-2 border-t border-black/10 text-black/75 flex gap-2 items-center justify-between">
            אזור אישי 
            <LayoutDashboard className="text-3xl hover:scale-120 hover:text-violet-600 duration-500 cursor-pointer"/> 
          </p>
        </div>

        {/* תפריט הניווט הראשי */}
        <nav className="p-4 space-y-2 mt-10">
          {/* כותרת קטנה מעל רשימת הכפתורים */}
          <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-4 px-2">תפריט ראשי</div>

          <div>
            {menuItem?.map((item ,i) => (
              <button key={i} onClick={() => setOnClickItemMenu(item.href)} className={`flex items-center rounded p-2 justify-between w-full my-4 duration-300 ${onClickItemMenu === item.href ? "bg-violet-400 " :'hover:bg-white/10 transition-all duration-300'}`}> 

                <div className={`flex items-center gap-2 font-bold tracking-widest text-zinc-400 my-2`}>
                  <span className={`${onClickItemMenu === item.href ? 'text-white'  : 'text-zinc-400 duration-300 hover:scale-125'}`}>{item.icon}</span>
                  <span className={`${onClickItemMenu === item.href ? 'text-white'  : 'text-zinc-400'}`}>{item.name}</span>
                </div>

                <span className={`${onClickItemMenu === item.href ? 'w-3 h-3 rounded-full bg-green-600 animate-pulse duration-300 '  : ''}`}/>
                 </button>
            ))}
          </div>




          
        </nav>
      </div> 

      {/* מיכל תחתון (27% גובה): מיועד להגדרות או כלים נוספים */}
      <div className="w-full h-[27%] bg-[#242424] rounded-xl flex flex-col  border border-white/5">

      <div className='flex flex-col items-start p-7 w-full h-full justify-around text-zinc-400'>

        <span className='flex items-center gap-2 w-full hover:bg-white/10 p-4 rounded hover:text-white duration-300 font-bold tracking-widest '><User/> {name}  </span>
        <span className='flex items-center gap-2 p-4 font-bold tracking-widest opacity-55'><Settings/>Role: {role}  </span>
        <span onClick={ ()  =>  myLogOut()  } className='flex items-center gap-2 p-4 font-bold tracking-widest opacity-55 hover:text-red-500 cursor-pointer duration-300'><LogOut/>יציאה מהמערכת  </span>

      </div>

      </div>     
      
    </div>



      <div className='2xl:hidden'>

        <button className='z-50 fixed top-3 right-2 2xl:hidden p-1 bg-gray-600/80 shadow-md rounded text-white duration-500 '  onClick={() => setOpen(!open)}> {open ? <ArrowRight/> : <Menu/>}  </button>

        {
          open && (
            <>

         

            <motion.div className='fixed inset-0 bg-black z-50 ' onClick={() => setOpen(false) }
            
            initial={{opacity:0}}
            animate={{opacity:0.8}}
            exit={{opacity:0}}
            transition={{duration:0.5 , ease:'easeIn'}}
              
            />



            <motion.div className='fixed right-0 top-0 h-full flex flex-col w-[60%] bg-gray-100 rounded z-50 shadow p-2 cursor-grab' 

            initial={{x:'100%'}} 
            animate={{x:0}} 
            exit={{x:'100%'}}
            transition={{duration:0.8 , ease:'easeIn'}}
            drag='x'
            dragConstraints={{right:0 , left:0}}
            onDragEnd={((e , drag) => {
              if(drag.offset.x > 180) {
                setOpen(false)
              }
            })}
            >

              <div className='flex items-center justify-between border-b border-gray-300 py-2'>

                <div className='flex items-center gap-2'>
                <span><LayoutDashboard className='text-2xl text-violet-400'/></span>
                <p className='text-[10pt] text-zinc-400 tracking-widest font-bold' >לוח בקרבה ראשי </p>
                </div>

                <button className='rounded-full bg-orange-400 text-white p-3 h-5 w-5 flex items-center justify-center text-[10pt] font-bold'>D</button>

              </div>

            </motion.div>
            
        
            
            </>
          )
        }
        
      </div>
</>



  )
}

// קומפוננטת האב להצגת התוצאה הסופית על המסך
// export function App() {
  //   return (
    //     // מיכל ראשי לתצוגה המקדימה עם רקע כהה מאוד
    //     <div className="flex bg-zinc-900 min-h-screen p-4 gap-4" dir="rtl">
    //       {/* קריאה לסיידבר שבנינו */}
    //       <SidBarDashboard />
    //       {/* אזור התוכן הראשי (Main Content) ליד הסיידבר */}
    //       <div className="flex-1 p-10 text-white text-right bg-[#242424] rounded-xl border border-white/5">
    //         <h1 className="text-3xl font-bold mb-4">תצוגה מקדימה</h1>
    //         <p className="text-zinc-400">לחץ על הכפתורים בתפריט כדי לראות את הלוגיקה של ההערות בפעולה.</p>
    //       </div>
    //     </div>
    //   )
// }