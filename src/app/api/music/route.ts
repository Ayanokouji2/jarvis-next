import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import Replicate from "replicate";


const replicate = new Replicate({
    auth: process.env.REPLICATE_API_KEY
});


export async function POST(request : Request){
    try {
        const { userId } = auth()
        const body = await request.json()
        const {prompt} = body

        if(!userId){
            return NextResponse.json({
                status: 401,
                body: {
                    error: 'Unauthorized',
                },
            });
        }

        if(!prompt){
            return NextResponse.json({
                status: 500,
                body: {
                    error: 'prompt is required',
                },
            });
        }

        const freeTier = await checkApiLimit()
        const isPro = await checkSubscription()
        
        if (!freeTier && !isPro) {
            return NextResponse.json({
                error: 'Payment Required',
                
            }, { status: 403 });
        }
        
        const result = await replicate.run("riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05", {
            input: {
                prompt_b : prompt
            }
        });
        

        if(!isPro)
            await increaseApiLimit()

        return NextResponse.json(result)
    } catch (error : unknown) {
        console.error("[CONVERSATION_ERROR]", error);
        return NextResponse.json( {
            status: 500,
            body: {
                error: 'Internal Server Error',
            },
        });
        
    }
}