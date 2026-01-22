import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from 'zod';

const schemaPost = z.object({
    title: z.string().min(5, "כותרת קצרה מדי").max(80),
    content: z.string().min(10, "תוכן קצר מדי").max(900)
});

export async function POST(_reg) {
    try {
        // 1. בדיקת אימות - קודם כל בודקים אם יש מישהו בבית
        const session = await auth();

        if (!session || !session.user) {
            return NextResponse.json(
                { message: 'אינך משתמש מחובר, גישה נדחתה' },
                { status: 401 }
            );
        }

        // 2. עכשיו בטוח לחלץ את ה-ID
        const { id } = session.user;
        const body = await _reg.json();

        // 3. ולידציה של הנתונים
        const validation = schemaPost.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { errors: validation.error.flatten().fieldErrors }, 
                { status: 400 }
            );
        }

        const { content, title } = validation.data;

        // 4. יצירה ב-Database
        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                authorId: id,
            },
            select: {
                id: true, // תמיד כדאי להחזיר את ה-ID של האובייקט החדש
                title: true,
                content: true,
                createdAt: true,
                // אופציונלי: להחזיר גם פרטי מחבר בסיסיים
                author: {
                    select: { name: true }
                }
            }
        });

        return NextResponse.json({
            message: 'success post',
            data: newPost
        }, { status: 201 });

    } catch (error) {
        // לוג לצורך דיבאגינג בשרת
        console.error('POST_ERROR:', error);
        return NextResponse.json(
            { message: 'internal server error 500' },
            { status: 500 }
        );
    }
}


export async function GET() {
    try {
        const session = await auth() 

        if(!session || !session.user) {
            return NextResponse.json(
                { message: 'אינך משתמש רשום' },
                { status: 401 }
            )
        }

        const { id, role } = session.user

        // לוגיקה מעולה: אדמין רואה הכל, משתמש רואה רק את שלו
        const filter = role === 'ADMIN' ? {} : { authorId: id }

        // שינוי ל-findMany כדי לקבל מערך של פוסטים
        const posts = await prisma.post.findMany({
            where: filter, 
            orderBy: {
                createdAt: 'desc' // בונוס: הפוסטים החדשים ביותר יופיעו ראשונים
            },
            select: {
                id: true,
                title: true, 
                content: true, 
                createdAt: true, 
                authorId: true,
                author: {
                    select: {
                        name: true,
                        image: true
                    }
                }
            }
        })

        return NextResponse.json(
            {
                message: 'success',
                data: posts
            },
            { status: 200 }
        )

    } catch (error) {
        console.error('GET_POSTS_ERROR:', error);
        return NextResponse.json(
            { message: 'internal server error 500' },
            { status: 500 }
        );
    }
}