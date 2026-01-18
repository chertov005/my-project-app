
'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { _date } from 'zod/v4/core'
import { useRouter } from 'next/navigation'


export default function RegisterUser() {

  const {formState:{errors} ,handleSubmit ,register ,getValues} = useForm()

  const router = useRouter()
  const [loading , setLoading] = useState(false)
  const [serverError ,setServerError] = useState('')

  const doForm = async (_date) => {

    setLoading(true)

    setServerError('')

    


  }




  return (
    <div className='flex flex-col items-center justify-center bg-gray-200 h-screen w-full ' dir='rtl'>

      <form onSubmit={handleSubmit(doForm)} className='shadow-md p-8 rounded-md bg-white shadow-gray-400 w-[40%] text-gray-400' >

        <div className='flex flex-col items-center text-center gap-5'>
          <h4 className='border-b tracking-widest font-bold text-xs' >Welcome To MySite </h4>
          <h2 className='text-violet-400 text-5xl tracking-widest font-extralight'>Register</h2>
        </div>


        <div className='mt-8 flex gap-2 w-full items-center'>
          <div className='flex flex-col items-start space-y-1 w-full'>

            <label>שם משתמש:</label> 
           <input type="text" className='text-start border w-full rounded-md p-2 bg-gray-200 hover:bg-gray-100 duration-500 outline-0 focus:ring-2 ring-violet-400'  placeholder='הזן את השם משתמש שלך' />

          </div>


          <div className='flex flex-col items-start space-y-1 w-full'>

            <label>שם מלא:</label>
           <input type="text" className='text-start border w-full rounded-md p-2 bg-gray-200 hover:bg-gray-100 duration-500 outline-0 focus:ring-2 ring-violet-400'  placeholder='הזן את השם המלא שלך' />

          </div>
        </div>

        <div className='mt-4 flex flex-col items-start relative'>
          <label className='absolute top-2 right-2'> אימייל:</label>
          <input type="email" className='text-end border w-full rounded-md p-2 bg-gray-200 hover:bg-gray-100 duration-500 outline-0 focus:ring-2 ring-violet-400'  placeholder='הזן את האימייל שלך' />
        </div>

        
        <div className='mt-4 flex flex-col items-start relative'>
          <label className='absolute top-2 right-2'> סיסמה:</label>
          <input type="email" className='text-end border w-full rounded-md p-2 bg-gray-200 hover:bg-gray-100 duration-500 outline-0 focus:ring-2 ring-violet-400'  placeholder='הזן את הסיסמה שלך' />
        </div>

        
        <div className='mt-4 flex flex-col items-start relative'>
          <label className='absolute top-2 right-2'> אימות סיסמה:</label>
          <input type="email" className='text-end border w-full rounded-md p-2 bg-gray-200 hover:bg-gray-100 duration-500 outline-0 focus:ring-2 ring-violet-400'  placeholder='אימות סיסמה' />
        </div>

        <div className='mt-4 flex flex-col'>
          <button className='p-2 rounded-md bg-violet-400 text-white w-full active:scale-90  duration-500 '>הירשם</button>
        </div>

      </form>

    </div>
  )
}
