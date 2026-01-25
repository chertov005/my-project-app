



import SidBarDashboard from '../components/dashboard/sidBarDashboard'
import { auth ,signOut } from '@/auth'

export  default async function layoutDashboard({children}) {

  const session = await auth()

  const {name ,role} = session?.user

  const logOutUser = async () => {

    'use server'

    await signOut({redirectTo:'/login'})

  }

  return (
    <div dir='rtl' className=' h-screen w-full bg-black text-white  ' >

      <div className='flex w-full  h-full '>

        <div className='xl:w-[15%] h-full w-[1%] '>
          <SidBarDashboard name={name } role={role} myLogOut={logOutUser}/>
        </div>

        <main className='w-[97%] h-full '> 
          {children}
        </main>

      </div>
      
    </div>
  )
}
