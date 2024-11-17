import React from "react";
import classNames from "classnames";
import styles from "./style-JarvisOrbComponent.module.scss";

const JarvisOrbComponent = ({showChat}) => {
  return (
    <>
      <div className={classNames(styles.orbContainer, {
              [styles.chatPosition]: showChat === true
            })}>
        <div className={classNames(styles.layer, styles.outerLayer)} />
        <div className={classNames(styles.layer, styles.layer1)} />
        <div className={classNames(styles.layer, styles.layer2)} />
        <div className={classNames(styles.layer, styles.layer3)} />
        <div className={classNames(styles.layer, styles.layer4)} />
        <div className={classNames(styles.layer, styles.layer5)} />
        <div className={classNames(styles.layer, styles.layer6)} />
        <div className={classNames(styles.layer, styles.layer7)} />
        <div className={classNames(styles.layer, styles.layer8)} />
        <div className={classNames(styles.layer, styles.layer9)} />
        <div className={classNames(styles.layer, styles.layer0)} />
      </div>
    </>
  );
};

export default JarvisOrbComponent;
