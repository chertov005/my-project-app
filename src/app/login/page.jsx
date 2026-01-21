'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function LoginPage() {
  // מושכים את ה-session ואת ה-status (loading, authenticated, unauthenticated)
  const { data: session, status } = useSession();
  
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [serverError, setServerError] = useState("");
  
  const router = useRouter();
  const { register, formState: { errors }, handleSubmit } = useForm();

  // אם ה-Session בטעינה, אפשר להציג Loader קטן או פשוט לחכות
  const name = session?.user?.name;

  const doForm = async (formData) => {
    setLoading(true);
    setServerError('');

    const res = await signIn('credentials', {
      email: formData.email,
      password: formData.password,
      redirect: false
    });

    if (res?.error) {
      setServerError('פרטי התחברות שגויים');
      return setLoading(false);
    }

    setLoading(false);
    setLoginSuccess(true);

    // בגלל ש-useSession לוקח זמן להתעדכן אחרי signIn, 
    // לפעמים ה-name עדיין יהיה undefined בשניות הראשונות כאן.
    setTimeout(() => {
      router.push('/dashboard');
      router.refresh();
    }, 3000);
  };

  return (
    <div className='h-screen bg-gray-200 flex flex-col justify-center items-center' dir='rtl'>
      {loginSuccess ? (
        <div className='p-8 rounded shadow bg-white text-gray-400 flex flex-col items-center shadow-gray-400'>
          <div className='flex flex-col gap-4 text-center'>
            {/* שימוש ב-OR כדי להציג טקסט חלופי אם השם עוד לא נטען */}
            <h1 className='text-xs font-bold tracking-widest'>
              התחברת בהצלחה {name || "משתמש"}
            </h1>
            <h4 className='text-5xl tracking-widest text-violet-400 font-extralight border-b border-t bg-orange-50 p-4'>
              הינך עובר לעמוד הפרופיל
            </h4>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(doForm)} className='p-10 rounded shadow-md bg-white text-gray-400 flex flex-col border w-full max-w-md mx-auto'>
          {/* ... שאר הטופס שלך ... */}
          <div className='flex flex-col items-center text-center gap-4 mb-6'>
             <h1 className='text-violet-400 tracking-widest font-extralight text-5xl'>התחבר</h1>
          </div>
          
          {serverError && <p className="text-red-500 text-center mb-4">{serverError}</p>}

          <input 
            {...register('email', { required: true })} 
            className="border p-2 mb-4 rounded" 
            placeholder="אימייל"
          />
          <input 
            {...register('password', { required: true })} 
            type="password" 
            className="border p-2 mb-4 rounded" 
            placeholder="סיסמה"
          />

          <button disabled={loading} className='w-full text-white p-3 rounded shadow-lg bg-violet-400 flex justify-center'>
            {loading ? <AiOutlineLoading3Quarters className='animate-spin' /> : "שלח"}
          </button>
        </form>
      )}
    </div>
  )
}