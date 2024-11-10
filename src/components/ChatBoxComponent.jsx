import React, { useEffect, useState, useRef } from "react";
import { UserMessageComponent } from "./subcomponents/UserMessageComponent";
import { JarvisMessageComponent } from "./subcomponents/JarvisMessageComponent";

const ChatBoxComponent = ({ processing, turboMode }) => {
  const [currentChat, setCurrentChat] = useState([]);
  const [formattedDate, setFormattedDate] = useState("");

  // Ref for the chat container to control scrolling
  const chatContainerRef = useRef(null);

  useEffect(() => {
    setCurrentChat(JSON.parse(sessionStorage.getItem("currentChat")) || []);
  }, [processing]);

 
  useEffect(() => {
    const date = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    setFormattedDate(date.toLocaleDateString("en-US", options));
  }, []);

   // Automatically scroll to bottom of chat
  useEffect(() => {
    if (chatContainerRef.current) {
      const container = chatContainerRef.current;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }

  }, [processing, currentChat]);


  const saveChatToLocalStorage = () => {
    const chat = JSON.parse(sessionStorage.getItem("currentChat")) || [];
    localStorage.setItem("chat", JSON.stringify(chat));
    sessionStorage.removeItem("currentChat");
  };

  return (
    <>
      <div className="chatSection">
        <div
          className={turboMode === true ? "chat-box-turbo" : "chat-box"}
          ref={chatContainerRef}
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
      <div className={turboMode === true ? "chat-box-turbo" : "chat-box"}>
        <div
          className="chat-systemText"
          style={turboMode === true ? { color: "#ff9422" } : null}
        >
          To save this chat for later, ask JARVIS to{" "}
          <span onClick={saveChatToLocalStorage} className="saveText">
            'Save Chat'
          </span>{" "}
          or alternatively, click the text
        </div>
      </div>
    </>
  );
};

export default ChatBoxComponent;
