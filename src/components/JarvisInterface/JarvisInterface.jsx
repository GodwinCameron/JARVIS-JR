import styles from "./style-JarvisInterface.module.scss";
import React, { useState, useEffect, useRef } from "react";
import { recordSpeech } from "../../functions/recordSpeech";
import { stopRecording } from "../../functions/stopRecording";
import ChatBoxComponent from "../ChatBoxComponent";
import YouTubePlayer from "../SongPlayerIframe";
import classNames from "classnames";
import turboAudio from "../../assets/audio/turbo.mp3";
import { Link } from "react-router-dom";

const JarvisInterface = ({ Testing_dont_use_tokens }) => {
  // CONSTANTS:
  //  - Recording and processing Audio:
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const audioRef = useRef(null);
  const [autoPlay, setAutoPlay] = useState(false);
  const [endRequest, setEndRequest] = useState(false);
  // - Displaying Options/Altering Interface::
  const [processing, setProcessing] = useState(false);
  const [options, setOptions] = useState(false);
  const [HudInterface, setHudInterface] = useState(false);
  const [docs, setDocs] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showIframe, setShowIframe] = useState(false);
  const [ShowLaunchOptions, setShowLaunchOptions] = useState(false);
  const [musicRequestUrl, setMusicRequestUrl] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState(true);
  // - Engaging 4o
  const [turboMode, setTurboMode] = useState(false);
  const [playTurboSound, setPlayTurboSound] = useState(false);
  const audioRef2 = useRef(null);
  const [hasApiKey, setHasApiKey] = useState(false);
  // F.R.I.D.A.Y. Mode
  const [FridayMode, setFridayMode] = useState("unset");

  // primary useEffect hook to check for microphone permissions and browser support.
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

    if (localStorage.getItem("key")) {
      setHasApiKey(true);
    }
  }, []);

  // fires when you click the main (blue) jarvis orb.
  const handleJarvisRequest = async () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsRecording(true);
    setWelcomeMessage(false);
    console.log("Recording audio...");
    await recordSpeech(mediaRecorderRef, audioChunksRef);
  };

  // fires when you click the stop recording (red) orb.
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
    );
  };

  // fires after a jarvis response is received.
  useEffect(() => {
    if (autoPlay) {
      audioRef.current.play().catch((error) => {
        console.log("Auto-play was prevented:", error);
      });
      setAutoPlay(false);
      setProcessing(false);
      setEndRequest(false);
    }
  }, [autoPlay]);

  // listener for when a request is ended without expecting a response from jarvis.
  useEffect(() => {
    setAutoPlay(false);
    setProcessing(false);
  }, [endRequest]);

  // fires after turbo mode is engaged.
  useEffect(() => {
    if (playTurboSound) {
      audioRef2.current.play().catch((error) => {
        console.log("Auto-play was prevented:", error);
      });
      setPlayTurboSound(false);
    }
  }, [playTurboSound]);

  // fires when you ask Jarvis to reset state.
  useEffect(() => {
    // setWelcomeMessage(false);
    setOptions(false);
    setDocs(false);
    setShowChat(false);
    setShowIframe(false);
    setMusicRequestUrl("");
    setTurboMode(false);
    document.getElementById("cog").style.display = "flex";
  }, [HudInterface]);

  const displayChat = () => {
    setShowChat(true);
  };

  const displayIframe = () => {
    setShowIframe(true);
  };

  const dismissWelcome = () => {
    setWelcomeMessage(false);
  };

  const handleCogClick = () => {
    setOptions(true);
    setDocs(true);
    document.getElementById("cog").style.display = "none";
  };

  const setApiKey = (e) => {
    e.preventDefault();
    const key = e.target.elements[0].value;
    if (key) {
      localStorage.setItem("key", key);
      setHasApiKey(true); // Set state to hide the form
    }
  };

  const enableFriday = (enable) => {
    if (enable === true) {
      setFridayMode("enabled");
    } else {
      setFridayMode("disabled");
    }
  };

  

  return (
    <div className={styles.main}>
      <div
        className={classNames(styles.appHeader, {
          [styles.appHeaderFriday]: FridayMode === "enabled",
          [styles.appHeaderTurbo]: turboMode
        })}
      >
        {hasApiKey ? null : (
          <div>
            <form onSubmit={setApiKey}>
              <input name="apiKey" type="text" placeholder="Enter API Key" />
              <button type="submit">Set Key</button>
            </form>
          </div>
        )}

        {FridayMode == "unset" ? (
          <div className={styles.welcomeMessage}>
            Enable F.R.I.D.A.Y. ?{" "}
            <button onClick={() => enableFriday(true)}>Yes</button>
            <button onClick={() => enableFriday(false)}>No</button>
          </div>
        ) : null}

        {welcomeMessage && (
          <div onClick={dismissWelcome} className={styles.welcomeMessage}>
            Hello and welcome to J-A-R-V-I-S-JR!
            <span className={styles.welcomSubText}>
              Hit the orb below and start chatting! hint: try asking for 'more
              options' or 'documentation'
            </span>
          </div>
        )}

        {processing ? (
          <div className={styles.jarvisProcessing} alt="logo" />
        ) : !isRecording ? (
          <div
            onClick={handleJarvisRequest}
            className={classNames(styles.jarvis, {
              [styles.friday]: FridayMode === "enabled",
              [styles.jarvisTurbo]: turboMode,
            })}
            // className = {`${styles.jarvis} ${styles.green}`}
            alt="logo"
          />
        ) : (
          <>
            <div onClick={dismissWelcome} className="welcome-message">
              {FridayMode === "enabled" ? ("F.R.I.D.A.Y. is listening...") : ("Jarvis is listening...")}
              <span className="welcome-sub">
                click the orb again to process response
              </span>
            </div>
            <div
              onClick={submitJarvisRequest}
              className={styles.jarvisRecord}
              alt="logo"
            />
          </>
        )}

        <div className={styles.workArea}>
          <div className={styles.column}>
            {options && (
              <>
                <div className={styles.moreOptions}>
                  <div onClick={displayChat} className={styles.option}>
                    Display Live Chat Transcription
                  </div>
                  <Link to="/past-chats">
                    <div className="option">View Past Chats</div>
                  </Link>
                  <div onClick={displayIframe} className={styles.option}>
                    Search for a song
                  </div>
                </div>
              </>
            )}
            {showChat && (
              <ChatBoxComponent processing={processing} turboMode={turboMode} />
            )}
          </div>

          <div className={styles.column}>
            {docs && (
              <Link to="/docs">
                <div className={`${styles.moreOptions} ${styles.docs}`}>
                  &#47;&#47;&#47; &#61; &#62; Documentation
                </div>
              </Link>
            )}
            {showIframe && (
              <YouTubePlayer
                url={
                  musicRequestUrl
                    ? musicRequestUrl
                    : "videoseries?si=L5RcgG5Mr2GfEmvN&amp;list=PLBymIW1wS9vYQSx7ZtP6YNeNOiubHI6JE&index=" +
                      (Math.floor(Math.random() * 105) + 1)
                }
              />
            )}
          </div>
        </div>

        <audio
          style={{ display: "none" }}
          id="audioPlayback2"
          ref={audioRef}
          controls
        ></audio>
        <audio
          style={{ display: "none" }}
          ref={audioRef2}
          src={turboAudio}
          controls
        ></audio>
        <div id="cog" onClick={handleCogClick} className={styles.showOptions}>
          &#9881;
        </div>
      </div>
      {ShowLaunchOptions && (
        <div className={styles.launchOptions}>
          <h2>Hello and welcome to J-A-R-V-I-S-JR!</h2>
          <br />
          <p>
            {" "}
            JARVIS.JR is a passion project inspired by the offical MCU's Jarvis.
          </p>
          <p>
            Created by Cameron Godwin as an assignment for Open Window
            Interactive Development Course.
          </p>
          <br />
          <p>
            before we begin, select whether or not you want to see a live
            transcript of your chat with JARVIS.JR
          </p>
          <p>
            &#40;Don't worry you can change this later or even ask jarvis
            directly to 'display live chat' / 'toggle live chat'&#41;
          </p>
          <div className={styles.showLiveChatOptions}>
            <div
              onClick={() => {
                setShowLaunchOptions(false);
                setShowChat(true);
              }}
              className={styles.showLiveChatOptionsChoice}
            >
              Enable ChatBot Animations
            </div>
            <div
              onClick={() => {
                setShowLaunchOptions(false);
                setShowChat(false);
              }}
              className={`${styles.showLiveChatOptionsChoice} ${styles.disableRed}`}
            >
              Disable Complex Animations
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JarvisInterface;
