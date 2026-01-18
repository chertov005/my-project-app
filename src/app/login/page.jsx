









'use client' // מציין שזו קומפוננטת צד לקוח (חובה לשימוש ב-Hooks ובטפסים)
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react' // הפונקציה המרכזית להתחברות מהדפדפן
import { useRouter } from 'next/navigation' // לניווט בין דפים אחרי ההצלחה
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { _date } from 'zod/v4/core'


export default function LoginPage() {
  // State לניהול מצב טעינה - כדי למנוע לחיצות כפולות על הכפתור
  const [loading, setLoading] = useState(false)

  // State לשגיאות מהשרת - למשל אם הסיסמה לא נכונה ב-DB
  const [serverError, setServerError] = useState("")

  const router = useRouter() // מאפשר לנו להעביר את המשתמש דף בסיום הלוגין

  // פירוק הכלים של react-hook-form לניהול הקלטים והשגיאות
  const { register, formState: { errors }, handleSubmit } = useForm()


    const doForm = async (_date) => {

      setLoading(true)
      setServerError('')

      const data = await signIn('credentials' ,{
        email: _date.email ,
        password: _date.password ,
        redirect:false
      })
  // אם יש שגיאה - טפל בה וצא מהפונקציה
  if (data?.error) {
    setServerError('פרטי התחברות שגויים');
    return setLoading(false);
  }

  // אם הגענו לכאן - הכל תקין
  router.push('/dashboard');
  router.refresh();

    }








 



  return (
    <div className='h-screen bg-gray-200 flex flex-col justify-center items-center'>
      {/* handleSubmit עוטף את doForm ובודק שכל השדות תקינים לפני שהוא מפעיל אותה */}
      <form
        onSubmit={handleSubmit(doForm)}
        className='p-10 rounded shadow-md bg-white text-gray-400 flex flex-col border w-full max-w-md mx-auto transition-all'
      >
        <div className='flex flex-col items-center text-center gap-4'>
          <h4 className='border-b text-xs tracking-widest font-bold uppercase text-gray-400'>Welcome Back</h4>
          <h1 className='text-violet-400 tracking-widest font-extralight text-5xl'>Login</h1>
        </div>

        {/* טרינארי להצגת שגיאת שרת - יופיע רק אם ה-State מלא */}
        {serverError ? (
          <div className='mt-6 p-2 bg-red-50 border border-red-200 text-red-500 text-xs font-bold text-center rounded'>
            {serverError}
          </div>
        ) : null}

        <div className='flex flex-col items-start relative mt-10 '>
          {/* תווית מעוצבת מעל האינפוט */}
          <label className='absolute bottom-2 left-2 text-[10px] uppercase font-bold text-violet-300'>Email:</label>
          <input
            // register מחבר את האינפוט ל-react-hook-form
            {...register('email', {
              required: "אימייל חובה", // ולידציה בסיסית
              pattern: { // ולידציה של מבנה אימייל תקין
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                message: "אימייל לא חוקי"
              }
            })}
            // טרינארי ב-className: אם יש שגיאה באימייל, הגבול יהיה אדום
            className={`w-full rounded p-2 border outline-0 focus:ring-2 ring-violet-300 hover:bg-gray-100 duration-500 text-end ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
            placeholder='enter your email'
            type='email'
          />
        </div>
        {/* הצגת הודעת השגיאה הספציפית לאימייל */}
        {errors.email && <p className='text-[10px] text-red-400 font-bold mt-1'>{errors.email.message}</p>}

        <div className='flex flex-col items-start relative mt-4'>
          <label className='absolute bottom-2 left-2 text-[10px] uppercase font-bold text-violet-300'>Password:</label>
          <input
            {...register('password', { required: 'סיסמה חובה' })}
            className={`w-full rounded p-2 border outline-0 focus:ring-2 ring-violet-300 hover:bg-gray-100 duration-500 text-end ${errors.password ? 'border-red-400' : 'border-gray-300'}`}
            placeholder='enter your password'
            type='password'
          />
        </div>
        {errors.password && <p className='text-[10px] text-red-400 font-bold mt-1'>{errors.password.message}</p>}

        <div className='mt-8'>

          <button disabled={loading} className='w-full text-white p-3 rounded active:scale-95 duration-500 text-center flex flex-col items-center cursor-pointer font-bold tracking-tighter shadow-lg bg-violet-400'>

            {
              loading ? <AiOutlineLoading3Quarters className='animate-spin' />  : <p>Submit</p>
            }

          </button>

        </div>
      </form>
    </div>
  )
}