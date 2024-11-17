import React from "react";
import classNames from "classnames";
import styles from "./style-JarvisOrbComponent.module.scss";

const JarvisOrbComponent = ({ showChat }) => {
  const layers = Array.from({ length: 10 }, (_, i) => i);

  return (
    <div
      className={classNames(styles.orbContainer, {
        [styles.chatPosition]: showChat,
      })}
    >
        <div className={classNames(styles.layer, styles.outerLayer)} />
      {layers.map((layer) => (
        <div
          key={layer}
          className={classNames(styles.layer, styles[`layer${layer}`])}
        />
      ))}
      <div className={classNames(styles.layer, styles.layer0)} />
    </div>
  );
};

export default JarvisOrbComponent;