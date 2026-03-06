import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

async function main() {
    try {
        const { text } = await generateText({
            model: google('gemini-2.0-flash'),
            prompt: 'say hello',
        });
        console.log('Success:', text);
    } catch (error) {
        console.error('Error:', error);
    }
}
main();
