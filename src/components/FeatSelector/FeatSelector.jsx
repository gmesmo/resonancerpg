import React, { useState, useEffect } from "react";

import styles from "./FeatSelector.module.css";

const FeatSelector = ({ character }) => {
  const defaultFeats = [{}];

  const [feats, setFeats] = useState(
    JSON.parse(localStorage.getItem("feats")) || defaultFeats
  );

  useEffect(() => {
    localStorage.setItem("feats", JSON.stringify(feats));
  }, [feats]);

  return (
    <div id={styles.FeatSelector}>
      <h2>Talentos</h2>
    </div>
  );
};

export default FeatSelector;
