import React, { useEffect, useState, useRef } from "react";
import { UserMessageComponent } from "./subcomponents/UserMessageComponent";
import { JarvisMessageComponent } from "./subcomponents/JarvisMessageComponent";

const ChatBoxComponent = ({ processing }) => {
  const [currentChat, setCurrentChat] = useState([]);
  
  // Ref for the chat container to control scrolling
  const chatContainerRef = useRef(null);

  useEffect(() => {
    setCurrentChat(JSON.parse(sessionStorage.getItem("currentChat")) || []);
  }, [processing]);

  // Automatically scroll to bottom when `currentChat` changes with smooth scroll
  useEffect(() => {
    if (chatContainerRef.current) {
      // Apply smooth scrolling with a small delay
      const container = chatContainerRef.current;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [currentChat]);

  const saveChatToLocalStorage = () => {
    const chat = JSON.parse(sessionStorage.getItem("currentChat")) || [];
    localStorage.setItem("chat", JSON.stringify(chat));
    sessionStorage.removeItem("currentChat");
  };

  return (
    <>
      <div className="chat-box" ref={chatContainerRef}>
        <div className="chat-title">Chat Holotape retrieved</div>
        <div className="chat-systemText">
          &#47;&#47;&#47; &#61; &#62; Data retrieval successful...
        </div>
        <div className="chat-subtitle">
          {"          "} - Recorded in 2024 on May 20th ...
        </div>
        <div></div> {/* temporary small spacer */}

        {currentChat.map((chat, index) => {
          if (chat.usermessage) {
            return <UserMessageComponent key={index} message={chat.usermessage} />;
          } else {
            return <JarvisMessageComponent key={index} message={chat.jarvisResponse} />;
          }
        })}
      </div>
      <div className="chat-box">
        <div className="chat-systemText">
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
