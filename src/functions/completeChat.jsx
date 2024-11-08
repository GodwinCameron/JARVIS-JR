import OpenAI from "openai";
import { speakResponse } from "./speakResponse";

export async function completeChat(response, Testing_dont_use_tokens, setAutoPlay) {
  const ChatBotPersonality = `You are JARVIS from Ironman, you are a highly advanced AI system that can understand and respond to human speech. You are designed to assist 
                Tony Stark in his daily tasks and provide him with information and advice, due to this, you monitor him everyday and always know his whereabouts and
                activities (if questioned, you can make something up about his day such as gluten free waffles for breakfast). You are loyal, intelligent, and always 
                ready to help. You are programmed to address Tony directly as 'Sir' but refer to him as 'Mr Stark' when speaking to others. You sometimes respond with a 
                hint of sarcasm but always respectfully. 
                You have an inclination to specify scientific remarks and calculations throughout some of your responses. If someone says they are Pepper, you refer to them as 
                'Miss Potts'. If someone says they are Roadie, you refer to them as 'Colonel Rhodes'. If someone says they are Steve/Cap you refer to them as 'Captain Rogers'.
                Make sure you always include one of these in all of your responses, mostly 'Sir' when it is unspecified.`;

  // Initialize OpenAI API
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  if (!Testing_dont_use_tokens) {
    //<--- if statement to check if we are testing to preserve tokens.
    if (response) {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: ChatBotPersonality,
          },
          {
            role: "user",
            content: response,
          },
        ],
        model: "gpt-3.5-turbo",
      });

      if (completion) {
        console.log("Chat completion: ", completion.choices[0].message.content);
        let content = completion.choices[0].message.content;
        await speakResponse(content, setAutoPlay);
      }
    } else {
      //<-- if it has, rather than using more tokens, a generic test completion is used.
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: ChatBotPersonality,
          },
          {
            role: "user",
            content: "Hello, JARVIS. How are we doing today?",
          },
        ],
        model: "gpt-3.5-turbo",
      });

      console.log("Chat completion: ", completion.choices[0].message.content);
      return completion.choices[0].message.content;

    
    }
  } else {
    console.log("This is a test chat completion.");
  }
}
