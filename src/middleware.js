





import { auth } from "./auth";

export default auth((_reg) => {
  const itsLogin = !!_reg.auth;
  const { pathname } = _reg.nextUrl;


  // 1. הגנה על נתיבי API (מחריגים את נתיבי ה-auth של המערכת)
  if (pathname.startsWith('/api') && !itsLogin && !pathname.startsWith('/api/auth')) {
    return Response.json(
      { message: 'אינך משתמש מחובר' },
      { status: 401 }
    );
  }

  // 2. הגנה על דפי דשבורד
  if (pathname.startsWith('/dashboard') && !itsLogin) {
    return Response.redirect(new URL('/login', _reg.nextUrl));
  }

  // 3. הגנה הפוכה (מניעת דף לוגין/הרשמה למשתמשים מחוברים)
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');
  if (isAuthPage && itsLogin) {
    return Response.redirect(new URL('/dashboard', _reg.nextUrl));
  }
});

export const config = {
  // המאטצ'ר המומלץ למניעת הרצה על קבצים סטטיים
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};









// Middleware: שומר על ה-URL.

// Auth (JWT): שומר על המידע וההרשאות.


// הקוד הזה הוא ה-Middleware של האפליקציה שלך. בעוד ש-auth (ב-NextAuth) הוא המנוע שמנהל את האימות, ה-Middleware הוא ה**"שומר בכניסה לבניין"** שבודק לאן מותר לך ללכת עוד לפני שדרכת בתוך החדר (הדף).

// הנה ההסבר ב-5 נקודות קצרות:

// סינון מוקדם: ה-Middleware רץ לפני שהבקשה מגיעה לדף או ל-API. הוא חוסך מהשרת לרנדר דפים עבור משתמשים שלא אמורים לראות אותם.

// אבטחת נתיבים (Dashboard): אם מישהו ינסה להקליד ידנית בדפדפן /dashboard והוא לא מחובר, הקוד יזרוק אותו מיד לדף ה-Login.

// מניעת כפילויות: אם משתמש כבר מחובר, אין טעם שהוא יראה שוב את דף ה-Login. הקוד מזהה את זה ומעביר אותו ישר ל-Dashboard.

// הגנה על ה-API: הוא מוודא שבוטים או משתמשים אנונימיים לא יוכלו למשוך מידע מה-API של האפליקציה (חוץ מהנתיבים של ה-Auth עצמו).

// יעילות (Matcher): בעזרת ה-config בסוף, הוא מוודא שהבדיקה לא תרוץ על קבצים סטטיים (תמונות, אייקונים), מה ששומר על ביצועים מהירים.

// למה צריך את זה אם כבר יש לי פונקציית auth בדפים?
// בלי ה-Middleware, משתמש יוכל להיכנס לכתובת של ה-Dashboard, הדף יתחיל להיטען, ורק אז פונקציית ה-auth תגלה שהוא לא מחובר ותעביר אותו. זה יוצר "קפיצה" (Flicker) לא נעימה בעין ופחות מאובטח. ה-Middleware חוסם את הגישה ברמת הרשת עוד לפני שהדף נטען.

// במילה אחת: זה הופך את האפליקציה שלך מ"עובדת" ל"מאובטחת ומקצועית".































// import { auth } from "./auth";

// export default auth((req) => {
//   const isLoggedIn = !!req.auth;
//   const role = req.auth?.user?.role;
//   const { pathname } = req.nextUrl;

//   // 1. טיפול ב-API
//   if (pathname.startsWith('/api') && !pathname.startsWith('/api/auth')) {

//     if (!isLoggedIn) {
//       return Response.json({ message: 'Unauthorized' }, { status: 401 });
//     }

//     // ללא some: בדיקה ישירה של הנתיבים
//     const isAdminApi = pathname.startsWith('/api/users') || pathname.startsWith('/api/admin');
    
//     if (isAdminApi && role !== 'admin') {
//       return Response.json({ message: 'Forbidden' }, { status: 403 });
//     }
//   }

//   // 2. הגנה על דפים פרטיים
//   // ללא some: פשוט מפרטים את הנתיבים עם ||
//   const isProtectedRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/profile');
  
//   if (isProtectedRoute && !isLoggedIn) {
//     const loginUrl = new URL('/login', req.nextUrl);
//     loginUrl.searchParams.set("callbackUrl", pathname);
//     return Response.redirect(loginUrl);
//   }

//   // 3. מניעת כפל לוגין
//   const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register');
  
//   if (isAuthRoute && isLoggedIn) {
//     return Response.redirect(new URL('/dashboard', req.nextUrl));
//   }
// });

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
// };