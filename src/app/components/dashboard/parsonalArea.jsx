










'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion';

 import {    Heart,    ShoppingBag,    User,    Plus,    MapPin, 
  FileText,    Zap,    Sparkles,
  CheckCircle2,   Package,   Edit3,   Trash2,   Bell,   LayoutDashboard,   Clock,   ExternalLink,   ChevronLeft,   PlusCircle,  Settings2Icon ,
  BookDashed,
  View,
  Gift,
  X,
  GemIcon} from "lucide-react";


export default function ParsonalArea2({name}) {

  const[active , setActive] = useState('1')
  const[activeLastOrder , setActiveLastOrder] = useState('01')



  const navTabLinks = [

    {id:'1' ,name:'לוח בקרה אישי' , harf:'#'  ,icon:<LayoutDashboard className='size-5'/>} ,
    {id:'2' ,name:'הפוסטים שלי' , harf:'/posts'  ,icon:<FileText className='size-5'/>} ,
    {id:'3' ,name:'יצירת פוסט' , harf:'/edit'  ,icon:<Edit3 className='size-5'/>} ,
    {id:'4' ,name:'פרופיל משתמש' , harf:'/profile'  ,icon:<User className='size-5'/>} 

  ]

  const lastsOrder = [
    {id:'01' , date:'25.1.26' ,itemName:'מחשב נייד אסוס' , price:'3800$' , status:'נמסר'}  ,
    {id:'02' , date:'22.1.26' ,itemName:'מקלדת מכנית' , price:'330$' , status:'נמסר'}  ,
    {id:'03' , date:'21.1.26' ,itemName:'מסך מחשב ' , price:'130$' , status:'בדרך'}  ,
    {id:'04' , date:'20.1.26' ,itemName:' כרטיס מסך ' , price:'30$' , status:'נמסר'}  
  ]


  const wishlist = [
    {id:'001' , itemName:'apple watch' , brand:'apple' , price:'200$'} ,
    {id:'002' , itemName:'macbook' , brand:'apple' , price:'3200$'} ,
    {id:'003' , itemName:'מחשב נייד' , brand:'asus' , price:'200$'} ,
    {id:'004' , itemName:'lcd 78 tv' , brand:'LG' , price:'200$'} ,
  ]
  
  
  const  myOrder= [

    {id:'0001' , itemName:'lcd 78 tv' , brand:'LG' , price:'200$'} ,
    {id:'002' , itemName:'macbook' , brand:'apple' , price:'3200$'} ,

  ]

  const buyNow = [

    {id:'00001' , itemName:'מקלדת'  ,price:'20$'} ,
    {id:'00001' , itemName:'עכבר'  ,price:'13$'} ,

  ]

  return (
    <div className='h-screen bg-linear-to-tr from-black to-violet-800/30 w-full overflow-auto flex flex-col pt-16 p-6' dir='rtl'>

      <div className='flex justify-between w-full'>

        <div className='flex flex-col gap-1'>
          <p className='flex items-center gap-2 tracking-widest font-bold text-xs xl:border-b '>החשבון שלי. הביצועים שלך  <span className=' text-violet-400'><Sparkles className='size-4'/> </span></p>
          <p className='text-3xl tracking-tighter font-bold text-shadow-2xs text-shadow-violet-100 p-2'>האזור האישי {name}</p>
        </div>

        <div className='grid grid-cols-1 2xl:grid-cols-4 gap-x-8 bg-white/20 px-4 rounded-xl'  >
          {navTabLinks?.map((item , i) => (
            <button onClick={() => setActive(item.id)} key={i} className={`w-full  gap-1 items-center p-1 border-r px-2  my-4 rounded text-zinc-400 duration-300 transition-all ${active === item.id ? 'bg-violet-400'  : 'hover:bg-white/5 duration-300'}`}>
              <div className='flex items-center gap-1 text-[10pt] font-bold tracking-widest '>
                <span className={`${active == item.id ? 'bg-white' : ''}`}>{item.icon}</span>
                <span className={`${active == item.id ? 'text-white' : 'text-zinc-400'}`}> {item.name}</span>
              </div>
            </button>
          ))}
        </div>

      </div>

      {
        active === '1'  && (

          <motion.div  className='w-full h-full'
          initial={{opacity:0 , y:20}}
          animate={{opacity:1 , y:0}}
          exit={{opacity:0}}
          transition={{duration:0.9, ease:'easeIn'}}
          >


                <div className='mt-20 flex flex-col gap-4 '>

        <div className='flex gap-2 items-center justify-center xl:justify-start'>
          <span><BookDashed/></span>
        <h4 className='text-white tracking-tighter font-bold text-2xl border-r p-2'>לוח בקרה אישי והעדפות אישיות</h4>
        </div>

        <div className='flex flex-col gap-4 items-center xl:items-start'>
          <h1 className='text-violet-400 tracking-tighter font-extralight text-4xl xl:text-6xl'>ברוך הבא , {name}</h1>
          <h2 className='text-sm font-bold tracking-widest w-[60%] text-shadow-2xs text-shadow-amber-100 '>מרכז השליטה שלך פעיל. המערכת מנותחת ומותאמת אישית לביצועים המקסימליים שלך היום.</h2>
        </div>

      </div>


      <div className='mt-20 grid xl:grid-cols-3 items-center  xl:gap-10 gap-5 xl:p-20 p-5'>


        <div className='p-4 rounded-xl  shadow-md border-t shadow-white/20  flex flex-col bg-linear-to-br from-black to-violet-800/15 duration-500 hover:scale-100 hover:bg-linear-to-bl hover:from-black hover:to-violet-700/20 hover:duration-500 '>
        <div className='flex justify-between  p-4'>

          <div className='flex gap-2 items-center text-2xl tracking-tighter font-bold text-violet-400 opacity-65'>
            <span><Clock/></span>
            <p>נרכשו לאחרונה</p>
          </div>

          <div className='flex gap-2 items-center text-xs text-zinc-400 font-bold tracking-wider '>
          <span ><View className='size-4'/></span>
          <p>כל ההזמנות</p>
          </div>

        </div>



          <div  className='grid grid-cols-5 mt-10'>
            <p className='text-xs font-bold tracking-widest text-zinc-400 opacity-80'>מספר הזמנה</p>
            <p className='text-xs font-bold tracking-widest text-zinc-400 opacity-80'> תאריך הזמנה</p>
            <p className='text-xs font-bold tracking-widest text-zinc-400 opacity-80'> שם המוצר</p>
            <p className='text-xs font-bold tracking-widest text-zinc-400 opacity-80'> מחיר</p>
            <p className='text-xs font-bold tracking-widest text-zinc-400 opacity-80'> סטטסוס</p>
          </div>

          <hr className='my-2' />

          <div className='w-full h-ful relative '>
            {lastsOrder?.map((item , i) => (
              <div key={i} onClick={() => setActiveLastOrder(item.id)}  className=' grid border-b grid-cols-5 my-4 text-zinc-400 hover:bg-white/10 duration-300 rounded p-1 cursor-pointer'>
                <p className='text-xs xl:text-[12pt]  font-extrabold'>{item.id}</p>
                <p className='text-xs xl:text-[12pt]  font-extrabold'>{item.date}</p>
                <p className='text-xs xl:text-[12pt]  font-extrabold'>{item.itemName}</p>
                <p className='text-xs xl:text-[12pt]  font-extrabold'>{item.price}</p>
                <p className='text-xs xl:text-[12pt]  font-extrabold'>{item.status}</p>
                <span className={`${activeLastOrder === item.id  ? 'xl:w-3  xl:h-3 h-2 w-2  rounded-full bg-violet-400 animate-spin absolute left-0 mt-1' : ''}`}/>
              </div>
            ))}
          </div>
        </div>



        <div className='bg-linear-to-tr p-5 from-black to-cyan-700/30 hover:duration-500 hover:scale-100  hover:bg-linear-to-tl  hover:from-black hover:to-cyan-900/30p-4 rounded-2xl shadow-md shadow-white/40 border-t '>
        <div className=''>

          <div className='flex items-center justify-around'>
            <p className='text-4xl opacity-80 text-cyan-800 tracking-tighter font-bold'>רשימת המשאלות שלי</p> 
            <p><Heart className='text-red-600 fill-red-400 size-12'/></p>
          </div>

          <div className='grid grid-cols-3 items-center text-center mt-8 text-zinc-400 font-bold tracking-widest '>
            <p className='text-xs border-r'>שם המוצר</p>
            <p className='text-xs border-r'>חברה</p>
            <p className='text-xs border-r'>מחיר</p>
          </div>

          <hr className='my-4' />


          <div>
            {wishlist?.map(( item ,i) => (
              <div key={i}  className={`grid grid-cols-3 items-center text-center hover:bg-white/10 duration-300 rounded  ${i % 2 === 0 ? 'bg-violet-400/30' : 'bg-cyan-800/25'}`  }>
                <p className='text-[11pt] font-bold tracking-tighter my-4'>{item.itemName}</p>
                <p className='text-[11pt] font-bold tracking-tighter my-4'>{item.brand}</p>
                <p className='text-[11pt] font-bold tracking-tighter my-4'>{item.price}</p>
              </div>
            ))}
          </div>

        </div>
        </div>




        <div className='mt-10 rounded-3xl w p-4 bg-linear-to-tr border-t from-black to-emerald-700/40 hover:bg-linear-to-tl hover:from-black hover:to-emerald-900/70 shadow-md hover:duration-500 hover:scale-100 min-h-[250px] shadow-white/20'>
        <div className='flex justify-around text-4xl'>
          <span className='tracking-wider font-bold'>המוצרים שלי</span>

          <span> <Gift className='size-10 fill-emerald-600'/>  </span>
        </div>

        <div className='grid grid-cols-3 items-center text-center mt-10'>
          <p className='border-l bg-white/15 p-2 rounded'>שם המוצר</p>
          <p className='border-l bg-white/15 p-2 rounded'>חברה</p>
          <p className='border-l bg-white/15 p-2 rounded'>מחיר</p>
        </div>

        <div className='relative'>
          {myOrder?.map((item ,i) => (
            <div key={i} className='grid grid-cols-3 items-center text-center hover:bg-white/10 duration-300 cursor-pointer rounded'>
              <p className='my-2 font-bold tracking-widest '>{item.itemName}</p>
              <p className='my-2 font-bold tracking-widest '>{item.brand}</p>
              <p className='my-2 font-bold tracking-widest '>{item.price}</p>
              <span className='absolute right-0'><X className='size-4 hover:scale-150 duration-300'/></span>
             </div>
          ))}
        </div>
        </div>


        

        <div className=' min-h-[200px] p-4 rounded-3xl bg-linear-to-tr from-black to-red-600/30 hover:bg-linear-to-tl hover:from-black hover:to-red-700/30 border border-white/10 hover:duration-300 hover:scale-105 mt-10 '>
        <div className='flex justify-between '>
          <span  className='text-xl tracking-widest font-bold'>קנה עכשיו</span>
          <span ><GemIcon/></span>
        </div>

        <div className='grid grid-cols-2 text-center items-center font-bold mt-4 border-b border-t'> 
          <p>שם המוצר</p>
          <p>מחיר</p>
        </div>

        <div className='relative'>
          {buyNow?.map((item ,i) => (
            <div key={i} className='grid grid-cols-2 text-center items-center'> 
              <p className='my-2'>{item.itemName}</p>
              <p className='my-2'>{item.price}</p>
              <span className='absolute right-0'><Plus className='opacity-50 hover:scale-105 duration-500'/></span>
            </div>
          ))}
        </div>
        </div>



         <div className='w- min-h-[200px] p-4 rounded-3xl bg-linear-to-tr from-black to-red-600/30 hover:bg-linear-to-tl hover:from-black hover:to-red-700/30 border border-white/10 hover:duration-300 hover:scale-105 mt-10 '>
        <div className='flex justify-between '>
          <span  className='text-xl tracking-widest font-bold'>קנה עכשיו</span>
          <span ><GemIcon/></span>
        </div>

        <div className='grid grid-cols-2 text-center items-center font-bold mt-4 border-b border-t'> 
          <p>שם המוצר</p>
          <p>מחיר</p>
        </div>

        <div className='relative'>
          {buyNow?.map((item ,i) => (
            <div key={i} className='grid grid-cols-2 text-center items-center'> 
              <p className='my-2'>{item.itemName}</p>
              <p className='my-2'>{item.price}</p>
              <span className='absolute right-0'><Plus className='opacity-50 hover:scale-105 duration-500'/></span>
            </div>
          ))}
        </div>
        </div>



         <div className=' min-h-[200px]  p-4 rounded-3xl bg-linear-to-tr from-black to-red-600/30 hover:bg-linear-to-tl hover:from-black hover:to-red-700/30 border border-white/10 hover:duration-300 hover:scale-105 mt-10 '>
        <div className='flex justify-between '>
          <span  className='text-xl tracking-widest font-bold'>קנה עכשיו</span>
          <span ><GemIcon/></span>
        </div>

        <div className='grid grid-cols-2 text-center items-center font-bold mt-4 border-b border-t'> 
          <p>שם המוצר</p>
          <p>מחיר</p>
        </div>

        <div className='relative'>
          {buyNow?.map((item ,i) => (
            <div key={i} className='grid grid-cols-2 text-center items-center'> 
              <p className='my-2'>{item.itemName}</p>
              <p className='my-2'>{item.price}</p>
              <span className='absolute right-0'><Plus className='opacity-50 hover:scale-105 duration-500'/></span>
            </div>
          ))}
        </div>
        </div>







      </div>




      </ motion.div>
        )
      }

    
      
    </div>
  )
}
