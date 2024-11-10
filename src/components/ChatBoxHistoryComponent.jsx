import React, { useEffect, useState, useRef } from "react";
import { UserMessageComponent } from "./subcomponents/UserMessageComponent";
import { JarvisMessageComponent } from "./subcomponents/JarvisMessageComponent";

const ChatBoxHistoryComponent = ({ chat, index }) => {
  const [currentChat, setCurrentChat] = useState([]);
  const [formattedDate, setFormattedDate] = useState("");

 
  useEffect(() => {
    const date = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    setFormattedDate(date.toLocaleDateString("en-US", options));

    setCurrentChat(chat);
  }, []);


  let turboMode;


  return (
    <>
      <div className="chatSection">
        <div
          className="chat-box"
        >
          <div className="chat-title">Chat Holotape retrieved</div>
          <div className="chat-systemText">
            &#47;&#47;&#47; &#61; &#62; Data retrieval successful...
          </div>
          <div className="chat-subtitle">
            {"          "} - Recorded on {formattedDate} ...
          </div>
          <div></div>
          {currentChat.map((chat, index) => {
            if (chat.usermessage) {
              return (
                <UserMessageComponent
                  key={index}
                  message={chat.usermessage}
                  time={chat.timestamp}
                  turboMode={turboMode}
                />
              );
            } else {
              return (
                <JarvisMessageComponent
                  key={index}
                  message={chat.jarvisResponse}
                  time={chat.timestamp}
                  turboMode={chat.turboMode}
                />
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default ChatBoxHistoryComponent;
