import  {auth}  from '@clerk/nextjs/server'
import prismadb from '@/lib/prismadb'

import { MAX_FREE_TIER } from '@/constant'

export const increaseApiLimit = async () => {
    try {
        const { userId } = await auth()

        if( !userId){
            return
        }

        const userApiLimit = await prismadb?.userApiLimit.findUnique({
            where:{
                userId
            }
        })

        if( userApiLimit ){
            await prismadb?.userApiLimit.update({
                where:{
                    userId
                },
                data:{
                    count: userApiLimit.count + 1
                }
            })
        }
        else{
            await prismadb?.userApiLimit.create({
                data:{
                    userId,
                    count: 1
                }
            })
        } 
    } catch (error : unknown) {
        console.error('[API_LIMIT_ERROR]', error)
        return null;
    }   
}

export const checkApiLimit = async () =>{
    try {
        const { userId } = await auth()

        if( !userId){
            return false
        }

        const userApiLimit = await prismadb?.userApiLimit.findUnique({
            where:{
                userId
            }
        })

        if( userApiLimit && userApiLimit.count >= MAX_FREE_TIER){
            return false
        }

        return true
    } catch (error : unknown) {
        console.error('[API_LIMIT_ERROR]', error)
        return null;
    }       
}