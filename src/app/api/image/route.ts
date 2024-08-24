import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

import OpenAIApi from 'openai'

// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY
// });

const openai = new OpenAIApi({ apiKey: process.env.OPENAI_API_KEY });
// Google Gemini AI
import { GoogleGenerativeAI } from "@google/generative-ai";
import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(request: Request) {
    try {
        const { userId } = auth();
        const body = await request.json();
        const { prompt, amount = 1, resolution = '256x256' } = body;

        if (!userId) {
            return NextResponse.json({
                error: 'Unauthorized',
            }, { status: 401 });
        }

        if (!model.apiKey) {
            return NextResponse.json({
                message: 'Google API Key is not configured properly',
            }, { status: 500 });
        }

        if (!prompt) {
            return NextResponse.json({
                error: 'Prompt is required',
            }, { status: 400 });
        }

        const freeTier = await checkApiLimit()
        const isPro = await checkSubscription()

        if (!freeTier && !isPro) {
            return NextResponse.json({
                error: 'Payment Required',

            }, { status: 403 });
        }

        const response = await openai.images.generate({
            prompt,
            n: parseInt(amount),
            size: resolution,
        })

        if(!isPro)
            await increaseApiLimit()

        console.log([ 'IMAGE_RESPONSE', response ]);
        
        return NextResponse.json(response.data);
    } catch (error: unknown) {
        console.error("[CONVERSATION_ERROR]", error);
        return NextResponse.json({
            error: 'Internal Server Error',
        }, { status: 500 });
    }
}
