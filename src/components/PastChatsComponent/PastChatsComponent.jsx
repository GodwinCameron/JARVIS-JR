import React from "react";
import styles from "./style-PastChatsComponent.module.scss";
import { Link } from "react-router-dom";
import ChatBoxHistoryComponent from "../ChatBoxHistoryComponent";

const PastChatsComponent = () => {
  // get chats from local storage
  const chat = JSON.parse(localStorage.getItem("chat")) || [];

  return (
    <>
      <div className={styles.main}>
        <div className={styles.appHeader}>
          <div className={styles.titleSection}>
            <Link to="/">
              <div className={`${styles.moreOptions} ${styles.docs}`}>
                &#10096; Back
              </div>
            </Link>
          </div>
          <div className={styles.chatSection}>
            <div className={styles.chatBox}>
              <div className={styles.chatTitle}>Past Chat</div>
                <ChatBoxHistoryComponent chat={chat} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PastChatsComponent;
