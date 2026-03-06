import { streamText } from "ai";
import { google } from "@ai-sdk/google";

async function run() {
  try {
    const result = streamText({
      model: google('gemini-2.5-flash'),
      prompt: 'Hello',
    });
    console.log("Success");
  } catch (e) {
    console.error("Error:", e);
  }
}
run();
