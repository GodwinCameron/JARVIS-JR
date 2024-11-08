import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import OpenAI from "openai";
import { recordSpeech } from "./functions/recordSpeech";
import { stopRecording } from "./functions/stopRecording";
import ChatBoxComponent from "./components/ChatBoxComponent";

function App() {
  const Testing_dont_use_tokens = false;

  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioRef = useRef(null); // Add a reference for the audio element
  const [autoPlay, setAutoPlay] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [options, setOptions] = useState(false);
  const [HudInterface, setHudInterface] = useState(false);
  const [docs, setDocs] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const [welcomeMessage, setWelcomeMessage] = useState(true);

  const dismissWelcome = () => {
    setWelcomeMessage(false);
  };

  useEffect(() => {
    navigator.permissions.query({ name: "microphone" }).then((result) => {
      if (result.state === "denied") {
        alert(
          "Microphone access is denied. Please enable it in your browser settings."
        );
      }
    });

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Your browser does not support audio recording.");
    }
  }, []);

  const handleJarvisRequest = async () => {
    setIsRecording(true);
    setWelcomeMessage(false);
    console.log("Recording audio...");
    await recordSpeech(mediaRecorderRef, audioChunksRef);
  };

  const submitJarvisRequest = async () => {
    setIsRecording(false);
    console.log("Submitting request...");
    setProcessing(true);
    await stopRecording(
      mediaRecorderRef,
      audioChunksRef,
      audioURL,
      setAudioURL,
      Testing_dont_use_tokens,
      setAutoPlay,
      setOptions,
      setHudInterface,
      setDocs
    );
  };

  useEffect(() => {
    if (autoPlay) {
      audioRef.current.play().catch((error) => {
        console.log("Auto-play was prevented:", error);
      });
      setAutoPlay(false);
      setProcessing(false);
    }
  }, [autoPlay]);

  useEffect(() => {
    setWelcomeMessage(true);
    setOptions(false);
    setDocs(false);
    setShowChat(false);
  }, [HudInterface]);

  const displayChat = () => {
    setShowChat(true);
  };

  return (
    <div className="main">
      <div className="App-header">
        {welcomeMessage && (
          <div onClick={dismissWelcome} className="welcome-message">
            Hello and welcome to J-A-R-V-I-S-JR!
            <span className="welcome-sub">
              Hit the orb below and start chatting! hint: try asking for 'more
              options' or 'documentation'
            </span>
          </div>
        )}

        {processing ? (
          <div className="App-logo, jarvis-process" alt="logo" />
        ) : !isRecording ? (
          <div
            onClick={handleJarvisRequest}
            className="App-logo, jarvis"
            alt="logo"
          />
        ) : (
          <>
            <div onClick={dismissWelcome} className="welcome-message">
              Jarvis is listening...
              <span className="welcome-sub">
                click the orb again to process response
              </span>
            </div>
            <div
              onClick={submitJarvisRequest}
              className="App-logo, jarvis-record"
              alt="logo"
            />
          </>
        )}

        <div className="work-area">
          <div className="column">
            {options && (
              <>
                <div onClick={dismissWelcome} className="welcome-message">
                  Click on one of the options below to proceed
                </div>
                <div className="more-options">
                  <div onClick={displayChat} className="option">
                    Display Live Chat Transcription
                  </div>
                  <div className="option">View Past Chats</div>
                  <div className="option">Search for a song</div>
                </div>
              </>
            )}
            {showChat && <ChatBoxComponent />}
          </div>

          <div className="column">
            {docs && (
              <a
                target="_blank"
                href="https://github.com/GodwinCameron/J-A-R-V-I-S-JR"
              >
                <div className="more-options docs">
                  &#47;&#47;&#47; &#61; &#62; Documentation
                </div>
              </a>
            )}
          </div>
        </div>

        <audio
          className="hide"
          id="audioPlayback2"
          ref={audioRef}
          controls
        ></audio>
      </div>
    </div>
  );
}

export default App;
