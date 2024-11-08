import React from "react";

const ChatBoxComponent = () => {
  return (
    <div className="chat-box">
      <div className="chat-title">Chat Holotape retreived</div>
      <div className="chat-systemText">
        &#47;&#47;&#47; &#61; &#62; Data retrieval successful...
      </div>
      <div className="chat-subtitle">
        {"          "} - Recorded in 2024 on May 20th ...
      </div>
      <br />
      <div className="chat-systemText">
        &#47;&#47;&#47; &#61; &#62; Conversation transcription:
      </div>
      <div className="chat-userText">
        &#62; I can't even remember what I had for breack fast.
      </div>

      <div className="chat-systemText">
        &#47;&#47;&#47; &#61; &#62; Conversation transcription:
      </div>
      <div className="chat-jarvisText">Gluten free waffles, Sir.</div>

      <div className="chat-systemText">
        &#47;&#47;&#47; &#61; &#62; Conversation transcription:
      </div>
      <div className="chat-userText">&#62; That's right.</div>
    </div>
  );
};

export default ChatBoxComponent;
