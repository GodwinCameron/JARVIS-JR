import logo from "./logo.svg";
import "./App.css";
import fs from "fs";
import React, { useState, useEffect, useRef } from "react";
import OpenAI from "openai";

function App() {
  const openai = new OpenAI();

  const SpeechToText = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [transcription, setTranscription] = useState("");
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    useEffect(() => {
      // Check if the browser supports getUserMedia
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("Your browser does not support audio recording.");
      }
    }, []);

    const startRecording = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      // Clear previously recorded audio
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    };

    const stopRecording = async () => {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      // Combine audio chunks into a single Blob
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/mp3" });

      // Send the recorded audio to the OpenAI API for transcription
      const transcriptionResult = await transcribeAudio(audioBlob);
      setTranscription(transcriptionResult);
    };

    const transcribeAudio = async (audioBlob) => {
      // Initialize OpenAI API
      const openai = new OpenAI({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY, // Store your OpenAI key in .env
      });

      // Create a File object from the Blob (audio)
      const file = new File([audioBlob], "speech.mp3", { type: "audio/mp3" });

      // Transcribe using OpenAI API
      const response = await openai.audio.transcriptions.create({
        file: file,
        model: "whisper-1",
        response_format: "text",
      });

      return response.text;
    };
  };
  return (
    <div className="App">
      <header className="App-header">
        {!isRecording ? (
          <div
            onClick={startRecording}
            className="App-logo, jarvis"
            alt="logo"
          />
        ) : (
          <button onClick={stopRecording}>Start Recording</button>
        )}

        <p>Testing Text to speech</p>
      </header>
    </div>
  );
}

export default App;
