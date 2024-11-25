import React from "react";
import styles from "./style-MenuMatrix.module.scss";
import classNames from "classnames";
import chatIcon from "../../assets/chat.png";
import pastChatsIcon from "../../assets/archive.png";
import musicIcon from "../../assets/music.png";
import textInput from "../../assets/input.png";
import { Link } from "react-router-dom";

const MenuMatrix = ({
  showChat,
  setShowChat,
  includeTextMessage,
  setIncludeTextMessage,
  includedTextInput,
  setAwaitingTextInput,
  showIframe,
  setShowIframe,
}) => {
  return (
    <div className={styles.main}>
      <div className={classNames(styles.bar, styles.bar1)} />
      <div className={classNames(styles.bar, styles.bar2)} />
      <div className={classNames(styles.bar, styles.bar3)} />
      <div className={classNames(styles.bar, styles.barTray)} />

      <div
        className={classNames(styles.bar, styles.barOption, styles.barOption1)}
        onClick={() => {
          setShowChat(!showChat);
        }}
      >
        <img className={styles.icon} src={chatIcon} alt="chaticon" />
        Chat
      </div>
      <Link
        className={classNames(styles.bar, styles.barOption, styles.barOption2)}
        to="/past-chats"
      >
        <div className={styles.link}>
          <img className={styles.icon} src={pastChatsIcon} alt="historyicon" />
          History
        </div>
      </Link>
      <div
        className={classNames(styles.bar, styles.barOption, styles.barOption3)}
        onClick={() => {
          setShowIframe(!showIframe);
        }}
      >
        <img className={styles.icon} src={musicIcon} alt="musicicon" />
        Music
      </div>
      <div
        className={classNames(styles.bar, styles.barOption, styles.barOption4)}
        onClick={() => {
          setAwaitingTextInput(!includedTextInput);
          setIncludeTextMessage(!includeTextMessage);
        }}
      >
        <img className={styles.icon} src={textInput} alt="inputicon" />
        Input
      </div>
    </div>
  );
};

export default MenuMatrix;
