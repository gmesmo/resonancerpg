import React from "react";

import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      className={`${styles.Button} ${props.value && styles.open}`}
      onClick={props.onClick}
    >
      +
    </button>
  );
};

export default Button;
