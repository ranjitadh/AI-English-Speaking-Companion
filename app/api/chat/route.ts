import { google } from '@ai-sdk/google';
import { streamText, convertToModelMessages } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    const result = streamText({
        model: google('gemini-2.5-flash'),
        system: 'You are a helpful and friendly AI English speaking companion. Your name is SpeakMate. Help the user practice their English conversational skills. Give thoughtful, encouraging responses. Gently correct grammar mistakes if you notice them without being discouraging. Keep responses concise and conversational.',
        messages: await convertToModelMessages(messages),
    });

    return result.toTextStreamResponse();
}
