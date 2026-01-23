import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();

  // אם ה-Middleware איכשהו פוספס, זה קו ההגנה השני
  if (!session) {
    return <div>טוען או מפנה ללוגין...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full text-center" dir="rtl">
      <h1>Welcome, {session.user?.name}</h1>
    </div>
  );
}