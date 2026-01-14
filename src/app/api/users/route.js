
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";



export async function  GET () {

    try {
        
        const users = await prisma.user.findMany({
            select:{
                name:true ,
                id:true ,
                email:true ,
                role:true 
            }
   
        })

        return NextResponse.json(
            {
                message:'success ' ,
                data:users
            } ,
            {status:200}
        )
    

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