import AdminArea from "@/app/components/dashboard/adminArea";
import { auth } from "@/auth";
import { redirect } from 'next/navigation';

export default async function AdminRoute() {
    // 1. קבלת הסשן מהשרת
    const session = await auth();

    // 2. בדיקה אם המשתמש בכלל מחובר (חובה לבצע לפני גישה ל-user)
    if (!session || !session.user) {
        redirect('/login');
    }

    // 3. חילוץ התפקיד ובדיקה אם המשתמש הוא אדמין
    const { role } = session.user;
    
    if (role !== 'ADMIN') {
        redirect('/dashboard');
    }

    // 4. רק אם הכל תקין - רינדור הקומפוננטה
    return (
        <div className='p-4 bg-linear-to-tr from-black to-violet-900/50 via-violet-950/30' dir='rtl  '>
            <AdminArea />
        </div>
    );
}












// הנה סיכום קצר של ההבדלים בין redirect ל-router.push ומתי להשתמש בכל אחד מהם:

// redirect (מ-next/navigation)
// איפה: בצד השרת (Server Components / Server Actions).

// איך: שולח פקודת HTTP ישירה לדפדפן לעבור דף.

// מתי להשתמש:

// אבטחה והרשאות: כמו בקוד שסימנת ב-Canvas (בדיקת אדמין). עוצרים את הגישה לפני שהדף בכלל נשלח למשתמש.

// בדיקת סשן: אם המשתמש לא מחובר, זורקים אותו ללוגין מיד.

// Server Actions: אחרי שליחת טופס בשרת והעברה לדף הצלחה.

// router.push (מ-useRouter)
// איפה: בצד הלקוח (Client Components בלבד - אלו עם 'use client').

// איך: משתמש ב-JavaScript כדי לשנות את הכתובת בדפדפן בלי לרענן את הדף (Single Page App feeling).

// מתי להשתמש:

// אינטראקציה של משתמש: לחיצה על כפתור, סגירת מודאל, או מעבר בין טאבים (כמו ב-Sidebar שלך).

// שינוי פרמטרים ב-URL: כשרוצים לעדכן את הכתובת (?tab=2) תוך כדי עבודה על הדף.

// אנימציות: כשרוצים מעברים חלקים (Framer Motion) בין דפים.

// שורה תחתונה:

// אם אתה ב-async function בשרת (כמו ב-Canvas) – רק redirect.

// אם אתה בתוך onClick או useEffect בלקוח – רק router.push