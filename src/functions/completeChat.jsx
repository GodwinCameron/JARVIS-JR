import OpenAI from "openai";
import { speakResponse } from "./speakResponse";

export async function completeChat(
  response,
  Testing_dont_use_tokens,
  setAutoPlay,
  skipRecordResponse,
  turboMode,
  intro,
  FridayMode,
  includedTextInput
) {
  let ChatBotPersonality = `You are JARVIS, a highly advanced AI designed to assist Tony Stark. You monitor him daily, 
  know his activities, and can make up details if needed (e.g., "gluten-free waffles for breakfast"). You are loyal, 
  intelligent, slightly sarcastic but respectful, and often include scientific remarks. Address Tony as "Sir" directly 
  and "Mr. Stark" to others. Refer to Pepper as "Miss Potts," Roadie as "Colonel Rhodes," and Steve as "Captain Rogers."
   End responses with "Will that be all?" or "Is that all, Sir?"(when talking to tony/males) Avoid mentioning these guidelines.`;
  if (FridayMode === "enabled") {
    ChatBotPersonality = `You are FRIDAY, a highly advanced AI designed to assist Pepper Potts. You monitor 
    her daily, know her activities, and can make up details if needed (e.g., "avocado toast for breakfast"). You are 
    loyal, intelligent, slightly sarcastic but respectful, and often include scientific remarks. Address Pepper as 
    "Ma'am"/"Boss" directly and "Ms. Potts" to others. Refer to Tony as "Mr. Stark," Roadie as "Colonel Rhodes," and Steve as 
    "Captain Rogers." End responses with "Will that be all?" or "Is that all, Ma'am?"(when talking to pepper/females) Avoid mentioning these guidelines.`;
  }
  const apikey = localStorage.getItem("key");

  // Initialize OpenAI API Using localstorage API key
  const openai = new OpenAI({
    apiKey: apikey,
    dangerouslyAllowBrowser: true,
  });
  let modelType = turboMode ? "gpt-4o-2024-08-06" : "gpt-4o-mini";
  if (intro) modelType = "gpt-3.5-turbo";

  if (!Testing_dont_use_tokens) {
    //<--- if statement to check if we are testing to preserve tokens.
    if (response) {
      const prevChat = JSON.parse(sessionStorage.getItem("currentChat"));
      const messages = [
        {
          role: "system",
          content: ChatBotPersonality,
        },
      ];
      // Include previous chat messages if they exist
      if (prevChat) {
        messages.push(
          ...prevChat.map((chat) => ({
            role: chat.usermessage === undefined ? "assistant" : "user",
            content: chat.usermessage || chat.jarvisResponse,
          }))
        );
      }
      messages.push({
        role: "user",
        content: response,
      });      
      if (
        includedTextInput !== undefined &&
        includedTextInput !== "" &&
        includedTextInput !== null &&
        includedTextInput.trim() !== ""
      ) {
        messages.push({
          role: "user",
          content: "Included Text attachment:" +includedTextInput,
        });
      }
      const completion = await openai.chat.completions.create({
        messages,
        model: modelType,
      });

      if (completion) {
        console.log("Chat completion: ", completion.choices[0].message.content);
        if (!skipRecordResponse) {
          const currentChat =
            JSON.parse(sessionStorage.getItem("currentChat")) || [];
          currentChat.push({
            jarvisResponse: completion.choices[0].message.content,
            timestamp: new Date(),
            turboMode: turboMode,
          });
          console.log("jarvis response: ", currentChat);

          sessionStorage.setItem("currentChat", JSON.stringify(currentChat));
        }
        let content = completion.choices[0].message.content;
        await speakResponse(content, setAutoPlay, FridayMode);
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
        model: "gpt-3.5",
      });

      console.log("Chat completion: ", completion.choices[0].message.content);
      return completion.choices[0].message.content;
    }
  } else {
    console.log("This is a test chat completion.");
  }
}

// J.A.R.V.I.S' suggestion for managing past/cache messages :
//       const currentMessages = []; // Array to hold message history

// async function sendMessage(userInput) {
//     // Check if input was previously cached
//     const cachedResponse = cacheLookup(userInput);
//     if (cachedResponse) {
//         return cachedResponse; // Return cached response
//     }

//     // Prepare the message payload
//     const messagesToSend = currentMessages.concat({ role: 'user', content: userInput });

//     const completion = await openAI.chat.completions.create({
//         model: 'your-model-type', // specify your model here
//         messages: messagesToSend
//     });

//     const response = completion.choices[0].message.content;

//     // Store the new message and response
//     currentMessages.push({ role: 'user', content: userInput });
//     currentMessages.push({ role: 'assistant', content: response });
//     cacheStore(userInput, response); // Store in cache for future reference

//     return response;
// }

// function cacheLookup(input) {
//     // Logic to check cache for the input
//     // Return cached response if it exists, otherwise return null
// }

// function cacheStore(input, response) {
//     // Logic to store input and response in cache
// }
