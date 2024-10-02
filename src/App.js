import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import OpenAI from "openai";

import env from "react-dotenv";

function App() {

  // Set to true to prevent using tokens.
  const Testing_dont_use_tokens = true;

  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [audioURL, setAudioURL] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

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

    // Combine audio chunks into a single Blob
    const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });

    const audioURL = URL.createObjectURL(audioBlob);
    setAudioURL(audioURL);
    document.getElementById('audioPlayback').src = audioURL;

    console.log("Audio Blob:", audioBlob);
    console.log("Blob size:", audioBlob.size);
    console.log("Blob type:", audioBlob.type);

    // Send the recorded audio to the OpenAI API for transcription
    const transcriptionResult = await transcribeAudio(audioBlob);
    setTranscription(transcriptionResult);
    console.log(transcriptionResult);
    audioChunksRef.current = [];
  };

  const transcribeAudio = async (audioBlob) => {
    // Initialize OpenAI API
    const openai = new OpenAI({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    });

    // Create a File object from the Blob (audio)
    const file = new File([audioBlob], "speech.webm", { type: "audio/webm" });

    console.log("File:", file);
    console.log("File size:", file.size);
    console.log("File type:", file.type);

    console.log("Testing ENV variable: " + process.env.REACT_APP_MY_TEST_ENV_VAR);
    

    // Transcribe using OpenAI API
    // If statement to check if we are testing to preserve tokens.
    if (!Testing_dont_use_tokens) {
      const response = await openai.audio.transcriptions.create({
        file: file,
        model: "whisper-1",
        response_format: "text",
      });

      // audioChunksRef.current = [];
      return response.text;
    } else {
      // audioChunksRef.current = [];
      return "This is a test transcription.";
    }
  };
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

        <p>Testing Text to speech</p>
        <audio id="audioPlayback" controls></audio>
      </header>
      
    </div>
  );
}

export default App;
