import React from "react";
import styles from "./style-PastChatsComponent.module.scss";
import { Link } from "react-router-dom";

const PastChatsComponent = () => {
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
        </div>
      </div>
    </>
  );
};

export default PastChatsComponent;
