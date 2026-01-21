
'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { _date } from 'zod/v4/core'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { AiOutlineLoading3Quarters } from "react-icons/ai";



export default function RegisterUser() {

  const {formState:{errors} ,handleSubmit ,register ,getValues} = useForm()

  const router = useRouter()
  const [loading , setLoading] = useState(false)
  const [serverError ,setServerError] = useState('')
  const [itsLogin , setItsLogin] = useState(false)

  const doForm = async (_date) => {

    try {
      setLoading(true)
      setServerError('')

      const url = '/api/auth/register';

      const resp = await axios.post(url , _date)

      if(resp.status == 201) {

        setTimeout(() => {

          setLoading(false)
          setItsLogin(true)

          setTimeout(() => {

            router.push('/login')
            router.refresh()
          } ,3000)

        } , 2000)

      }
      



    } catch (error) {
      alert('error server 500')
      setLoading(false)
      console.log('there was error with server')

    }
    


  }




  return (
    <div className='flex flex-col items-center justify-center bg-gray-200 h-screen w-full ' dir='rtl'>

      {
        itsLogin ? 

        <div className=' p-4 shadow bg-white rounded-md shadow-gray-200 w-[40%] text-gray-400 flex flex-col items-center text-center '  >

          <div className='flex flex-col text-center gap-4 '>

            <h4 className='text-xs font-bold tracking-widest border-b'>התחברת בהצלחה.</h4>
            <h2 className='text-3xl font-extralight tracking-widest text-violet-400 text-shadow-2xs text-shadow-amber-400'>הינך עובר לעמוד התחברת לאתר</h2>
          </div>


        </div> 

        :

              <form onSubmit={handleSubmit(doForm)} className='shadow-md p-8 rounded-md bg-white shadow-gray-400 w-[90%] xl:w-[40%] text-gray-400' >

        <div className='flex flex-col items-center text-center gap-5'>
          <h4 className='border-b tracking-widest font-bold text-xs' >Welcome To MySite </h4>
          <h2 className='text-violet-400 text-5xl tracking-widest font-extralight'>Register</h2>
        </div>


        <div className='mt-8 flex gap-2 w-full items-center'>
          <div className='flex flex-col items-start space-y-1 w-full'>

            <label>שם משתמש:</label> 
          <input {...register('name', { required: "שם חובה", minLength: { value: 2, message: "מינימום 2 תווים" } })} type="text" className="text-start border w-full rounded-md p-2 bg-gray-200 hover:bg-gray-100 duration-500 outline-0 focus:ring-2 ring-violet-400" placeholder="הזן את שם המשתמש שלך" />
          {errors.name && <span className='text-red-600 text-xs tracking-widest font-bold'>{errors.name.message}</span>}
          </div>


          <div className='flex flex-col items-start space-y-1 w-full'>

            <label>שם מלא:</label>
           <input type="text" className='text-start border w-full rounded-md p-2 bg-gray-200 hover:bg-gray-100 duration-500 outline-0 focus:ring-2 ring-violet-400'  placeholder='הזן את השם המלא שלך' />

          </div>
        </div>

        <div className='mt-4 flex flex-col items-start relative'>
          <label className='absolute top-2 right-2'> אימייל:</label>
          <input {...register('email' , {required:'שדה ריק'  ,pattern:{value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ ,message:'אימייל לא תקין'}})} type="email" className='text-end border w-full rounded-md p-2 bg-gray-200 hover:bg-gray-100 duration-500 outline-0 focus:ring-2 ring-violet-400'  placeholder='הזן את האימייל שלך' />
          {errors.name && <span className='text-red-600 text-xs tracking-widest font-bold'>{errors.email.message}</span>}
        </div>

        
        <div className='mt-4 flex flex-col items-start relative'>
          <label className='absolute top-2 right-2'> סיסמה:</label>
<input {...register('password', { required: 'שדה ריק', pattern: { value: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/, message: 'סיסמה חלשה (אותיות ומספרים, מינימום 8)' } })} type="password" className="text-end border w-full rounded-md p-2 bg-gray-200 hover:bg-gray-100 duration-500 outline-0 focus:ring-2 ring-violet-400" placeholder="הזן את הסיסמה שלך" />          {errors.password && <span className='text-red-600 text-xs tracking-widest font-bold'>{errors.password.message}</span>}
        </div>

        
        <div className='mt-4 flex flex-col items-start relative'>
          <label className='absolute top-2 right-2'> אימות סיסמה:</label>
          <input {...register('password2' , {validate: (_value) => _value == getValues('password') || 'סיסמה לא תאומת'  }  )  } type="password" className='text-end border w-full rounded-md p-2 bg-gray-200 hover:bg-gray-100 duration-500 outline-0 focus:ring-2 ring-violet-400'  placeholder='אימות סיסמה' />
          {errors.password2 && <span className='text-red-600 text-xs tracking-widest font-bold'>סיסמה לא תאומת</span>}
        </div>

        <div className='mt-4 flex flex-col text-center items-center'>
          <button className='p-2 rounded-md bg-violet-400 text-white w-full active:scale-90  duration-500 flex items-center text-center '>

            {
              loading ? <AiOutlineLoading3Quarters className='animate-spin w-full text-center items-center'/>  :<p className='text-center w-full'>שלח</p>
            }

          </button>
        </div>

      </form>
      }

    </div>
  )
}
