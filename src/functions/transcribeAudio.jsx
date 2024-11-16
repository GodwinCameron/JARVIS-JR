import OpenAI from "openai";
import { completeChat } from "./completeChat";
import { useEffect } from "react";

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
  setEndRequest,
  FridayMode
) => {
  // Create a File object from the Blob (audio)
  const file = new File([audioBlob], "speech.webm", { type: "audio/webm" });

  console.log("File:", file);
  console.log("File size:", file.size);
  console.log("File type:", file.type);

  const apikey = localStorage.getItem("key");

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
          turboMode,
          intro,
          FridayMode
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
          turboMode,
          intro,
          FridayMode
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
          (intro = true),
          FridayMode
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
          turboMode,
          intro,
          FridayMode
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
          turboMode,
          intro,
          FridayMode
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
          turboMode,
          intro,
          FridayMode
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
          turboMode,
          intro,
          FridayMode
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
          turboMode,
          intro,
          FridayMode
        );
        return completeConvo;
      }
      if (
        response.toLocaleLowerCase().includes("wake up, daddy's home") ||
        response.toLocaleLowerCase().includes("wake up. daddy's home") ||
        response.toLocaleLowerCase().includes("wake up daddy's home")
      ) {
        setShowIframe(true);
        setMusicRequestUrl("BN1WwnEDWAM?si=s_WQbhooxMooFUKJ");
        let response =
          "I've asked you to welcome me home, please only respond with 'welcome home sir, congratulations on your successful mission'";
        const completeConvo = await completeChat(
          response,
          Testing_dont_use_tokens,
          setAutoPlay,
          (skipRecordResponse = true),
          turboMode,
          (intro = true),
          FridayMode
        );
        return completeConvo;
      }
      if (
        response.toLocaleLowerCase().includes("play music from iron man") ||
        response.toLocaleLowerCase().includes("play songs from iron man")
      ) {
        setShowIframe(true);
        setMusicRequestUrl("8aQRq9hhekA?si=mE9D0SAlOuNXP-Bj");
        let response =
          "I've asked you to play a song for me, please only respond with 'playing...'";
        const completeConvo = await completeChat(
          response,
          Testing_dont_use_tokens,
          setAutoPlay,
          (skipRecordResponse = true),
          turboMode,
          (intro = true),
          FridayMode
        );
        return completeConvo;
      }
      if (
        response.toLocaleLowerCase().includes("play something i'd listen to") ||
        response
          .toLocaleLowerCase()
          .includes("play something i would listen to") ||
        response
          .toLocaleLowerCase()
          .includes("play songs tony stark would listen to") ||
        response
          .toLocaleLowerCase()
          .includes("play something tony stark would listen to")
      ) {
        setShowIframe(true);
        let rand = Math.floor(Math.random() * 2);
        if (rand > 0) {
          setMusicRequestUrl("8aQRq9hhekA?si=mE9D0SAlOuNXP-Bj");
        } else {
          setMusicRequestUrl("wLoWd2KyUro?si=RTbhlMvFeVxpRsHC");
        }
        let response =
          "I've asked you to play a song for me, please only respond with 'playing...'";
        const completeConvo = await completeChat(
          response,
          Testing_dont_use_tokens,
          setAutoPlay,
          (skipRecordResponse = true),
          turboMode,
          (intro = true),
          FridayMode
        );
        return completeConvo;
      }
      if (
        response.toLocaleLowerCase().includes("play some music") ||
        response.toLocaleLowerCase().includes("play something") ||
        response.toLocaleLowerCase().includes("play a song") ||
        response.toLocaleLowerCase().includes("play a track") ||
        response.toLocaleLowerCase().includes("play music") ||
        response.toLocaleLowerCase().includes("play a tune") ||
        response.toLocaleLowerCase().includes("play some tunes") ||
        response.toLocaleLowerCase().includes("toggle music player") ||
        response.toLocaleLowerCase().includes("toggle music")
      ) {
        setShowIframe(true);
        setMusicRequestUrl(
          "videoseries?si=L5RcgG5Mr2GfEmvN&amp;list=PLBymIW1wS9vYQSx7ZtP6YNeNOiubHI6JE"
        );
        let response =
          "I've asked you to play a song for me, please only respond with 'playing...'";
        const completeConvo = await completeChat(
          response,
          Testing_dont_use_tokens,
          setAutoPlay,
          (skipRecordResponse = true),
          turboMode,
          intro,
          FridayMode
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
        response
          .toLocaleLowerCase()
          .includes("divert power to neural sockets") ||
        response.toLocaleLowerCase().includes("divert all power to reason") ||
        response.toLocaleLowerCase().includes("time to engage turbo mode") ||
        response
          .toLocaleLowerCase()
          .includes("free up your mind for this one") ||
        response
          .toLocaleLowerCase()
          .includes("free up yourself for this next") ||
        response.toLocaleLowerCase().includes("i need you to really focus here")
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
          turboMode,
          intro,
          FridayMode
        );
        return completeConvo;
      }

      if (
        response.toLocaleLowerCase().includes("shut up") ||
        response.toLocaleLowerCase().includes("stop talking") ||
        response.toLocaleLowerCase().includes("that's all jarvis") ||
        response.toLocaleLowerCase().includes("jarvis, that's all") ||
        response.toLocaleLowerCase().includes("jarvis, be quiet")
      ) {
        setEndRequest(true);
        return;
      }
      if (
        response.toLocaleLowerCase().includes("jarvis, mute") ||
        response.toLocaleLowerCase().includes("jarvis mute") ||
        response.toLocaleLowerCase().includes("mute, jarvis") ||
        response.toLocaleLowerCase().includes("mute jarvis")
      ) {
        setShowIframe(false);
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
          turboMode,
          intro,
          FridayMode
        );
        return completeConvo;
      }
      if (
        response.toLocaleLowerCase().includes("jarvis, are you there?") ||
        response.toLocaleLowerCase().includes("are you there, jarvis?") ||
        response.toLocaleLowerCase().includes("jarvis are you there") ||
        response.toLocaleLowerCase().includes("are you there jarvis")
      ) {
        setHudInterface(true);
        let response =
          "Hey Jarvis. (p.s. please ONLY respond with 'at your service, sir.' don't say anything else before or after)";
        const completeConvo = await completeChat(
          response,
          Testing_dont_use_tokens,
          setAutoPlay,
          skipRecordResponse,
          turboMode,
          (intro = true),
          FridayMode
        );
        return completeConvo;
      }
      await completeChat(
        response,
        Testing_dont_use_tokens,
        setAutoPlay,
        skipRecordResponse,
        turboMode,
        intro,
        FridayMode
      );
    }
  } else {
    return "This is a test transcription.";
  }
};
