

'use client'
import { motion } from 'framer-motion'
import { Circle, Edit, Loader2, Mail, Settings, ShieldCheckIcon, Trash2, User, UserMinus2, UserRoundCheckIcon, Users2, View } from 'lucide-react'
import axios from 'axios'
import React, {  useEffect, useState } from 'react'


export default  function AdminArea() {
  
  const [users , setUsers ] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [itLodingNewUser  , setItsLoadingNewUser] = useState(false)
  const [itsSend ,seItsSend] = useState(false)

  


  const settingAndnewuser = [

    {id:'1' ,name:'הגדרות' , icon: <Settings className='size-9'/>} ,
    {id:'2' ,name:'יצירת משתמש' , icon: <User className='size-9'/>}

  ] 

  const summary = [

    {id:'1' , name: 'סה"כ משתמשים ', icon:<Users2 className='text-violet-400 size-11'/>  ,result:users.length}  ,
    {id:'2' , name:' משתמשים מחוברים כעת'  , icon:<UserRoundCheckIcon className='text-cyan-400 size-11'/> ,result:'333' }  ,
    {id:'3' , name:' משתמשים לא פעילים'  , icon:<UserMinus2 className='text-orange-400 size-11'/> ,result:'44' }  ,
    {id:'4' , name:'צפיות באתר החודש '  , icon:<View className='text-emerald-400 size-11'/> ,result:'34343' }  
   

  ]

 
  
  const doApiGet = async () => {

         try {
       setIsLoading(true);
      //  שימוש ב-Axios למשיכת הנתונים מהנתיב שציינת
       const response = await axios.get('/api/users');
      
        // נניח שה-API מחזיר מערך של משתמשים
        // אם המידע נמצא בתוך אובייקט (למשל response.data.users), יש לעדכן בהתאם
       setUsers(response.data.data); 
    
     } catch (err) {
       console.error("Error fetching users:", err);
     
     } finally {
       setIsLoading(false);
     }
    
  }

  const doForm = async (_data) => {



  }



  useEffect(() => {

    doApiGet()

  } ,[])




  const[activeSettingOrUser , setActiveSettingOrUser] = useState('1')

  return (
    <div className='flex flex-col w-full h-screen p-4  '>
      
      <div className='flex justify-between p-2 items-center'>
        <div className='flex flex-col gap-2'>
          <p className='text-5xl tracking-widest font-bold text-shadow-2xs text-shadow-yellow-500'>  ממשק ניהול מערכת </p>
          <p  className='text-xl tracking-wider text-zinc-400 font-extralight border-r px-2'>ניהול משתמשים, סטטיסטיקות והגדרות אבטחה.</p>
        </div>


        <div className='flex gap-8 bg-white/10 rounded-2xl p-5 items-center shadow-xl shadow-white/10 border-t border-gray-600 border-b'>
          {settingAndnewuser?.map((item ,i) => (
            <div key={i} onClick={() => setActiveSettingOrUser(item.id)} className={`rounded-xl ${activeSettingOrUser == item.id ? 'bg-violet-400  duration-300' : 'hover:bg-gray-500 duration-300'}`}>
              <button className='flex gap-1 items-center active:scale-95 duration-300 p-2 px-3 rounded-xl bg-white/20 shadow-md shadow-yellow-50/15'>
                <span className='tracking-widest font-bold'>{item.icon}</span>
                <span className='-tracking-wider font-bold'>{item.name}</span>
              </button>
              </div>
          ))}
        </div>

      </div>


      

        {
          activeSettingOrUser === '1' && (
            <motion.div 
            
            initial={{opacity:0 , y:0}}
            animate={{opacity:1 ,y:20}}
            exit={{opacity:0 , y:0}}
            transition={{duration:0.8,ease:'easeIn'}}

            >

              <div className='mt-20 grid xl:grid-cols-4 grid-cols-1 gap-10 w-[90%] mx-auto border-b py-10 border-zinc-400/30 border-t bg-white/5  shadow-2xl shadow-white/20 p-4 rounded-xl'>

                {summary?.map((item , i) => (
                  <div key={i} className={`p-8 rounded-2xl shadow-2xl items-end shadow-white/20 bg-linear-to-tr from-black to-violet-950/60 duration-300 flex justify-between   gap-4 ${i % 2 === 0  ? 'hover:bg-linear-to-tl hover:from-black hover:to-violet-800/45 hover:scale-105 ' : 'hover:bg-linear-to-tl hover:from-black hover:to-violet-600 hover:scale-105'}`}> 


                    <div className='flex flex-col gap-2 items-center px-2' >
                    <span className='border-b border-t bg-white/10 p-1 text-md font-bold tracking-widest text-zinc-400'>{item.name}</span>
                    <span className='text-center text-md font-bold tracking-widest text-zinc-400'>{item.result}</span>
                  </div>

                  <span className='flex flex-col items-end'>{item.icon}</span>
                  
                

                  </div>
                ))}

              </div>


              <div className='mt-20 p-4 bg-linear-to-tr from-violet-900 to-black shadow-2xl shadow-white/40 w-[95%] mx-auto '>

              <div className='w-full p-4 bg-white/15 rounded-xl flex justify-between items-center'>
              <span className='text-xl tracking-wider text-violet-400 font-bold text-shadow-2xs flex items-center gap-1 flex-row-reverse text-shadow-white  '> ניהול משתמשים <ShieldCheckIcon className='text-green-500'/> </span>

              <input type="text" className='w-[25%] rounded-xl p-2 bg-black/10 outline-0 text-center duration-300 hover:bg-white/10 text-zinc-400' placeholder='חפש לפי שם משתמש או אימייל...' />
              </div>


              <div className='mt-10 p-1 border-t border-zinc-400/25 text-center'>

                <div className='grid grid-cols-5 w-full p-1   border-b border-zinc-400/25'>
                  <span className='text-zinc-400 tracking-tighter font-bold text-[13pt] text-shadow-2xs text-shadow-white '>משתמש  </span>
                  <span className='text-zinc-400 tracking-tighter font-bold text-[13pt] text-shadow-2xs text-shadow-white '>הרשאות</span>
                  <span className='text-zinc-400 tracking-tighter font-bold text-[13pt] text-shadow-2xs text-shadow-white '>תאריך הצטרפות</span>
                  <span className='text-zinc-400 tracking-tighter font-bold text-[13pt] text-shadow-2xs text-shadow-white '>אימייל</span>
                  <span className='text-zinc-400 tracking-tighter font-bold text-[13pt] text-shadow-2xs text-shadow-white '>פעולות</span>
                </div>

      {/* מצבי טעינה ושגיאה */}

      {
        isLoading  ?
         <div className="flex flex-col items-center justify-center py-24 gap-4">
             <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
             <p className="text-slate-400 animate-pulse">טוען נתונים מהשרת...</p>
           </div>

           :
           <div> 

           </div>
       
      }             

                {
                  users.length > 0 

                  ? 

                               <div>
                  {users?.map((item ,i) => (
                    <div key={i} className='p-1 text-zinc-400 grid grid-cols-5 my-4 py-1 text-center cursor-pointer items-center border-b border-zinc-400/10 hover:bg-white/10 duration-300 rounded-md  '>
                      <p className='font-bold tracking-widest text-[11pt] flex items-center justify-center flex-row-reverse gap-2'>  {item.name} <Circle className='fill-green-400 size-2 animate-pulse'/> </p>
                      <p className='font-bold tracking-widest text-[11pt]'>{item.role}</p>
                         <p className='font-bold tracking-widest text-[11pt]'> {new Date(item.createdAt).toLocaleString('he-IL')}</p>
                      <p className='font-bold tracking-widest text-[11pt]'>{item.email}</p>

                      <div className='flex items-center justify-around' >
                        <span title='הודעה'><Mail className='size-5 hover:scale-110 cursor-pointer active:scale-95 duration-300  text-emerald-400 hover:fill-emerald-400/40'/></span>
                        <span title='עריכה'><Edit className='size-5 hover:scale-110 cursor-pointer active:scale-95 duration-300  text-violet-400 hover:fill-violet-400/40'/></span>
                        <span title='מחיקה'><Trash2 className='size-5 hover:scale-110 cursor-pointer active:scale-95 duration-300 text-orange-400 hover:fill-orange-400/40 '/></span>
                      </div>
                    </div>
                  ))}
                </div>


                   :

                 <div className='flex flex-col items-center mt-20'>

                  <p className='text-4xl font-bold tracking-widest text-violet-500'>לא נמצאו משתמשים רשומים במערכת </p>
  
                  </div>
                }

              </div>
               

              </div>
             

            </motion.div>
          )
        }


      
        
        {
          activeSettingOrUser === '2' && (
            <motion.div className='flex flex-col justify-center items-center h-screen w-full' 
            
            initial={{opacity:0 , y:0}}
            animate={{opacity:1 ,y:20}}
            exit={{opacity:0 , y:0}}
            transition={{duration:0.8,ease:'easeIn'}}

            >


              <form className='flex flex-col p-4 rounded shadow bg-linear-to-tr from-violet-950 w-[30%] '>

                {
                  itsSend 

                  ?

                  <div className='felx flex-col items-center gap-2 text-center'>
                    <p className='text-xl font-bold tracking-wider text-violet-400'>יצירת משתמש בוצע בהצלחה  סטטוס 201</p>
                    <button className='w-full p-1 text-center bg-violet-400 mt-4'>לחזרה</button>
                  </div>

                  :

                  <div> 

                    
                <div className='relative flex flex-col items-start mt-4'>
                  <input type="text" className='w-full p-2 bg-white/15 rounded text-center outline-0 text-zinc-400' placeholder='הזן את שם משתמש הרצוי' />
                  <label className='absolute  bottom-2 right-2 opacity-60'>שם משתמש</label>
                </div>

                
                <div className='relative flex flex-col items-start mt-4'>
                  <input type="email" className='w-full p-2 bg-white/15 rounded text-center outline-0 text-zinc-400' placeholder='הזן את האימייל ' />
                  <label className='absolute   bottom-2 right-2 opacity-60'>אימייל</label>
                </div>

                <div className='relative flex flex-col items-start mt-4'>
                  <input type="password" className='w-full p-2 bg-white/15 rounded text-center outline-0 text-zinc-400' placeholder='הזן את הסיסמה ' />
                  <label className='absolute   bottom-2 right-2 opacity-60'>סיסמה</label>
                </div>

                 <div className='relative flex flex-col items-start mt-4'>
                  <input type="password" className='w-full p-2 bg-white/15 rounded text-center outline-0 text-zinc-400' placeholder='אמת את הסיסמה ' />
                  <label className='absolute   bottom-2 right-2 opacity-60'>אימות סיסמה</label>
                </div>
                
                <div className='mt-4'>
                  <button className='w-full p-1 rounded duration-300 active:scale-95 bg-violet-400'>

                    {
                      itLodingNewUser ?

                      <div className='flex items-center justify-center'>
                        <Loader2 className='animate-spin duration-300'/>
                      </div>

                      :
                      <div>  

                        <span>שלח</span>
                      </div>

                    }

                  </button>
                </div>
                  </div>
                }


              </form>

              

            </motion.div>
          )
        }


    </div>
  )
}





















