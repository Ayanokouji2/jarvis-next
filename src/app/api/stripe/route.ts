import prismadb from '@/lib/prismadb'
import { auth, currentUser } from '@clerk/nextjs/server'

import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { absoluteUrl } from '@/lib/utils'

const settingUrl = absoluteUrl("/settings")

export async function GET() {
    try {
        const { userId } = await auth();
        const user = await currentUser();

        if(!user || !userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const userSubscription = await prismadb?.userSubcription?.findUnique({
            where:{
                userId
            }
        })

        if(userSubscription && userSubscription.stripeCustomerId) {
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                return_url: settingUrl,
            })

            return new NextResponse(JSON.stringify({url:stripeSession.url}), { status: 200 })
        }

        const stripeSession = await stripe.checkout.sessions.create({
            success_url:settingUrl,
            cancel_url:settingUrl,
            payment_method_types:['card'],
            mode:"subscription",
            billing_address_collection:"auto",
            customer_email:user.emailAddresses[0].emailAddress,
            line_items:[
                {
                    price_data:{
                        currency:'INR',
                        product_data:{
                            name:'JARVIS Pro Plan',
                            description:"Unlock all the features of JARVIS with unlimited access",
                        },
                        unit_amount:199900,
                        recurring:{
                            interval:'month',
                        }
                    },
                    quantity:1
                }
            ],
            metadata:{
                userId,
            }
        })

        return new NextResponse(JSON.stringify({url:stripeSession.url}), { status: 200 })
    } catch (error: any) {
        console.log('[STRIPE_API_ERROR]', error.message)
        return new NextResponse("Internal Error", { status: 500 })
    }
}