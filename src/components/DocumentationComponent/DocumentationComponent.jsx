import React from "react";
import styles from "./style-DocumentationComponent.module.scss";
import { Link } from "react-router-dom";

const DocumentationComponent = () => {
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
            <a
              target="_blank"
              href="https://github.com/GodwinCameron/JARVIS-JR"
            >
              <div className={`${styles.moreOptions} ${styles.docs}`}>
                &#47;&#47;&#47; &#61; &#62; To GitHub Repo
              </div>
            </a>
          </div>

          <div className={styles.logoContainer}>
            <img
              className={styles.appLogo}
              src={require("../../assets/icon-large.png")}
              alt="Jarvis Logo"
            />{" "}
            J.A.R.V.I.S.JR
          </div>

          <h1 className={styles.title}>
            Thanks for checking out my J.A.R.V.I.S.JR app!
          </h1>
          <p className={styles.text}>
            Hi! My name is Cameron, I'm the developer of this app inspired by
            Marvel Studio and Marvel Comics' Iron man - J.A.R.V.I.S.{" "}
          </p>
          <p className={styles.text}>
            I was tasked with creating an AI powered tool with an open brief
            format and thought what better way to pay homage to the Marvel
            Universe than to create a J.A.R.V.I.S. inspired AI assistant.
          </p>
          <p className={styles.text}>
            You can view the GitHub here:{" "}
            <a
              target="_blank"
              href="https://github.com/GodwinCameron/JARVIS-JR"
            >
              <span className={styles.linkText}>
                https://github.com/GodwinCameron/JARVIS-J
              </span>
            </a>
          </p>
          <br />
          <p className={styles.text}>
            This is a passion project I made in 3rd year while studying at{" "}
            <a target="_blank" href="https://www.openwindow.co.za">
              <p className={styles.linkText}>Open Window</p>
            </a>
          </p>
          <div className={styles.help}>
            <p className={styles.text3}>
              There's honestly a lot that J.A.R.V.I.S.JR can do, but for the
              most part, he's a chatBot, ask him general questions, even things
              like weather forecasts or trivia. Beacuse he beleives he is in the
              MCU, his knowledge is great for answering questions regarding
              Marvel.
              <br />
              For any of the major functionality or eastereggs, refer to the
              GitHub repo readme, or just follow these few hardcoded
              instructions
            </p>
            <p className={styles.text3}>
              {"              "} Some things to ask/say to J.A.R.V.I.S.JR:
              <br />
              <p className={styles.text3}>
                {"              "} - "Tell me a joke"
              </p>
              <p className={styles.text3}>
                {"              "} - "go back to default view"
              </p>
              <p className={styles.text3}>
                {"              "} - "let me see your documentation"
              </p>
              <p className={styles.text3}>{"              "} - "show chat"</p>
              <p className={styles.text3}>{"              "} - "save chat"</p>
              <p className={styles.text3}>{"              "} - "clear chat"</p>
              <p className={styles.text3}>
                {"              "} - "drop my needle"
              </p>
              <p className={styles.text3}>
                {"              "} - "play some music/ play something"
              </p>
              <p className={styles.text3}>
                {"              "} - "repeat that/say again"
              </p>
              <p className={styles.text3}>
                {"              "} - "shut up/stop talking"
              </p>
              <p className={styles.text3}>{"              "} and many more...</p>
            </p>
          </div>

          <div className={styles.text2}>
            V 1 . 0. J.A.R.V.I.S.JR - ~Stark Industries
          </div>
        </div>
      </div>
    </>
  );
};

export default DocumentationComponent;
