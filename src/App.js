import "./App.css";
import React from "react";
import JarvisInterface from "./components/JarvisInterface/JarvisInterface";


function App() {

  const Testing_dont_use_tokens = false; //<-- set to true to test without using OpenAi request tokens.


  return (
    <JarvisInterface Testing_dont_use_tokens={Testing_dont_use_tokens} />
  );
}

export default App;

// - Can maybe include some info button to show the additional pages (settings)
// - Some additional animations
// - Conversation History (save a chat)
// - Mobile Friendly please!
// - consider user flow
// - have chatbox move like a speech bubble
