

import { auth } from "@/auth";
import ParsonalArea2 from "../components/dashboard/parsonalArea";




export default async function DashboardPage() {

  
  
  const session = await auth();
  
  const { email, id, name, role, image } = session?.user
  

  // אם ה-Middleware איכשהו פוספס, זה קו ההגנה השני
  if (!session) {
    return <div>טוען או מפנה ללוגין...</div>;
  }

  return (
    <div className="" dir="rtl">
      <ParsonalArea2 name={name}/>
    </div>
  );
}