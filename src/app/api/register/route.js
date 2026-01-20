import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {z} from 'zod';
import bcrypt from 'bcryptjs';




const schemaUser =  z.object({
    name:z.string().min(2).max(99).trim() ,
    email:z.string().email('אימייל שגוי') .trim() ,
    password:z.string().min(8) 
})


export async function POST (_req) {

    try {

        const body = await _req.json() ;
        const validation = schemaUser.safeParse(body) ;

        if(!validation.success) {
            return NextResponse.json(validation.error.flatten().fieldErrors ,{status:400})
        }

        const {email,name,password} = validation.data

        const user = await prisma.user.findUnique({
            where:{email:email}
        })

        if(user) {
            return NextResponse.json(
                {
                    message:'אימייל כבר קיים במערכת'
                } ,
                {status:401}
            )
        }

        const hashPass = await bcrypt.hash(password , 10) 

        const newUser = await prisma.user.create({
            data:{
                name ,
                email,
                password:hashPass
            }, 

            select:{
                name:true ,
                email:true ,
                id:true ,
                role:true ,
                
            }
        })

        return NextResponse.json(
            {
                message:'success create user' ,
                data:newUser
            },

            {status:201}
        )
         
        
    } catch (error) {
        console.log('there was error with server')
        return NextResponse.json(
            {
                message:'internal server error 500'
            } ,
            {status:500}
        )
    }

}