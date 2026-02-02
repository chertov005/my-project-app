
import SidBarDashboard from '../components/dashboard/sidBarDashboard';
import { auth, signOut } from '@/auth';

export default async function LayoutDashboard({ children }) {
  const session = await auth();
  const name = session?.user?.name || "אורח";
  const role = session?.user?.role || "User";

  const logOutUser = async () => {
    'use server';
    await signOut({ redirectTo: '/login' });
  };

  return (
    <div dir='rtl' className='h-screen w-full bg-black text-white overflow-hidden'>
      <div className='flex w-full h-full'>
        {/* Sidebar container */}
        <div className='xl:w-[15%] h-full w-0 xl:w-72'>
       
            <SidBarDashboard name={name} role={role} myLogOut={logOutUser} />
      
        </div>

        {/* Main Content */}
        <main className='flex-1 h-full overflow-auto'>
       
            {children}
         
        </main>
      </div>
    </div>
  );
}