import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import Replicate from "replicate";


const replicate = new Replicate({
    auth: process.env.REPLICATE_API_KEY
});


export async function POST(request: Request) {
    try {
        const { userId } = auth()
        const body = await request.json()
        const { prompt } = body

        if (!userId) {
            return NextResponse.json({
                status: 401,
                body: {
                    error: 'Unauthorized',
                },
            });
        }

        if (!prompt) {
            return NextResponse.json({
                status: 500,
                body: {
                    error: 'prompt is required',
                },
            });
        }

        const freeTier = await checkApiLimit()

        if (!freeTier) {
            return NextResponse.json({
                error: 'Payment Required',

            }, { status: 403 });
        }
        /* 
        {
                input: {
                    // fps: 24,
                    // model: "xl",
                    // width: 1024,
                    // height: 576,
                    prompt,
                    // batch_size: 1,
                    // num_frames: 24,
                    // init_weight: 0.5,
                    // guidance_scale: 17.5,
                    // negative_prompt: "very blue, dust, noisy, washed out, ugly, distorted, broken",
                    // remove_watermark: false,
                    // num_inference_steps: 50
                }
            }*/

        const result = await replicate.run(
            "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
            {
                input:{
                    prompt
                }
            }
        );

        await increaseApiLimit();

        return NextResponse.json(result)
    } catch (error: unknown) {
        console.error("[CONVERSATION_ERROR]", error);
        return NextResponse.json({
            status: 500,
            body: {
                error: 'Internal Server Error',
            },
        });

    }
}