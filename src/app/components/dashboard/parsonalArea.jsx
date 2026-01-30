










'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';



import {
  Heart, ShoppingBag, User, Plus, MapPin,
  FileText, Zap, Sparkles,
  CheckCircle2, Package, Edit3, Trash2, Bell, LayoutDashboard, Clock, ExternalLink, ChevronLeft, PlusCircle, Settings2Icon,
  BookDashed,
  View,
  Gift,
  X,
  GemIcon,
  File,
  Loader,
  Edit,
  TextInitialIcon,
  Camera,
  Shield,
  Timer,
  LogOut,
  Settings,
  Settings2,
  DollarSign,
  AlertTriangleIcon,
  LocationEdit,
  LockKeyholeIcon,
  ShoppingCart,
  Computer,
  KeyboardIcon,
  LucideMouse,
  PlusIcon,
  Minus

} from "lucide-react";
import { useForm } from 'react-hook-form';
import axios from 'axios';



export default function ParsonalArea2({ name, role, email, createdAt, logOut }) {




  // עדכון כמות מוצרים פלוס או מינוס 
  const updateQty = (id , delta) => {

    setItemCart(_arry => _arry.map(item => item.id === id ? {...item ,qty:Math.max(1 , item.qty + delta)} : item))

  }


  const removeFromCart = (_id) => {

    setItemCart(_array => _array.filter( item => item.id !== _id))

  }


    
    
    
  //   // הסרת מוצר מהעגלה
  // const removeFromCart = (_id) => {
    
  //   setItemCart(_arrry => _arrry.filter(item => item.id !== _id))

  // }






  const [active, setActive] = useState('1')
  const [activeLastOrder, setActiveLastOrder] = useState('01')
  const [itemCart, setItemCart] = useState(
    [
      { id: '1', itemName: 'מחשב נייד אסוס', price: 5400, qty: 1, img: <Computer className='size-12 p-2 rounded-full bg-violet-400 shadow-2xl' /> },
      { id: '2', itemName: 'מקלדת מכנית', price: 400, qty: 1, img: <KeyboardIcon className='size-12 p-2 rounded-full bg-violet-400 shadow-2xl' /> },
      { id: '3', itemName: 'עכבר גיימינג', price: 200, qty: 1, img: <LucideMouse className='size-12 p-2 rounded-full bg-violet-400 shadow-2xl' /> }
    ]
  )

  const { register, formState: { errors }, handleSubmit, reset } = useForm()
  const [loading, setLoading] = useState(false)
  const [itSent, setItsSents] = useState(false)

  const [arrPost, setArryPost] = useState([])



  const doForm = async (_data) => {

    try {
      setLoading(true)

      const resp = await axios.post('/api/posts', _data)

      if (resp.status === 201) {
        setItsSents(true)
        console.log(_data)

        setTimeout(() => {
          reset()
          setItsSents(false)
        }, 2000)
      }

    } catch (error) {
      console.error(error)
      alert('שליחת הטופס נכשלה')
    } finally {
      setLoading(false)
    }
  }


  const doApiPost = async () => {
    try {
      const url = `/api/posts`
      const resp = await axios.get(url)
      if (resp.status === 200) {
        // בדיקה שמה שחוזר הוא אכן מערך, אם לא - הפיכה למערך
        setArryPost(resp.data.data)
        console.log(resp.data.data)
      }
    } catch (error) {
      console.log('שגיאת שרת בקבלת פוסטים')
      setArryPost([]) // איפוס במקרה שגיאה
    }
  }


  useEffect(() => {
    doApiPost()
  }, [])




  const navTabLinks = [

    { id: '1', name: 'לוח בקרה אישי', harf: '#', icon: <LayoutDashboard className='size-5' /> },
    { id: '2', name: 'הפוסטים שלי', harf: '/posts', icon: <FileText className='size-5' /> },
    { id: '3', name: 'יצירת פוסט', harf: '/edit', icon: <Edit3 className='size-5' /> },
    { id: '4', name: 'פרופיל משתמש', harf: '/profile', icon: <User className='size-5' /> },
    { id: '5', name: 'סל קניות', harf: '/buy', icon: <ShoppingCart className='size-5' /> }

  ]

  const lastsOrder = [
    { id: '01', date: '25.1.26', itemName: 'מחשב נייד אסוס', price: '3800$', status: 'נמסר' },
    { id: '02', date: '22.1.26', itemName: 'מקלדת מכנית', price: '330$', status: 'נמסר' },
    { id: '03', date: '21.1.26', itemName: 'מסך מחשב ', price: '130$', status: 'בדרך' },
    { id: '04', date: '20.1.26', itemName: ' כרטיס מסך ', price: '30$', status: 'נמסר' }
  ]


  const wishlist = [
    { id: '001', itemName: 'apple watch', brand: 'apple', price: '200$' },
    { id: '002', itemName: 'macbook', brand: 'apple', price: '3200$' },
    { id: '003', itemName: 'מחשב נייד', brand: 'asus', price: '200$' },
    { id: '004', itemName: 'lcd 78 tv', brand: 'LG', price: '200$' },
  ]


  const myOrder = [

    { id: '0001', itemName: 'lcd 78 tv', brand: 'LG', price: '200$' },
    { id: '002', itemName: 'macbook', brand: 'apple', price: '3200$' },

  ]

  const buyNow = [

    { id: '00001', itemName: 'מקלדת', price: '20$' },
    { id: '00001', itemName: 'עכבר', price: '13$' },

  ]

  const profileAccount = [

    { name: 'אמצעי תשלום', desc: 'עדכון אמעצי תשלום', icon: <DollarSign className='text-cyan-600' /> },
    { name: 'התראות', desc: 'ניהול התראות', icon: <AlertTriangleIcon className='text-violet-500' /> },
    { name: 'כתובת', desc: ' שינוי כתובת', icon: <LocationEdit className='text-red-600' /> },
    { name: 'אבטחת חשבון', desc: ' ניהול סיסמאות ואבטחה דו שלבית', icon: <LockKeyholeIcon className='text-emerald-800' /> },


  ]




  return (
    <div className='h-screen bg-linear-to-tr from-black to-violet-800/30 w-full overflow-auto flex flex-col pt-16 p-6' dir='rtl'>

      <div className='flex justify-between w-full'>

        <div className='flex flex-col gap-1'>
          <p className='flex items-center gap-2 tracking-widest font-bold text-xs xl:border-b '>החשבון שלי. הביצועים שלך  <span className=' text-violet-400'><Sparkles className='size-4' /> </span></p>
          <p className='text-3xl tracking-tighter font-bold text-shadow-2xs text-shadow-violet-100 p-2'>האזור האישי {name}</p>
        </div>

        <div className='grid grid-cols-1 2xl:grid-cols-5 gap-x-8 bg-white/20 px-4 rounded-xl'  >
          {navTabLinks?.map((item, i) => (
            <button onClick={() => setActive(item.id)} key={i} className={`w-full  gap-1 items-center p-1 border-r px-2  my-4 rounded text-zinc-400 duration-300 transition-all ${active === item.id ? 'bg-violet-400' : 'hover:bg-white/5 duration-300'}`}>
              <div className='flex items-center gap-1 text-[10pt] font-bold tracking-widest '>
                <span className={`${active == item.id ? 'bg-white' : ''}`}>{item.icon}</span>
                <span className={`${active == item.id ? 'text-white' : 'text-zinc-400'}`}> {item.name}</span>
              </div>
            </button>
          ))}
        </div>

      </div>

      {
        active === '1' && (

          <motion.div className='w-full h-full'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeIn' }}
          >


            <div className='mt-20 flex flex-col gap-4 '>

              <div className='flex gap-2 items-center justify-center xl:justify-start'>
                <span><BookDashed /></span>
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
                    <span><Clock /></span>
                    <p>נרכשו לאחרונה</p>
                  </div>

                  <div className='flex gap-2 items-center text-xs text-zinc-400 font-bold tracking-wider '>
                    <span ><View className='size-4' /></span>
                    <p>כל ההזמנות</p>
                  </div>

                </div>



                <div className='grid grid-cols-5 mt-10'>
                  <p className='text-xs font-bold tracking-widest text-zinc-400 opacity-80'>מספר הזמנה</p>
                  <p className='text-xs font-bold tracking-widest text-zinc-400 opacity-80'> תאריך הזמנה</p>
                  <p className='text-xs font-bold tracking-widest text-zinc-400 opacity-80'> שם המוצר</p>
                  <p className='text-xs font-bold tracking-widest text-zinc-400 opacity-80'> מחיר</p>
                  <p className='text-xs font-bold tracking-widest text-zinc-400 opacity-80'> סטטסוס</p>
                </div>

                <hr className='my-2' />

                <div className='w-full h-ful relative '>
                  {lastsOrder?.map((item, i) => (
                    <div key={i} onClick={() => setActiveLastOrder(item.id)} className=' grid border-b grid-cols-5 my-4 text-zinc-400 hover:bg-white/10 duration-300 rounded p-1 cursor-pointer'>
                      <p className='text-xs xl:text-[12pt]  font-extrabold'>{item.id}</p>
                      <p className='text-xs xl:text-[12pt]  font-extrabold'>{item.date}</p>
                      <p className='text-xs xl:text-[12pt]  font-extrabold'>{item.itemName}</p>
                      <p className='text-xs xl:text-[12pt]  font-extrabold'>{item.price}</p>
                      <p className='text-xs xl:text-[12pt]  font-extrabold'>{item.status}</p>
                      <span className={`${activeLastOrder === item.id ? 'xl:w-3  xl:h-3 h-2 w-2  rounded-full bg-violet-400 animate-spin absolute left-0 mt-1' : ''}`} />
                    </div>
                  ))}
                </div>
              </div>



              <div className='bg-linear-to-tr p-5 from-black to-cyan-700/30 hover:duration-500 hover:scale-100  hover:bg-linear-to-tl  hover:from-black hover:to-cyan-900/30p-4 rounded-2xl shadow-md shadow-white/40 border-t '>
                <div className=''>

                  <div className='flex items-center justify-around'>
                    <p className='text-4xl opacity-80 text-cyan-800 tracking-tighter font-bold'>רשימת המשאלות שלי</p>
                    <p><Heart className='text-red-600 fill-red-400 size-12' /></p>
                  </div>

                  <div className='grid grid-cols-3 items-center text-center mt-8 text-zinc-400 font-bold tracking-widest '>
                    <p className='text-xs border-r'>שם המוצר</p>
                    <p className='text-xs border-r'>חברה</p>
                    <p className='text-xs border-r'>מחיר</p>
                  </div>

                  <hr className='my-4' />


                  <div>
                    {wishlist?.map((item, i) => (
                      <div key={i} className={`grid grid-cols-3 items-center text-center hover:bg-white/10 duration-300 rounded  ${i % 2 === 0 ? 'bg-violet-400/30' : 'bg-cyan-800/25'}`}>
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

                  <span> <Gift className='size-10 fill-emerald-600' />  </span>
                </div>

                <div className='grid grid-cols-3 items-center text-center mt-10'>
                  <p className='border-l bg-white/15 p-2 rounded'>שם המוצר</p>
                  <p className='border-l bg-white/15 p-2 rounded'>חברה</p>
                  <p className='border-l bg-white/15 p-2 rounded'>מחיר</p>
                </div>

                <div className='relative'>
                  {myOrder?.map((item, i) => (
                    <div key={i} className='grid grid-cols-3 items-center text-center hover:bg-white/10 duration-300 cursor-pointer rounded'>
                      <p className='my-2 font-bold tracking-widest '>{item.itemName}</p>
                      <p className='my-2 font-bold tracking-widest '>{item.brand}</p>
                      <p className='my-2 font-bold tracking-widest '>{item.price}</p>
                      <span className='absolute right-0'><X className='size-4 hover:scale-150 duration-300' /></span>
                    </div>
                  ))}
                </div>
              </div>




              <div className=' min-h-[200px] p-4 rounded-3xl bg-linear-to-tr from-black to-red-600/30 hover:bg-linear-to-tl hover:from-black hover:to-red-700/30 border border-white/10 hover:duration-300 hover:scale-105 mt-10 '>
                <div className='flex justify-between '>
                  <span className='text-xl tracking-widest font-bold'>קנה עכשיו</span>
                  <span ><GemIcon /></span>
                </div>

                <div className='grid grid-cols-2 text-center items-center font-bold mt-4 border-b border-t'>
                  <p>שם המוצר</p>
                  <p>מחיר</p>
                </div>

                <div className='relative'>
                  {buyNow?.map((item, i) => (
                    <div key={i} className='grid grid-cols-2 text-center items-center'>
                      <p className='my-2'>{item.itemName}</p>
                      <p className='my-2'>{item.price}</p>
                      <span className='absolute right-0'><Plus className='opacity-50 hover:scale-105 duration-500' /></span>
                    </div>
                  ))}
                </div>
              </div>



              <div className='w- min-h-[200px] p-4 rounded-3xl bg-linear-to-tr from-black to-red-600/30 hover:bg-linear-to-tl hover:from-black hover:to-red-700/30 border border-white/10 hover:duration-300 hover:scale-105 mt-10 '>
                <div className='flex justify-between '>
                  <span className='text-xl tracking-widest font-bold'>קנה עכשיו</span>
                  <span ><GemIcon /></span>
                </div>

                <div className='grid grid-cols-2 text-center items-center font-bold mt-4 border-b border-t'>
                  <p>שם המוצר</p>
                  <p>מחיר</p>
                </div>

                <div className='relative'>
                  {buyNow?.map((item, i) => (
                    <div key={i} className='grid grid-cols-2 text-center items-center'>
                      <p className='my-2'>{item.itemName}</p>
                      <p className='my-2'>{item.price}</p>
                      <span className='absolute right-0'><Plus className='opacity-50 hover:scale-105 duration-500' /></span>
                    </div>
                  ))}
                </div>
              </div>



              <div className=' min-h-[200px]  p-4 rounded-3xl bg-linear-to-tr from-black to-red-600/30 hover:bg-linear-to-tl hover:from-black hover:to-red-700/30 border border-white/10 hover:duration-300 hover:scale-105 mt-10 '>
                <div className='flex justify-between '>
                  <span className='text-xl tracking-widest font-bold'>קנה עכשיו</span>
                  <span ><GemIcon /></span>
                </div>

                <div className='grid grid-cols-2 text-center items-center font-bold mt-4 border-b border-t'>
                  <p>שם המוצר</p>
                  <p>מחיר</p>
                </div>

                <div className='relative'>
                  {buyNow?.map((item, i) => (
                    <div key={i} className='grid grid-cols-2 text-center items-center'>
                      <p className='my-2'>{item.itemName}</p>
                      <p className='my-2'>{item.price}</p>
                      <span className='absolute right-0'><Plus className='opacity-50 hover:scale-105 duration-500' /></span>
                    </div>
                  ))}
                </div>
              </div>







            </div>




          </ motion.div>
        )
      }







      {

        active == '2' && (

          <motion.div className='flex flex-col w-full'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeIn' }}

          >

            <div className='p-4 flex flex-col mt-20 gap-4'>
              <p className='font-extrabold tracking-widest text-zinc-400 opacity-80'>כל מה שפרסמתי במקום אחד</p>

              <div className='flex items-end gap-6 border-l border-r px-4 bg-white/5 py-2 rounded xl:w-[20%]'>
                <span className=''><File className='size-16 border p-3 shadow-md shadow-white/20 rounded-full  bg-fuchsia-300' /></span>
                <p className='text-4xl tracking-tighter font-bold text-violet-400 text-shadow-2xs text-shadow-yellow-400 opacity-80'>הפוסטים שלי</p>
              </div>


              <div className='mt-10 grid xl:grid-cols-2 gap-10 '>

                {arrPost?.map((item, i) => (
                  <div key={i} className={`flex flex-col items-center gap-4 p-10 shadow-xl shadow-white/5 duration-500 transition-all hover:border-t my-4 rounded-md hover:scale-100   ${i % 2 == 0 ? 'bg-linear-to-tr from-black to-cyan-800/50 hover:bg-linear-to-tl hover:from-black hover:to-cyan-600/50  ' : 'bg-linear-to-tr from-black to-teal-700/50 hover:bg-linear-to-tl  hover:from-black hover:to-teal-500/50 '}`}>

                    <div className='w-full flex justify-between items-center '>
                      <span className='cursor-pointer active:scale-95 '>{<FileText className='size-8 text-violet-500 shadow' />} </span>

                      <div className='flex items-center gap-10 '>
                        <span className='cursor-pointer active:scale-95'><Edit className='size-4' /></span>
                        <span className='cursor-pointer active:scale-95'><Trash2 className='size-4' /></span>
                      </div>
                    </div>

                    <p className='text-zinc-400 tracking-widest text-xs border-b'>{item.title}</p>

                    <p className='text-zinc-400 tracking-widest '>{item.content}</p>

                    <div className=' grid xl:grid-cols-3  items-center w-full pt-20 gap-2 '>
                      <span><Heart className='text-red-600 hover:fill-red-600 duration-500' /></span>
                      <span className='flex items-center flex- gap-2'><User className='text-violet-200 rounded-full p-1 bg-violet-400 shadow  hover:fill-violet-100 duration-500' /> <span>  {item.author.name}   </span> </span>
                      <p>{item.createdAt}</p>
                    </div>



                  </div>
                ))}

              </div>

            </div>



          </motion.div>
        )
      }






      {
        active == '3' && (

          <motion.div className='flex flex-col w-full'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeIn' }}

          >

            <div className='p-4 flex flex-col mt-20'>

              <div className='flex items-end gap-6 border-l border-r px-4 bg-white/5 py-2 rounded xl:w-[30%]'>
                <span className=''><Edit className='size-16 border p-3 shadow-md shadow-white/20 rounded-full  bg-cyan-600' /></span>
                <p className='text-4xl tracking-tighter font-bold text--400 text-shadow-2xs text-shadow-yellow-400 opacity-80'>יצירת פוסט חדש</p>
              </div>

              <div className='flex flex-col justify-center w-full h-full mt-20 items-center p-10'>

                <form onSubmit={handleSubmit(doForm)} className='flex flex-col justify-between xl:w-[60%] xl:h-[50vh] w-full h-full font-bold p-2 rounded-xl shadow-md hover:border-t duration-300 transition-all shadow-white/20 hover:scale-100 bg-linear-to-tr from-black to-cyan-700/40   hover:bg-linear-to-tl hover:from-black hoverLto-cyan-800/40 hover:duration-500 hover:scale-105 '>

                  {
                    itSent ?

                      <div className='flex flex-col items-center justify-center gap-4 text-zinc-400 p-4 '>

                        <p className='text-4xl flex items-center gap-2 tracking-widest font-bold'>הפוסט פורסם בהצלחה <TextInitialIcon className='size-8' /> </p>
                        <p></p>

                      </div>

                      :

                      <div>

                        <div className='flex flex-col items-start p-2 '>
                          <label className='text-xl p-2 text-zinc-400 opacity-80'>כותרת</label>
                          <input  {...register('title', { min: 5, max: 60, required: true })} type='text' className='w-full p-1 rounded  bg-white/10 text-center outline-0 py-2 hover:bg-gray-200/20 duration-300 ' placeholder='הכותרת של הפוסט' />
                          {errors.title && (<span className='text-red-600 tracking-widest font-bold text-xs'>מינימום 5 תווים מקס 99</span>)}
                        </div>


                        <div className='mt-4 p-2 flex flex-col items-start'>
                          <label className='text-xl p-2 text-zinc-400 opacity-80'>תוכן הפוסט</label>

                          <textarea {...register('content', { min: 10, max: 999, required: true })} className='w-full p-1 rounded  bg-white/10 text-center outline-0 py-2 hover:bg-gray-200/20 duration-300 ' rows={6} cols={4} placeholder='יש לרשום את תוכן הפוסט '>

                          </textarea>
                          {errors.content && (<span className='text-red-600 tracking-widest font-bold text-xs'>מינימום 10 תווים  99</span>)}

                        </div>

                        <div className='mt-4 flex flex-col items-center p-2'>

                          <button className='w-full shadow sahdow-md p-2 bg-violet-400 text-white  rounded-md shadow-white/30 active:scale-90 duration-300 hover:bg-violet-700' type='submit'>

                            {loading

                              ?
                              <div>
                                <span className='flex items-center justify-center gap-2'><Loader className='animate-spin duration-300' /> אנא המתן...</span>
                              </div>

                              :
                              <div>
                                <span>פרסום פוסט</span>
                              </div>

                            }

                          </button>

                        </div>

                      </div>
                  }

                </form>

                <div />

              </div>

            </div>


          </motion.div>
        )
      }








      {
        active == '4' && (



          <motion.div className='flex flex-col w-full'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeIn' }}

          >

            <div className='p-4 flex flex-col mt-20'>

              <div className='flex items-end gap-6 border-l border-r px-4 bg-white/5 py-2 rounded xl:w-[40%]'>
                <span className=''><Edit className='size-16 border p-3 shadow-md shadow-white/20 rounded-full  bg-emerald-500' /></span>
                <p className='text-4xl tracking-tighter font-bold text--400 text-shadow-2xs text-shadow-yellow-400 opacity-80'>פרופיל המשתמש שלי {name}</p>
              </div>
            </div>


            <div className='mt-10 flex flex-col xl:flex-row w-full justify-between items-center p-6 shadow-2xl shadow-white/10 rounded-2xl bg-linear-to-tr from-violet-950 to-black/10'  >

              <div className='flex flex-col xl:flex-row  items-end justify-center xl:gap-20'>

                <div className='p-4 rounded-xl shadow-md flex relative items-center justify-center shadow-white/25 bg-linear-to-tr h-[200px] w-[200px]  from-black to-emerald-700/35'>
                  <span><User className='size-28 ' /></span>
                  <span className='absolute right-2 bottom-0 p-1 rounded-full bg-violet-400 active:scale-105'><Camera className=' hover:active:scale-110 duration-300' /></span>
                </div>

                <div className='flex items-end gap-10 text-zinc-400 opacity-85 text-xs font-bold tracking-widest'>
                  <span className='flex items-end gap-1'> <Shield className='fill-cyan-800' /> <p> {role} </p> </span>
                  <span className='flex items-end gap-1'> <Timer /> <p> {createdAt} </p> </span>
                </div>

              </div>





              <div className='flex items-center gap-5'>
                <p className='font-bold -tracking-wider text-2xl border-l pl-2 text-shadow-2xs text-shadow-amber-500 '> יציאה מהמערכת</p>
                <button onClick={() => logOut()} className='p-1 rounded-xl bg-violet-400 shadow-md shadow-white/30 active:scale-95 duration-300'><LogOut className='size-11' />   </button>
              </div>

            </div>



            <div className=' w-[100%] xl:min:h-[50vh] rounded-xl  bg-linear-to-tr from-violet-950 to-black/10  mt-10 p-10 flex gap-4 flex-col xl:flex-row justify-between'>


              <div className='h-full w-full xl:w-[70%] bg-white/5 rounded-4xl '>

                <form className='w-full p-10'>

                  <div className='flex items-start  gap-1'>
                    <span><Settings className='size-10 text-zinc-400' /></span>
                    <p className='text-zinc-400 tracking-widest font-bold text-2xl'>פרטים אישיים</p>
                  </div>

                  <div className='mt-10 text-zinc-400 font-bold text-xl flex gap-2 w-full'>
                    <div className='flex flex-col items-start space-y-1 w-full relative'>
                      <label className='xl:text-2xl text-[6pt] absolute bottom-0.5 right-4 hidden xl:block'>שם משתמש</label>
                      <input type='text' className='text-center hover:scale-95  xl:text-xl text-[6pt] w-full bg-white/15 rounded-md p-2 duration-300 hover:bg-gray-300/30' placeholder={name} />
                    </div>

                    <div className='flex flex-col items-start space-y-1 w-full relative'>
                      <label className='xl:text-2xl text-[6pt] absolute bottom-0.5 right-4 hidden xl:block'>אימייל</label>
                      <input type='email' className='text-center hover:scale-95  xl:text-xl text-[6pt] w-full bg-white/15 rounded-md p-2 duration-300 hover:bg-gray-300/30' placeholder={email} />
                    </div>
                  </div>

                  <div className='flex flex-col items-start space-y-1 w-full relative mt-10 text-zinc-400 font-bold'>
                    <label className='xl:text-2xl text-[6pt]absolute bottom-0.5 right-4 hidden xl:block'> הרשאות משתמש </label>
                    <input type='text' className='text-center hover:scale-95  xl:text-xl text-[6pt] w-full bg-white/15 rounded-md p-2 duration-300 hover:bg-gray-300/30' placeholder={role} />
                  </div>


                  <div className='flex flex-col items-start space-y-1 w-full relative mt-10 text-zinc-400 font-bold'>
                    <label className='xl:text-2xl text-[6pt] absolute bottom-0.5 right-4 hidden xl:block'> תאריך הצטרפות</label>
                    <input type='text' className='text-center hover:scale-95 xl:text-xl text-[6pt] w-full bg-white/15 rounded-md p-2 duration-300 hover:bg-gray-300/30' placeholder={createdAt} />
                  </div>

                  <div className='mt-10'>
                    <button className='p-2 rounded bg-violet-400 w-full text-white active:scale-105 duration-300 '> שמירה</button>
                  </div>

                </form>

              </div>



              <div className='h-full w-full xl:w-[29%] bg-white/5 rounded-4xl '>



                <div className='flex items-center p-4 justify-center gap-1'>
                  <span><Settings2 /></span>
                  <p>הגדרות חשבון</p>
                </div>

                <div className='grid grid-cols-1 gap-10 p-10  '>
                  {profileAccount?.map((item, i) => (
                    <div key={i} className='rounded-xl flex flex-col text-center items-center shadow-xl p-4 active:scale-95 duration-300 shadow-white/5  bg-linear-to-tr from-violet-900 to-black/15'>

                      <div className='flex gap-4 items-center w-full text-center '>

                        <div>
                          <p>{item.icon}</p>
                        </div>

                        <div className='flex flex-col ga-2 items-center text-center '>
                          <p className='text-xs font-bold tracking-widest text-zinc-400'>{item.desc}</p>

                        </div>


                      </div>


                    </div>
                  ))}
                </div>


              </div>


            </div>


          </motion.div>
        )
      }




      {

        active === '5' && (

          <motion.div className='flex flex-col w-full h-full'


            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeIn' }}


          >


            <div className='mt-20'>

              <div className='flex items-center gap-4'>

                <span className='p-4 rounded-full bg-violet-400'><ShoppingCart className='size-12' /></span>

                <div className='flex flex-col items-start gap-2'>
                  <p className='text-5xl font-bold tracking-wider'>סל הקניות שלי</p>
                  <p className='text-xs font-bold tracking-widest text-red-600 opacity-80 border-b animate-pulse'> ממתינים לך 3 פריטים חדשים </p>
                </div>

              </div>


              <div className='w-full h-[60vh]  mt-20 flex justify-between xl:w-[80%]  mx-auto '>

                <div className='w-[70%] h-full p-4 bg-linear-to-tr  from-violet-950 to-black/70 rounded-xl shadow-xl shadow-white/10' >

                <div>
                  {
                    itemCart.length > 0

                    ?

                    <div className='grid grid-cols-1 gap-10 items-center justify-center p-2'>
                      {itemCart.map((item , i) => (
                        <div key={i} className='flex items-center gap-4 shadow-xl relative rounded-2xl shadow-white/20 p-4 bg-linear-to-tr from-black via-violet-800/20 hover:scale-95 duration-300 '>

                 
                            <p className=''>{item.img}</p>
                         

                          <div className='flex flex-col items-start p-4 gap-4'>
                            <p className='text-xl tracking-widest font-bold text-violet-400'>שם המוצר:{item.itemName}</p>

                            <div className='flex items-start gap-5'>


                                            <div className='flex items-center bg-black/40 rounded-lg p-1 border border-white/10'> 
                                    <button onClick={() => updateQty(item.id ,-1)}  className='p-1 hover:text-violet-400'><Minus size={16}/></button>
                                    <span className='px-4 font-mono font-bold'>{item.qty}</span>
                                   <button onClick={() => updateQty(item.id , 1)} className='p-1 hover:text-violet-400'><PlusIcon size={16}/></button>
                                </div>
                              <p className='font-bold tracking-widest text-xl'>מחיר:{item.price} $ </p>
                            </div>

                            <span onClick={() => removeFromCart(item.id)} className='absolute left-10 bottom-10 active:scale-95'><Trash2 className=''/></span>
                          </div>

                        </div>
                      ))}
                    </div>

                    :

                    <div className='flex flex-col items-center justify-center text-center gap-2 relative' style={{backgroundImage:<Package/>}}> 

                    <div className='flex flex-col items-center gap-5 absolute top-50'>

                      <div className='flex items-center gap-2'>
                        <span><Package className='animate-bounce size-16'/></span>
                        <p className='text-2xl font-bold animate-bounce text-'>אופס...</p>
                      </div>
                      <p className='text-4xl tracking-widest font-extralight text-shadow-2xs text-shadow-fuchsia-600'>עגלת הקניות שלך ריקה </p>
                      <p className='font-bold anim'>בוא  נתחיל את הקניות שלך .</p>

                    </div>

                    </div>
                  }
                </div>

                </div>


                <div className='w-[28%] flex flex-col gap-10 min:h-[20vh] items-center text-zinc-400 justify-center p-4  font-bold tracking-widest bg-linear-to-tr from-vwhite via-violet-100/10 rounded-3xl shadow-xl shadow-white/10 '>

                <p className='border-b font-bold tracking-widest text-2xl text-violet-400 '>סיכום הזמנה</p>

                
                  <span className='mt-4 items-start text-start '>סכום ביניים</span>

                <div className='flex justify-between w-full mt-4 text-center items-center'>
                  <span className='text-xl'> מוצר </span>
                  <span> מחיר </span>
                </div>


                
                <div className='flex justify-between w-full mt-4 text-center items-center border-b py-2 '>
                  <span className='text-xl'> עלות משלוח  </span>
                  <span> חינם </span>
                </div>


                    <div className='flex justify-between w-full mt-4 text-center items-center  '>
                  <span className='text-xl'> סה"כ לתשלום </span>
                  <span> מחיר </span>
                </div>
                
                
                <div className='w-full'>
                  <button className='w-full rounded-xl p-4 bg-violet-400 text-white active:scale-95 duration-300 font-bold text-xl'>מעבר לתשלום</button>
                </div>

                </div>

              </div>

            </div>


          </motion.div>

        )

      }



    </div>
  )
}




















        // {/* Cart Tab */}
        // {active === '5' && (
        //   <motion.div 
        //     key="cart"
        //     initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
        //     className='mt-12 flex flex-col lg:flex-row gap-8'
        //   >
        //     <div className='flex-1 space-y-4'>
        //         <div className='flex items-center gap-4 mb-8'>
        //             <div className='p-4 bg-violet-500 rounded-2xl shadow-lg shadow-violet-500/30'><ShoppingCart /></div>
        //             <div>
        //                 <h2 className='text-3xl font-black text-white'>סל הקניות</h2>
        //                 <p className='text-emerald-400 text-sm animate-pulse'>ממתינים לך {itemCart.length} פריטים</p>
        //             </div>
        //         </div>

        //         {itemCart.length > 0 ? itemCart.map((item) => (
        //             <div key={item.id} className='bg-white/5 border border-white/10 p-6 rounded-[2rem] flex items-center gap-6 group hover:bg-white/10 transition-all'>
        //                 <div className='hidden md:block transition-transform group-hover:scale-110'>{item.img}</div>
        //                 <div className='flex-1'>
        //                     <h3 className='text-xl font-bold mb-2'>{item.itemName}</h3>
        //                     <div className='flex items-center gap-4'>
        //                         <div className='flex items-center bg-black/40 rounded-lg p-1 border border-white/10'>
        //                             <button onClick={() => updateQty(item.id, -1)} className='p-1 hover:text-violet-400'><Minus size={16}/></button>
        //                             <span className='px-4 font-mono font-bold'>{item.qty}</span>
        //                             <button onClick={() => updateQty(item.id, 1)} className='p-1 hover:text-violet-400'><PlusIcon size={16}/></button>
        //                         </div>
        //                         <p className='text-violet-300 font-black text-lg'>₪{item.price * item.qty}</p>
        //                     </div>
        //                 </div>
        //                 <button onClick={() => removeItem(item.id)} className='p-3 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all'>
        //                     <Trash2 size={20}/>
        //                 </button>
        //             </div>
        //         )) : (
        //             <div className='py-20 text-center bg-white/5 rounded-[2rem] border border-dashed border-white/20'>
        //                 <Package size={48} className='mx-auto text-zinc-600 mb-4' />
        //                 <p className='text-zinc-400'>הסל שלך ריק כרגע</p>
        //             </div>
        //         )}
        //     </div>

        //     {/* Order Summary */}
        //     <div className='w-full lg:w-96'>
        //         <div className='bg-white/5 border border-white/10 p-8 rounded-[2rem] sticky top-24'>
        //             <h3 className='text-xl font-bold mb-6 border-b border-white/10 pb-4'>סיכום הזמנה</h3>
        //             <div className='space-y-4 mb-8'>
        //                 <div className='flex justify-between text-zinc-400'>
        //                     <span>סה"כ פריטים:</span>
        //                     <span>{itemCart.length}</span>
        //                 </div>
        //                 <div className='flex justify-between text-zinc-400'>
        //                     <span>משלוח:</span>
        //                     <span className='text-emerald-400'>חינם</span>
        //                 </div>
        //                 <div className='flex justify-between text-2xl font-black pt-4 border-t border-white/10'>
        //                     <span>לתשלום:</span>
        //                     <span className='text-violet-400'>₪{totalPrice}</span>
        //                 </div>
        //             </div>
        //             <button className='w-full py-4 bg-violet-500 hover:bg-violet-600 text-white font-bold rounded-xl shadow-lg shadow-violet-500/20 transition-all active:scale-95'>
        //                 מעבר לתשלום
        //             </button>
        //         </div>
        //     </div>
        //   </motion.div>