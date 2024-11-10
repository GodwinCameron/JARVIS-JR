import "./App.css";
import React from "react";
import JarvisInterface from "./components/JarvisInterface/JarvisInterface";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DocumentationComponent from "./components/DocumentationComponent/DocumentationComponent";
import PastChatsComponent from "./components/PastChatsComponent/PastChatsComponent";

function App() {
  const Testing_dont_use_tokens = false; //<-- set to true to test without using OpenAi request tokens.

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <JarvisInterface
              Testing_dont_use_tokens={Testing_dont_use_tokens}
            />
          }
        />
        <Route path="/docs" element={<DocumentationComponent />} />
        <Route path="/past-chats" element={<PastChatsComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// - Can maybe include some info button to show the additional pages (settings)
// - Some additional animations
// - Conversation History (save a chat)
// - Mobile Friendly please!
// - consider user flow
// - have chatbox move like a speech bubble
