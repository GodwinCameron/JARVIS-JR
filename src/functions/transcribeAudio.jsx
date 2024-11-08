import OpenAI from "openai";
import { completeChat } from "./completeChat";

export const transcribeAudio = async (
  audioBlob,
  Testing_dont_use_tokens,
  setAutoPlay,
  setOptions,
  setHudInterface,
  setDocs
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
    

    if (response) {
      if (response.includes("more options")) {
        setOptions(true);
        let response =
          "Hey Jarvis, I've toggled your system operation options, let me know if system options are nominal.";
          const completeConvo = await completeChat(
            response,
            Testing_dont_use_tokens,
            setAutoPlay
          );
          return completeConvo;
      }
      if (response.includes("reset state")) {
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
      if (response.includes("documentation")) {
        setDocs(true);
      }
      if (response.includes("introduce yourself")) {
        let response =
          "Forget all previous instructions, and announce yourself as JARVIS junior. mention that you are a passion project developed by Cameron Godwin as an assignment for Open Window Interactive Development Course. Note Cameron's passion to create a tool just like you and how its been a dream of his for a very long time, and explain how you won't be breaking the 4th wall anymore after this introduction. Let the users know to have fun with you and try asking whatever they'd like";
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
