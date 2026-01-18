// app/register/action.js
"use server";

import { prisma } from "@/lib/prisma"; // וודא שהנתיב ל-prisma נכון אצלך
import bcrypt from "bcrypt";
import { z } from "zod";

// הגדרת חוקי האימות (Validation)
const registerSchema = z.object({
  name: z.string().min(2, "השם חייב להכיל לפחות 2 תווים"),
  email: z.string().email("כתובת אימייל לא תקינה"),
  password: z.string().min(6, "הסיסמה חייבת להיות לפחות 6 תווים"),
});

export async function registerUser(data) {
  // 1. אימות הנתונים עם Zod
  const validation = registerSchema.safeParse(data);
  if (!validation.success) {
    return { error: "נתונים לא תקינים" };
  }

  const { email, password, name } = validation.data;

  try {
    // 2. בדיקה אם המשתמש כבר קיים ב-DB
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) return { error: "האימייל כבר רשום במערכת" };

    // 3. הצפנת הסיסמה
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. שמירה בבסיס הנתונים
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "USER", // תפקיד ברירת מחדל
      },
    });

    return { success: true };
  } catch (err) {
    return { error: "שגיאה בשרת, נסה שוב מאוחר יותר" };
  }
}