import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'

const DAY_IN_MS = 1000 * 60 * 60 * 24 

export const checkSubscription = async () => {
    const { userId } = auth()

    if(!userId) {
        return false
    }

    const userSubscription = await prismadb?.userSubcription?.findUnique({
        where:{
            userId
        }
    })

    if(!userSubscription) {
        return false
    }

    if(userSubscription.stripeCurrentPeriodEnd && userSubscription.stripeCurrentPeriodEnd < new Date()) {
        return false
    }

    return true

}