import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
    try {
        const session = await auth();

        if (!session?.user) {
            return NextResponse.json({ message: "אינך מחובר" }, { status: 401 });
        }

        const { id, role } = session.user;

        // בניית אובייקט ה-where בצורה דינמית:
        // אם אדמין - אובייקט ריק {} (שולף הכל)
        // אם משתמש - פילטר לפי ה-ID שלו { id: id }
        const filter = role === "ADMIN" ? {} : { id: id };

        const users = await prisma.user.findMany({
            where: filter,
            select: {
                name: true,
                id: true,
                email: true,
                role: true ,
                createdAt:true
            }
        });

        return NextResponse.json({ message: 'success', data: users }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: 'server error' }, { status: 500 });
    }
}