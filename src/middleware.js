





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