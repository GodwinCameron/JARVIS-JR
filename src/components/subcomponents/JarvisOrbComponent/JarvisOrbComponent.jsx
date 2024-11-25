import React from "react";
import classNames from "classnames";
import styles from "./style-JarvisOrbComponent.module.scss";

const JarvisOrbComponent = ({ showChat, turboMode, FridayMode }) => {

  let fridayMode;
  if (FridayMode==="enabled") fridayMode = true;
  

  const layers = Array.from({ length: 10 }, (_, i) => i);

  return (
    <div
      className={classNames(styles.orbContainer, {
        [styles.chatPosition]: showChat,
      })}
    >
      <div
        className={classNames(styles.layer, styles.outerLayer, {
          [styles.outerLayerTurbo]: turboMode,
          [styles.outerLayerFriday]: fridayMode,
        })}
      />
      {layers.map((layer) => (
        <div
          key={layer}
          className={classNames(
            styles.layer,
            styles[`layer${layer}`],
            {
              [styles[`layer${layer}Turbo`]]: turboMode,
              [styles[`layer${layer}Friday`]]: fridayMode,
            } // Add this line
          )}
        />
      ))}
      <div
        className={classNames(styles.layer, styles.layer0, {
          [styles.layer0Turbo]: turboMode,
          [styles.layer0Friday]: fridayMode,
        })}
      />
    </div>
  );
};

export default JarvisOrbComponent;
