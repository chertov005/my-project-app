
import AdminArea from "@/app/components/dashboard/adminArea"
import { auth } from "@/auth"
import {redirect} from 'next/navigation'

export default async function  AdminRoute(_req) {

    const session = await auth()


    const {role} = session.user


if ( role !== 'ADMIN') {
  redirect('/dashboard')
}



  return (
    <div className='p-4' dir='rtl'>

      <AdminArea/>
      
    </div>
  )
}
