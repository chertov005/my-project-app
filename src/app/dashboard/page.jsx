

import { auth ,signOut } from "@/auth";
import ParsonalArea2 from "../components/dashboard/parsonalArea";




export default async function DashboardPage() {

  const logOut  = async () => {

    'use server'
    await signOut({redirectTo:'/login'})

  }

  
  
  const session = await auth();
  
  const { email, id, name, role, image ,createdAt } = session?.user
  

  // אם ה-Middleware איכשהו פוספס, זה קו ההגנה השני
  if (!session) {
    return <div>טוען או מפנה ללוגין...</div>;
  }

  return (
    <div className="" dir="rtl">
      <ParsonalArea2 name={name} role={role} email={email} createdAt={createdAt} logOut={logOut}/>
    </div>
  );
}