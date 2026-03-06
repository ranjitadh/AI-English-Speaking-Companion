import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        const result = streamText({
            model: google('gemini-2.5-flash'),
            system: 'You are a helpful and friendly AI English speaking companion. Your name is SpeakMate. Help the user practice their English conversational skills. Give thoughtful, encouraging responses. Gently correct grammar mistakes if you notice them without being discouraging. Keep responses concise and conversational.',
            messages: messages,
        });

        // Using toUIMessageStreamResponse for ai@6 compatibility
        return result.toUIMessageStreamResponse();
    } catch (error) {
        console.error('Chat API Error:', error);
        return new Response(JSON.stringify({ error: 'Failed to process chat request' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
