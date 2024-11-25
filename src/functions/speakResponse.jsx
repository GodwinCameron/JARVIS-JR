import OpenAI from "openai";

export async function speakResponse(content, setAutoPlay, FridayMode) {
 
  const apikey = localStorage.getItem("key");

  let voice = "onyx"
  if (FridayMode==="enabled") {
    voice = "nova"
  }
  


  // // Initialize OpenAI API
  // const openai = new OpenAI({
  //   apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  //   dangerouslyAllowBrowser: true,
  // });

  // Initialize OpenAI API Using localstorage API key
  const openai = new OpenAI({
    apiKey: apikey,
    dangerouslyAllowBrowser: true,
  });

    // Call OpenAI API (Make sure you use the right API client for browser environments)
    if (content) {

      const transformedMessage = content.replace(/```([\s\S]*?)```/g, (match) => {
        // Return the static string "code"
        return " here's a code snippet "; 
    });

      const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: voice,
        input: transformedMessage,
      });
      // Convert response to a Blob (browser-compatible)
      const mp3Blob = new Blob([await mp3.arrayBuffer()], {
        type: "audio/mp3",
      });

      // Create a URL for the Blob
      const mp3Url = URL.createObjectURL(mp3Blob);

      document.getElementById("audioPlayback2").src = mp3Url;
      setAutoPlay(true);
    } else {
      const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: "onyx",
        input: "I am sorry, I did not understand that.",
      });
      // Convert response to a Blob (browser-compatible)
      const mp3Blob = new Blob([await mp3.arrayBuffer()], {
        type: "audio/mp3",
      });

      // Create a URL for the Blob
      const mp3Url = URL.createObjectURL(mp3Blob);

      document.getElementById("audioPlayback2").src = mp3Url;
      setAutoPlay(true);
    }
  }