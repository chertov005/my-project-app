import NextAuth from "next-auth";
import { prisma } from "./lib/prisma"; // מייבא את החיבור לבסיס הנתונים (Prisma)
import { PrismaAdapter } from "@auth/prisma-adapter"; // מאפשר ל-Auth.js לנהל משתמשים בבסיס הנתונים שלנו
import Credentials from 'next-auth/providers/credentials'; // מאפשר התחברות עצמאית עם אימייל וסיסמה
import bcrypt from 'bcrypt'; // ספרייה שבודקת אם הסיסמה שהוזנה תואמת לסיסמה המוצפנת ב-DB

export const { auth, handlers, signIn, signOut } = NextAuth({
    // הגדרת המתאם שמחבר את Auth.js לטבלאות של Prisma
    adapter: PrismaAdapter(prisma),

    session: {
        strategy: 'jwt', // קובע שהמידע יישמר בטוקן (עוגייה) בדפדפן ולא בטבלה ב-DB (מהיר יותר)
        maxAge: 60 * 60 * 24 * 30 // קובע שהסשן יהיה בתוקף למשך 30 ימים
    },

    providers: [
        Credentials({
            name: 'credentials',
            // מגדיר את השדות שיוצגו בטופס ההתחברות האוטומטי
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            // הלוגיקה שבודקת את פרטי המשתמש
            async authorize(credentials) {
                // בדיקה שהמשתמש אכן מילא את שני השדות
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('יש להזין אימייל וסיסמה');
                }

                // חיפוש המשתמש בבסיס הנתונים לפי האימייל שלו
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });

                // אם לא נמצא משתמש או שאין לו סיסמה (נרשם דרך גוגל למשל)
                if (!user || !user.password) {
                    throw new Error('משתמש לא קיים או חסרה סיסמה');
                }

                // השוואה בין הסיסמה שהמשתמש הקליד לסיסמה המוצפנת ב-DB
                const isPasswordCorrect = await bcrypt.compare(
                    credentials.password, 
                    user.password
                );

                // אם הסיסמה לא נכונה
                if (!isPasswordCorrect) {
                    throw new Error('סיסמה שגויה');
                }

                // אם הכל תקין - מחזיר את אובייקט המשתמש לטובת ה-JWT
                return user;
            }
        })
    ],

    callbacks: {
        // רץ בזמן יצירת הטוקן - שומר מידע מה-DB לתוך העוגייה המוצפנת
        async jwt({ user, token }) {
            if (user) {
                token.id = user.id; // שומר את ה-ID של המשתמש בטוקן
                token.role = user.role; // שומר את התפקיד (ADMIN/USER) בטוקן
            }
            return token;
        },

        // רץ בכל פעם שהאפליקציה בודקת אם המשתמש מחובר - מנגיש את המידע לקוד הריאקט
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id; // מעביר את ה-ID מהטוקן לאובייקט ה-session
                session.user.role = token.role; // מעביר את התפקיד מהטוקן לאובייקט ה-session
            }
            return session;
        }
    },

    // מפתח סודי המשמש להצפנת העוגיות (חובה להגדיר ב-.env)
    secret: process.env.AUTH_SECRET
});