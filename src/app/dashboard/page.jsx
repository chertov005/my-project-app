

import { auth } from "@/auth";
import { MdSpaceDashboard } from "react-icons/md";



export default async function DashboardPage() {

  
  
  const session = await auth();
  
  const { email, id, name, role, image } = session?.user
  

  // אם ה-Middleware איכשהו פוספס, זה קו ההגנה השני
  if (!session) {
    return <div>טוען או מפנה ללוגין...</div>;
  }

  return (
    <div className="flex flex-col" dir="rtl">

      <div className="p-10 flex flex-col gap-10">
        
        <div className="flex items-center gap-2">
          <span className="text-violet-400 text-[15pt]"><MdSpaceDashboard/></span>
          <span className=" text-[12pt] tracking-widest text-zinc-400 opacity-80 font-bold"> לוח בקרה אישי והעדפות אישיות</span>
        </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic">ברוך הבא , {name}</h2> 
          <p className="text-[18pt] tracking-tighter opacity-65 border-b max-w-lg border-t p-4 ">מרכז השליטה שלך פעיל. המערכת מנותחת ומותאמת אישית לביצועים המקסימליים שלך היום.</p>

      </div>

    </div>
  );
}