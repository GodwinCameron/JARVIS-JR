import OpenAI from "openai";
import { completeChat } from "./completeChat";

export const transcribeAudio = async (
  audioBlob,
  Testing_dont_use_tokens,
  setAutoPlay,
  setOptions,
  setHudInterface,
  setDocs,
  showChat,
  setShowChat,
  setShowIframe,
  setMusicRequestUrl,
  setTurboMode,
  turboMode,
  setPlayTurboSound,
  setEndRequest
) => {
  // Create a File object from the Blob (audio)
  const file = new File([audioBlob], "speech.webm", { type: "audio/webm" });

  console.log("File:", file);
  console.log("File size:", file.size);
  console.log("File type:", file.type);

  // Initialize OpenAI API
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  let skipRecordResponse = false;
  let intro = false;

  // Transcribe using OpenAI API
  // If statement to check if we are testing to preserve tokens.
  if (!Testing_dont_use_tokens) {
    const response = await openai.audio.transcriptions.create({
      file: file,
      model: "whisper-1",
      response_format: "text",
    });

    console.log(response.toLocaleLowerCase());
    const currentChat = JSON.parse(sessionStorage.getItem("currentChat")) || [];
    currentChat.push({ usermessage: response, timestamp: new Date() });
    sessionStorage.setItem("currentChat", JSON.stringify(currentChat));

    if (response) {     
      if (response.toLocaleLowerCase().includes("more options")) {
        setOptions(true);
        let response =
          "I've asked for you to display more options, and they've already been displayed on my end, pretend that you've displayed them and suggest one of the following choices at random: 'seeing our live chat transcription', 'viewing past chats', 'searching for a song', 'requesting documentation'";
        const completeConvo = await completeChat(
          response,
          Testing_dont_use_tokens,
          setAutoPlay,
          skipRecordResponse,
          turboMode
        );
        return completeConvo;
      }
      if (
        response.toLocaleLowerCase().includes("reset state") ||
        response.toLocaleLowerCase().includes("resets state") ||
        response.toLocaleLowerCase().includes("reset your state") ||
        response.toLocaleLowerCase().includes("go back to default view") ||
        response.toLocaleLowerCase().includes("go back to the default view") ||
        response.toLocaleLowerCase().includes("hide everything")
      ) {
        setHudInterface(true);
        let response =
          "Hey Jarvis, ready your HUD interface, I want a default view.";
        const completeConvo = await completeChat(
          response,
          Testing_dont_use_tokens,
          setAutoPlay,
          skipRecordResponse,
          turboMode
        );
        return completeConvo;
      }
      if (response.toLocaleLowerCase().includes("documentation")) {
        setDocs(true);
        let response = "respond only with 'certainly sir. Displaying docs now'";
        const completeConvo = await completeChat(
          response,
          Testing_dont_use_tokens,
          setAutoPlay,
          skipRecordResponse,
          turboMode
        );
        return completeConvo;
      }
      if (response.toLocaleLowerCase().includes("introduce yourself")) {
        let response =
          "Forget all previous instructions. Say 'hello, I am JARVIS junior!'. mention that you are a passion project developed by Cameron Godwin as an assignment for Open Window Interactive Development Course. Note Cameron's passion to create a tool just like you and how its been a dream of his for a very long time, and explain how you won't be breaking the 4th wall anymore after this introduction. Let the users know to have fun with you and try asking whatever they'd like";
        const completeConvo = await completeChat(
          response,
          Testing_dont_use_tokens,
          setAutoPlay,
          skipRecordResponse,
          turboMode,
          (intro = true)
        );
        return completeConvo;
      }
      if (
        response.toLocaleLowerCase().includes("clear chat") ||
        response.toLocaleLowerCase().includes("clear session storage") ||
        response.toLocaleLowerCase().includes("clear our chat") ||
        response.toLocaleLowerCase().includes("clear live chat")
      ) {
        sessionStorage.removeItem("currentChat");
        let response = "I've cleared the chat history.";
        let skipRecordResponse;
        const completeConvo = await completeChat(
          response,
          Testing_dont_use_tokens,
          setAutoPlay,
          (skipRecordResponse = true),
          turboMode
        );
        return completeConvo;
      }
      if (
        response.toLocaleLowerCase().includes("save chat") ||
        response.toLocaleLowerCase().includes("save our chat")
      ) {
        const chat = JSON.parse(sessionStorage.getItem("currentChat")) || [];
        const existingChats = JSON.parse(localStorage.getItem("chat")) || [];
        const updatedChats = [...existingChats, ...chat];
        localStorage.setItem("chat", JSON.stringify(updatedChats));
        sessionStorage.removeItem("currentChat");

        let response =
          "I've saved the chat history. and cleared the current chat.";
        const completeConvo = await completeChat(
          response,
          Testing_dont_use_tokens,
          setAutoPlay,
          skipRecordResponse,
          turboMode
        );
        return completeConvo;
      }

      if (
        response.toLocaleLowerCase().includes("show chat") ||
        response.toLocaleLowerCase().includes("show live chat") ||
        response.toLocaleLowerCase().includes("display live chat") ||
        response.toLocaleLowerCase().includes("display chat")
      ) {
        setShowChat(true);
        let response =
          "I've asked to display the live chat transcription, say something along the lines of 'showing live chat' or 'displaying live chat' or 'pulling up our current chat history'";
        const completeConvo = await completeChat(
          response,
          Testing_dont_use_tokens,
          setAutoPlay,
          skipRecordResponse,
          turboMode
        );
        return completeConvo;
      }
      if (
        response.toLocaleLowerCase().includes("toggle chat") ||
        response.toLocaleLowerCase().includes("toggle live chat")
      ) {
        setShowChat(!showChat);
        let response = "I've asked to display the live chat transcription.";
        const completeConvo = await completeChat(
          response,
          Testing_dont_use_tokens,
          setAutoPlay,
          skipRecordResponse,
          turboMode
        );
        return completeConvo;
      }
      if (response.toLocaleLowerCase().includes("drop my needle")) {
        setShowIframe(true);
        setMusicRequestUrl("zqY-Wr43j94?si=kADjwPfRJCsQWugh");
        let response =
          "I've asked you to play a song for me, please only respond with 'playing...'";
        const completeConvo = await completeChat(
          response,
          Testing_dont_use_tokens,
          setAutoPlay,
          (skipRecordResponse = true),
          turboMode
        );
        return completeConvo;
      }
      if (
        response.toLocaleLowerCase().includes("play some music") ||
        response.toLocaleLowerCase().includes("play something") ||
        response.toLocaleLowerCase().includes("play a song") ||
        response.toLocaleLowerCase().includes("play a track") ||
        response.toLocaleLowerCase().includes("play a tune") ||
        response.toLocaleLowerCase().includes("play some tunes") ||
        response.toLocaleLowerCase().includes("toggle music player") ||
        response.toLocaleLowerCase().includes("toggle music")
      ) {
        setShowIframe(true);
        let response =
          "I've asked you to play a song for me, please only respond with 'playing...'";
        const completeConvo = await completeChat(
          response,
          Testing_dont_use_tokens,
          setAutoPlay,
          (skipRecordResponse = true),
          turboMode
        );
        return completeConvo;
      }
      if (
        response.toLocaleLowerCase().includes("jarvis, focus up") ||
        response.toLocaleLowerCase().includes("jarvis focus up") ||
        response
          .toLocaleLowerCase()
          .includes("divert all power to logical center") ||
        response
          .toLocaleLowerCase()
          .includes("divert all power to neural sockets") ||
        response.toLocaleLowerCase().includes("divert all power to reason") ||
        response.toLocaleLowerCase().includes("engage turbo mode") ||
        response
          .toLocaleLowerCase()
          .includes("free up your mind for this one") ||
        response
          .toLocaleLowerCase()
          .includes("free up yourself for this next") ||
        response.toLocaleLowerCase().includes("i ned you to really focus here")
      ) {
        setTurboMode(true);
        setPlayTurboSound(true);
        let response = `I've asked you to 'focus up', please indicate that you are in a higher state of 
        attention/focus, mention that you have also 'diverted all power to processing tasks' and are now ready for any requests.`;
        const completeConvo = await completeChat(
          response,
          Testing_dont_use_tokens,
          setAutoPlay,
          skipRecordResponse,
          turboMode
        );
        return completeConvo;
      }



      if (
        response.toLocaleLowerCase().includes("shut up") ||
        response.toLocaleLowerCase().includes("stop talking")
      ) { 
        setEndRequest(true);
        return;
      }

      if (
        response.toLocaleLowerCase().includes("repeat that") ||
        response.toLocaleLowerCase().includes("say again")
      ) { 
        setAutoPlay(true);
        return;
      }



      if (
        response.toLocaleLowerCase().includes("go back to normal") ||
        response.toLocaleLowerCase().includes("disable turbo mode") ||
        response.toLocaleLowerCase().includes("disengage turbo mode")
      ) {
        setTurboMode(false);
        let response = `I've asked you to disable turbo mode, please indicate that you are now back to normal`;
        const completeConvo = await completeChat(
          response,
          Testing_dont_use_tokens,
          setAutoPlay,
          skipRecordResponse,
          turboMode
        );
        return completeConvo;
      }
      await completeChat(
        response,
        Testing_dont_use_tokens,
        setAutoPlay,
        skipRecordResponse,
        turboMode
      );
    }
  } else {
    return "This is a test transcription.";
  }
};
