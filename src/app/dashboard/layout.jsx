



import SidBarDashboard from '../components/dashboard/sidBarDashboard'
import { auth } from '@/auth'

export  default async function layoutDashboard({children}) {

  const session = await auth()

  const {name ,role} = session?.user

  return (
    <div dir='rtl' className='border h-screen w-full bg-black text-white ' >

      <div className='flex w-full  h-full '>

        <div className='w-[15%] h-full'>
          <SidBarDashboard name={name } role={role}/>
        </div>

        <main className='w-[80%] h-full'> 
          {children}
        </main>

      </div>
      
    </div>
  )
}
