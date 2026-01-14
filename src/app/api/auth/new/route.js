import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from 'zod';
import bcrypt from 'bcrypt';

export const dynamic = 'force-dynamic';

const userSchema = z.object({
  name: z.string().min(2, "השם חייב להכיל לפחות 2 תווים").max(50).trim(),
  email: z.string().email("כתובת אימייל לא תקינה").toLowerCase().trim(),
  password: z.string().min(8, "הסיסמה חייבת להכיל לפחות 8 תווים")
    .regex(/[A-Z]/, "הסיסמה חייבת להכיל לפחות אות גדולה אחת")
    .regex(/[0-9]/, "הסיסמה חייבת להכיל לפחות מספר אחד"),
});

export async function POST(req) { // שיניתי מ-_req ל-req כי אתה משתמש בו
  try {
    const body = await req.json();
    const validation = userSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.flatten().fieldErrors, { status: 400 });
    }

    const { email, name, password } = validation.data;

    // בדיקה אם המשתמש קיים
    const checkEmail = await prisma.user.findUnique({
      where: { email }
    });

    if (checkEmail) {
      return NextResponse.json(
        { message: 'אימייל כבר קיים במערכת' },
        { status: 400 }
      );
    }

    // הצפנה
    const hashPass = await bcrypt.hash(password, 10);

    // יצירה עם בחירת שדות ספציפית
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPass
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true, // הוספתי את זה כי הגדרת Role ב-Schema
        createdAt: true
      }
    });

    return NextResponse.json(
      { success: 'user created', data: newUser },
      { status: 201 }
    );

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { message: 'internal server error 500' },
      { status: 500 }
    );
  }
}