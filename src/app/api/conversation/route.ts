import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Google Gemini AI
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);


const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request : Request){
    try {
        const { userId } = auth()
        const body = await request.json()
        const {messages} = body

        if(!userId){
            return NextResponse.json({
                status: 401,
                body: {
                    error: 'Unauthorized',
                },
            });
        }

        if(!model.apiKey){
            return NextResponse.json({
                message: 'Google API Key is not configured properly',
            },{status: 500});
        }
        // if(!openai.apiKey){
        //     return NextResponse.json({
        //         status: 500,
        //         body: {
        //             error: 'OpenAI is not configured properly',
        //         },
        //     });
        // }

        if(!messages){
            return NextResponse.json({
                status: 400,
                body: {
                    error: 'Message is required',
                },
            });
        }

        // const response = await openai.chat.completions.create({
        //     model: 'gpt-4o-mini',
        //     messages
        // })

        const result = await model.generateContent(messages)

        return NextResponse.json(result.response.text())
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