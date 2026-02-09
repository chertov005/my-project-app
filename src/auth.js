import NextAuth from "next-auth";
import { prisma } from "./lib/prisma"; // מייבא את החיבור לבסיס הנתונים (Prisma)
import { PrismaAdapter } from "@auth/prisma-adapter"; // מאפשר ל-Auth.js לנהל משתמשים בבסיס הנתונים שלנו
import Credentials from 'next-auth/providers/credentials'; // מאפשר התחברות עצמאית עם אימייל וסיסמה
import bcrypt from 'bcryptjs'; // ספרייה שבודקת אם הסיסמה שהוזנה תואמת לסיסמה המוצפנת ב-DB

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
                token.createdAt = user.createdAt; // שומר את התפקיד (ADMIN/USER) בטוקן
            }
            return token;
        },

        // רץ בכל פעם שהאפליקציה בודקת אם המשתמש מחובר - מנגיש את המידע לקוד הריאקט
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id; // מעביר את ה-ID מהטוקן לאובייקט ה-session
                session.user.role = token.role; // מעביר את התפקיד מהטוקן לאובייקט ה-session
                session.user.createdAt = token.createdAt; // מעביר את התפקיד מהטוקן לאובייקט ה-session
            }
            return session;
        }
    },

    pages:{
       
        signIn: '/login' ,
        newUser: '/register' ,
        
        
    } ,

    // מפתח סודי המשמש להצפנת העוגיות (חובה להגדיר ב-.env)
    secret: process.env.AUTH_SECRET
});












// מערכת אימות משתמשים מאובטחת המחוברת לבסיס נתונים ושומרת הרשאות.

// הנה דוגמה מעולם האבטחה והשמירה שתסביר לך בדיוק מה כל חלק עושה בלי "מילים של מתכנתים":

// המאבטח בכניסה (Authorize): בודק תעודת זהות וסיסמה. אם השם לא ברשימה או שהסיסמה שגויה, הוא לא נותן להיכנס לבניין.

// כרטיס עובד מגנטי (JWT): ברגע שאישר אותך, הוא מדפיס לך כרטיס עם השם שלך והדרגה שלך (Role). אתה מסתובב איתו בכיס ולא צריך להיבדק שוב בכל דלת.

// מערכת המצלמות והרישום (PrismaAdapter): כל מי שנכנס נרשם בספר המבקרים של הבניין כדי שנדע מי נמצא בפנים.

// הרשאות גישה (Callbacks): המאבטח כותב על הכרטיס שלך "מורשה לקומה 5". כשתגיע למעלית, היא תדע לאן מותר לך להגיע לפי מה שכתוב על הכרטיס.

// דלת אחורית (Secret): המפתח הסודי שרק המנהל מכיר, שמוודא שאף אחד לא זייף כרטיס עובד דומה.

// בקיצור: המערכת מוודאת שמי שנכנס הוא מי שהוא טוען שהוא, נותנת לו כרטיס מתאים, וזוכרת מה מותר לו לעשות בתוך המבנה.





// הטוקן (The Token): נשמר כעוגיית HttpOnly (מוגן מ-JS). הוא מכיל את המידע ה"מוצפן" שאתה בחרת להכניס.

// הפענוח (Decryption/Validation): השרת משתמש ב-AUTH_SECRET כדי לוודא שהטוקן לא שונה. אם החתימה לא מתאימה לסוד – השרת מתעלם מהבקשה.

// השרשרת (The Chain):

// Authorize: בודק סיסמה מול ה-DB (Prisma).

// JWT Callback: לוקח את הנתונים מה-DB (כמו role) ודוחף אותם לתוך הטוקן.

// Session Callback: לוקח את הנתונים מהטוקן ומנגיש אותם ל-useSession (לקוח) או ל-auth() (שרת).

// ההרשאות: ברגע שה-role נמצא בתוך ה-session, אתה יכול לחסום דפים או להציג כפתורים רק לאדמינים בקלות.

// זה הבסיס הכי חזק שיש היום ב-Next.js לאבטחה. אתה בנתיב הנכון!