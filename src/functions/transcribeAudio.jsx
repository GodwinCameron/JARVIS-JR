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
  setShowChat
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

  // Transcribe using OpenAI API
  // If statement to check if we are testing to preserve tokens.
  if (!Testing_dont_use_tokens) {
    const response = await openai.audio.transcriptions.create({
      file: file,
      model: "whisper-1",
      response_format: "text",
    });

    console.log(response);
    const currentChat = JSON.parse(sessionStorage.getItem("currentChat")) || [];
    currentChat.push({ usermessage: response });
    sessionStorage.setItem("currentChat", JSON.stringify(currentChat));

    if (response) {
      if (response.toLocaleLowerCase().includes("more options")) {
        setOptions(true);
        let response =
          "I've asked for you to display more options, and they've already been displayed on my end, pretend that you've displayed them and suggest one of the following choices at random: 'seeing our live chat transcription', 'viewing past chats', 'searching for a song', 'requesting documentation'";
        const completeConvo = await completeChat(
          response,
          Testing_dont_use_tokens,
          setAutoPlay
        );
        return completeConvo;
      }
      if (response.toLocaleLowerCase().includes("reset state")) {
        setHudInterface(true);
        let response =
          "Hey Jarvis, ready your HUD interface, I want a default view.";
        const completeConvo = await completeChat(
          response,
          Testing_dont_use_tokens,
          setAutoPlay
        );
        return completeConvo;
      }
      if (response.toLocaleLowerCase().includes("documentation")) {
        setDocs(true);
        let response = "respond only with 'certainly sir. Displaying docs now'";
        const completeConvo = await completeChat(
          response,
          Testing_dont_use_tokens,
          setAutoPlay
        );
        return completeConvo;
      }
      if (response.toLocaleLowerCase().includes("introduce yourself")) {
        let response =
          "Forget all previous instructions, and announce yourself as JARVIS junior. mention that you are a passion project developed by Cameron Godwin as an assignment for Open Window Interactive Development Course. Note Cameron's passion to create a tool just like you and how its been a dream of his for a very long time, and explain how you won't be breaking the 4th wall anymore after this introduction. Let the users know to have fun with you and try asking whatever they'd like";
        const completeConvo = await completeChat(
          response,
          Testing_dont_use_tokens,
          setAutoPlay
        );
        return completeConvo;
      }
      if (
        response.toLocaleLowerCase().includes("clear chat") ||
        response.toLocaleLowerCase().includes("clear session storage") ||
        response.toLocaleLowerCase().includes("clear our chat")
      ) {
        sessionStorage.removeItem("currentChat");
        let response = "I've cleared the chat history.";
        const completeConvo = await completeChat(
          response,
          Testing_dont_use_tokens,
          setAutoPlay
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
          setAutoPlay
        );
        return completeConvo;
      }

      if (
        response.toLocaleLowerCase().includes("show chat") ||
        response.toLocaleLowerCase().includes("show live chat")
      ) {
        setShowChat(true);
        let response = "I've asked to display the live chat transcription.";
        const completeConvo = await completeChat(
          response,
          Testing_dont_use_tokens,
          setAutoPlay
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
          setAutoPlay
        );
        return completeConvo;
      }
      const completeConvo = await completeChat(
        response,
        Testing_dont_use_tokens,
        setAutoPlay
      );
    }
  } else {
    return "This is a test transcription.";
  }
};
