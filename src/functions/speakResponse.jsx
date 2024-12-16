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
        return " and the code snippet "; 
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


























































//   async function synthesizeSpeech() {
//     const endpoint = "https://texttospeech.googleapis.com/v1/text:synthesize";
    
//     const accessToken = await fetchAccessToken(); // Implement this function to handle OAuth
    
//     const data = {
//       input: {
//         text: "Hello, I am Jarvis, nice to meet you Mr. Stark!. Will that be all Ms. Potts?"
//       },
//       voice: {
//         languageCode: "en-GB",
//         name: "en-GB-Standard-O"
//       },
//       audioConfig: {
//         audioEncoding: "LINEAR16"
//       }
//     };
  
//     try {
//       const response = await fetch(endpoint, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-Goog-User-Project': '[YOUR_PROJECT_ID]', // Include your Google Cloud project ID here
//           'Authorization': `Bearer ${accessToken}`
//         },
//         body: JSON.stringify(data)
//       });
  
//       if (!response.ok) {
//         throw new Error('Network response was not ok ' + response.statusText);
//       }
  
//       const audioContent = await response.json();
//       console.log(audioContent);
//       // Here you can process the audioContent or play the audio as needed
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }












































// export async function speakResponseGoogle(content, setAutoPlay, FridayMode) {
//   const apiKey = localStorage.getItem("googleApiKey"); // Replace with your Google API key

//   const voice = FridayMode === "enabled" ? "en-GB-Wavenet-C" : "en-GB-Wavenet-D"; // Adjust based on availability

//   const baseUrl = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;

//   const transformedMessage = content.replace(/```([\s\S]*?)```/g, (match) => {
//     // Return the static string "code"
//     return " here's a code snippet "; 
// });
  
//   const requestBody = {
//     input: { text: transformedMessage },
//     voice: {
//       languageCode: "en-GB",
//       name: "en-GB-Standard-O"
//     },
//     audioConfig: { audioEncoding: "MP3" }
//   };

//   try {
//     const response = await fetch(baseUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-Goog-User-Project': 'godwin-industries', // Include your Google Cloud project ID here
//         'Authorization': `Bearer ${accessToken}`
//       },
//       body: JSON.stringify(requestBody)
//     });

//     if (!response.ok) {
//       throw new Error('Network response was not ok ' + response.statusText);
//     }

//     const { audioContent } = await response.json();
    
//     // Convert base64 audio to a Blob
//     const mp3Blob = new Blob([new Uint8Array(atob(audioContent).split('').map(char => char.charCodeAt(0)))], {
//       type: "audio/mp3",
//     });

//     // Create a URL for the Blob
//     const mp3Url = URL.createObjectURL(mp3Blob);

//     document.getElementById("audioPlayback2").src = mp3Url;
//     setAutoPlay(true);
    
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }