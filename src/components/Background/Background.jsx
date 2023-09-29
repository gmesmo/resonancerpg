import React from "react";
import { SvgBlob } from "react-svg-blob";
import styles from "./Background.module.css";

function Background({ shapes }) {
  return (
    <div id={styles.Background}>
      {shapes.map((shapeData, index) => (
        <div
          key={index}
          className={styles.container}
          style={{
            position: "absolute",
            top: `${Math.floor(Math.random() * 95) + 5}%`,
            left: `${Math.floor(Math.random() * 95) + 5}%`,
          }}
        >
          <div className={styles[`shape_${index + 1}`]}>
            <SvgBlob
              variant="solid"
              color={shapeData.color}
              shapeProps={shapeData.shapeProps}
              isOutline={false}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Background;
