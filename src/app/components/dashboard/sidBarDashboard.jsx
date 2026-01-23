'use client' // הגדרת רכיב צד לקוח - מאפשר שימוש ב-React Hooks כמו useState ב-Next.js

import React, { useState } from 'react'
// ייבוא אייקונים ספציפיים מספריית lucide-react לשימוש בתפריט
import { 
  LayoutDashboard, 
  PlusCircle, 
  FileText, 
  UserCircle,
  Settings,
  User
} from 'lucide-react'

export default function SidBarDashboard({name , role}) {
  
  // הגדרת State לשמירת הנתיב (href) של הכפתור שנבחר כרגע. ברירת מחדל היא '#'
  const [onClickItemMenu, setOnClickItemMenu] = useState('#')

  // יצירת מערך של אובייקטים המייצגים את פריטי התפריט - שם, נתיב ואייקון לכל אחד
  const menuItem = [
    { name: 'לוח בקרה', href: '#', icon: <LayoutDashboard size={20} /> },
    { name: 'צור פוסט חדש', href: '#add', icon: <PlusCircle size={20} /> },
    { name: 'הפוסטים שלי', href: '#posts', icon: <FileText size={20} /> },
    { name: 'פרופיל משתמש שלי', href: '#profile', icon: <UserCircle size={20} /> }
  ]

  return (
    // המכולה הראשית: רקע כהה, גובה מסך מלא, רוחב קבוע, ריפוד וסידור גמיש (Flex) מלמעלה למטה בכיוון RTL
    <div className='bg-[#424242] h-screen w-72 rounded-md p-4 flex flex-col justify-around' dir="rtl">

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
                  <span className={`${onClickItemMenu === item.href ? 'text-white'  : 'text-zinc-400'}`}>{item.icon}</span>
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

        <span className='flex items-center gap-2 w-full hover:bg-white/10 p-4 rounded hover:text-white duration-300 font-bold tracking-widest cuSV'><User/> {name}  </span>
        <span className='flex items-center gap-2 p-4 font-bold tracking-widest opacity-55'><Settings/>Role: {role}  </span>

      </div>

      </div>     
      
    </div>
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