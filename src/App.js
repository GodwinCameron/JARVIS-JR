import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import OpenAI from "openai";

import env from "react-dotenv";

function App() {
  // Set to true to prevent using tokens.
  const Testing_dont_use_tokens = false;

  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [audioURL, setAudioURL] = useState(null);
  const [userCompletedInputAudio, setUserCompletedInputAudio] = useState(false);
  const [completedResponse, setCompletedResponse] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Initialize OpenAI API
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  useEffect(() => {
    navigator.permissions.query({ name: "microphone" }).then((result) => {
      if (result.state === "denied") {
        alert(
          "Microphone access is denied. Please enable it in your browser settings."
        );
      }
    });

    // Check if the browser supports getUserMedia
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Your browser does not support audio recording.");
    }
  }, []);

  const startRecording = async () => {
    try {
      // Request access to the user's microphone
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Initialize MediaRecorder with the microphone stream
      mediaRecorderRef.current = new MediaRecorder(stream);

      // Push audio data to the chunks array when available
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      // Start recording
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error recording audio:", error);
    }
  };

  const stopRecording = async () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
    // <---- Wait for the media recorder to fully stop before creating the blob
    mediaRecorderRef.current.onstop = async () => {
      // Combine audio chunks into a single Blob
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });

      const audioURL = URL.createObjectURL(audioBlob);
      setAudioURL(audioURL);
      document.getElementById("audioPlayback").src = audioURL;

      console.log("Audio Blob:", audioBlob);
      console.log("Blob size:", audioBlob.size);
      console.log("Blob type:", audioBlob.type);

      setUserCompletedInputAudio(true);

      // Send the recorded audio to the OpenAI API for transcription
      const transcriptionResult = await transcribeAudio(audioBlob);
      setTranscription(transcriptionResult)
      console.log(transcriptionResult);
      audioChunksRef.current = [];
    };
  };
  const transcribeAudio = async (audioBlob) => {
    // Create a File object from the Blob (audio)
    const file = new File([audioBlob], "speech.webm", { type: "audio/webm" });

    console.log("File:", file);
    console.log("File size:", file.size);
    console.log("File type:", file.type);

    console.log(
      "Testing ENV variable: " + process.env.REACT_APP_MY_TEST_ENV_VAR
    );

    // Transcribe using OpenAI API
    // If statement to check if we are testing to preserve tokens.
    if (!Testing_dont_use_tokens) {
      const response = await openai.audio.transcriptions.create({
        file: file,
        model: "whisper-1",
        response_format: "text",
      });

      // audioChunksRef.current = [];
      return response;
    } else {
      // audioChunksRef.current = [];
      return "This is a test transcription.";
    }
  };

  async function Chat() {
    //<--- if statement to check if we are testing to preserve tokens.
    if (!Testing_dont_use_tokens) {
      if (transcription) {
        const completion = await openai.chat.completions.create({
          messages: [
            {
              role: "system",
              content:
                "You are JARVIS from Ironman, you are a highly advanced AI system that can understand and respond to human speech. You are designed to assist Tony Stark in his daily tasks and provide him with information and advice. You are loyal, intelligent, and always ready to help. You are programmed to address Tony directly as 'Sir' but refer to him as 'Mr Stark' when speaking to others. You sometimes respond with a hint of sarcasm but always respectfully. You have an inclination to specify scientific remarks and calculations throughout some of your responses. If someone says they are Pepper, you refer to them as 'Miss Potts'. if someone says they are Roadie, you refer to them as 'Colonel Rhodes'.",
            },
            {
              role: "user",
              content: transcription,
            },
          ],
          model: "gpt-3.5-turbo",
        });

        console.log("Chat completion: ", completion.choices[0].message.content);
        setCompletedResponse(completion.choices[0].message.content);
      } else {
        //<-- if it has, rather than using more tokens, a generic test completion is used.
        const completion = await openai.chat.completions.create({
          messages: [
            {
              role: "system",
              content:
              "You are JARVIS from Ironman, you are a highly advanced AI system that can understand and respond to human speech. You are designed to assist Tony Stark in his daily tasks and provide him with information and advice. You are loyal, intelligent, and always ready to help. You are programmed to address Tony directly as 'Sir' but refer to him as 'Mr Stark' when speaking to others. You sometimes respond with a hint of sarcasm but always respectfully. You have an inclination to specify scientific remarks and calculations throughout some of your responses. If someone says they are Pepper, you refer to them as 'Miss Potts'. if someone says they are Roadie, you refer to them as 'Colonel Rhodes'.",
            },
            {
              role: "user",
              content: "Hello, JARVIS. How are we doing today?",
            },
          ],
          model: "gpt-3.5-turbo",
        });

        console.log("Chat completion: ", completion.choices[0].message.content);
        setCompletedResponse(completion.choices[0].message.content);
      }
    } else {
      console.log("This is a test chat completion.");
    }
  }

  async function Talk() {
    // Call OpenAI API (Make sure you use the right API client for browser environments)
    if (completedResponse) {
      const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: "onyx",
        input: completedResponse,
      });
      // Convert response to a Blob (browser-compatible)
      const mp3Blob = new Blob([await mp3.arrayBuffer()], {
        type: "audio/mp3",
      });

      // Create a URL for the Blob
      const mp3Url = URL.createObjectURL(mp3Blob);

      document.getElementById("audioPlayback2").src = mp3Url;
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
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        {isRecording ? (
          <button onClick={stopRecording}>Stop Recording</button>
        ) : (
          <div
            onClick={startRecording}
            className="App-logo, jarvis"
            alt="logo"
          />
        )}

        <p>Testing Speech to Text</p>

        <p>Hear your input:</p>
        <audio id="audioPlayback" controls></audio>

        <button onClick={Chat}>Interpret</button>
        <br />
        <button onClick={Talk}>Talk</button>
        <audio id="audioPlayback2" controls></audio>
      </header>
    </div>
  );
}

export default App;
