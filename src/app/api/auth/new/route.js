import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z} from 'zod'
import bcrypt from 'bcrypt'



const userSchema = z.object({
  name: z
    .string()
    .min(2, "השם חייב להכיל לפחות 2 תווים")
    .max(50)
    .trim(),
    
  email: z
    .string() // ב-Zod מתחילים ב-string() ואז מוסיפים .email()
    .email("כתובת אימייל לא תקינה")
    .toLowerCase() // חשוב מאוד! מונע כפילויות ב-DB בגלל אותיות גדולות
    .trim(),
    
  password: z
    .string()
    .min(8, "הסיסמה חייבת להכיל לפחות 8 תווים")
    .regex(/[A-Z]/, "הסיסמה חייבת להכיל לפחות אות גדולה אחת")
    .regex(/[0-9]/, "הסיסמה חייבת להכיל לפחות מספר אחד"),
});





export async function POST (_req) {

    try {

        const body = await _req.json() ;

        const validation = userSchema.safeParse(body)

        if(!validation.success) {
            return NextResponse.json(validation.error.flatten().fieldErrors ,{status:400})
        }

        const {email,name,password} = validation.data

        const checkEmail = await prisma.user.findUnique({
            where:{email:email}
        })

        if(email) {
            console.log('error mail') 
            return NextResponse.json(
                {
                    message:'אימייל כבר קיים במערכת '
                } ,
                {status:400}
            )
        }

        
        
    } catch (error) {
            console.log('there was error with server ')
        return NextResponse.json(
            {
                message:'internal server error 500'
            } ,
            {status:500}
        )
    }

}