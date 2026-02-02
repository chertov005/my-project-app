
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

        <p>Admin route2</p>
      
    </div>
  )
}
