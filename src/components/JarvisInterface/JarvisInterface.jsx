import styles from "./style-JarvisInterface.module.scss";
import React, { useState, useEffect, useRef } from "react";
import { recordSpeech } from "../../functions/recordSpeech";
import { stopRecording } from "../../functions/stopRecording";
import ChatBoxComponent from "../ChatBoxComponent";
import YouTubePlayer from "../SongPlayerIframe";
import classNames from "classnames";
import turboAudio from "../../assets/audio/turbo.mp3";
import { Link } from "react-router-dom";
import JarvisOrbComponent from "../subcomponents/JarvisOrbComponent/JarvisOrbComponent";
import MenuMatrix from "../MenuMatrix/MenuMatrix";
import { getWeatherData } from "../../functions/WeatherData";

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
  const [welcomeMessage, setWelcomeMessage] = useState(false);
  const [advancedAnimations, setAdvancedAnimations] = useState(true);
  // - Text Input:
  const [includeTextMessage, setIncludeTextMessage] = useState(false);
  const [includedTextInput, setIncludedTextInput] = useState("");
  const [awaitingTextInput, setAwaitingTextInput] = useState(false);
  // - Engaging 4o
  const [turboMode, setTurboMode] = useState(false);
  const [playTurboSound, setPlayTurboSound] = useState(false);
  const audioRef2 = useRef(null);
  const [hasApiKey, setHasApiKey] = useState(false);
  // F.R.I.D.A.Y. Mode
  const [FridayMode, setFridayMode] = useState("disabled");

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

    // getWeatherData();
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

    if (awaitingTextInput) {
      console.log("Processing included text input:", includedTextInput);
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
        FridayMode,
        includedTextInput,
        setFridayMode
      );
      return;
    }

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
      FridayMode,
      includedTextInput,
      setFridayMode
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
      setIncludeTextMessage(false);
      setAwaitingTextInput(false);
      setIncludedTextInput("");
    }
  }, [autoPlay]);

  // listener for when a request is ended without expecting a response from jarvis.
  useEffect(() => {
    setAutoPlay(false);
    setProcessing(false);
    setIncludeTextMessage(false);
    setAwaitingTextInput(false);
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
    setAwaitingTextInput(false);
    setIncludeTextMessage(false);
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
      setHasApiKey(true);
    }
  };

  const enableFriday = (enable) => {
    if (enable === true) {
      setFridayMode("enabled");
    } else {
      setFridayMode("disabled");
    }
  };

  const displayTextInput = () => {
    setIncludeTextMessage(true);
    setAwaitingTextInput(true);
  };

  const sendIncludedTextInput = () => {
    const text = document.querySelector("textarea")?.value || ""; // Get the text safely
    if (text.trim() === "") {
      alert("Please enter some text before submitting.");
      return;
    }

    setIncludedTextInput(text); // This will trigger the useEffect above
    setIncludeTextMessage(false);
    setAwaitingTextInput(false);
  };

  useEffect(() => {
    console.log("Included text input changed:", includedTextInput);

    if (!awaitingTextInput && includedTextInput.trim() !== "") {
      submitJarvisRequest();
    }
  }, [includedTextInput]);

  return (
    <div className={styles.main}>
      <div
        className={classNames(styles.appHeader, {
          [styles.appHeaderFriday]: FridayMode === "enabled",
          [styles.appHeaderTurbo]: turboMode,
        })}
      >
        <div className={styles.containerSection}>
          {hasApiKey ? null : (
            <div>
              <form onSubmit={setApiKey}>
                <input name="apiKey" type="text" placeholder="Enter API Key" />
                <button type="submit">Set Key</button>
              </form>
            </div>
          )}

          {FridayMode === "unset" ? (
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

          {/* Orbs begin here */}
          <div className={styles.mainMatrix}>
            {options === true && advancedAnimations === true ? (
              <MenuMatrix
                showChat={showChat}
                setShowChat={setShowChat}
                includeTextMessage={includeTextMessage}
                setIncludeTextMessage={setIncludeTextMessage}
                includedTextInput={includedTextInput}
                setAwaitingTextInput={setAwaitingTextInput}
                showIframe={showIframe}
                setShowIframe={setShowIframe}
              />
            ) : null}

            {processing ? (
              <div
                className={styles.jarvisProcessing}
                alt="logo"
              />
            ) : advancedAnimations && !isRecording ? (
              <div onClick={handleJarvisRequest}>
                <JarvisOrbComponent showChat={showChat} turboMode={turboMode} FridayMode={FridayMode} />
              </div>
            ) : !isRecording ? (
              <div
                onClick={handleJarvisRequest}
                className={classNames(styles.jarvis, {
                  [styles.friday]: FridayMode === "enabled",
                  [styles.jarvisTurbo]: turboMode,
                })}
                alt="logo"
              />
            ) : awaitingTextInput ? (
              <h3 className={styles.waitingText}>awaiting text input...</h3>
            ) : (
              <>
                <div onClick={dismissWelcome} className="welcome-message2">
                  {FridayMode === "enabled"
                    ? "F.R.I.D.A.Y. is listening..."
                    : "Jarvis is listening..."}
                  <span className="welcome-sub">
                    click the orb again to process response
                  </span>
                </div>
                <div
                  // =========================================================================================================****
                  onClick={submitJarvisRequest}
                  className={styles.jarvisRecord}
                  alt="logo"
                />
              </>
            )}
          </div>
          {/* Orbs end here */}

          {includeTextMessage && (
            <>
              <div className={styles.textInputField}>
                <textarea />
                <button className={styles.zLift} onClick={sendIncludedTextInput}>➢</button>
              </div>
            </>
          )}

          <div className={styles.workArea}>
            <div className={styles.column}>
              {options === true && advancedAnimations === false ? (
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
                    <div onClick={displayTextInput} className={styles.option}>
                      Type / include text.
                    </div>
                  </div>
                </>
              ) : null}
              {showChat && (
                <ChatBoxComponent
                  processing={processing}
                  turboMode={turboMode}
                />
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
            before we begin, select whether or not you want to see custom
            aminations of JARVIS.JR
          </p>
          <p>
            &#40;Don't worry you can change this later or even ask jarvis
            directly to 'display live chat' / 'toggle live chat'&#41;
          </p>
          <div className={styles.showLiveChatOptions}>
            <div
              onClick={() => {
                setShowLaunchOptions(false);
                setAdvancedAnimations(true);
              }}
              className={styles.showLiveChatOptionsChoice}
            >
              Enable Advanced Animations
            </div>
            <div
              onClick={() => {
                setShowLaunchOptions(false);
                setAdvancedAnimations(false);
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
