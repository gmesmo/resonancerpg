import React, { useState, useEffect, useRef } from "react";
import styles from "./FeatSelector.module.css";

import FeatsList from "./Feats/Feats.json";
import FeatOptions from "./Feats/FeatOptions/FeatOptions";
import OptionSelector from "../OptionSelector/OptionSelector";

const FeatSelector = ({ character }) => {
  const [selectedFeat, setSelectedFeat] = useState(""); // Armazena a opção selecionada

  const [feats, setFeats] = useState(
    JSON.parse(localStorage.getItem("feats")) || FeatsList
  );

  useEffect(() => {
    localStorage.setItem("feats", JSON.stringify(feats));
  }, [feats]);

  const featOptions = [];

  const featSelectHandler = (e) => {
    const value = e.target.value;

    console.log(e);
    // setSelectedFeat((...prevSelectedFeat) => {
    //   ...prevSelectedFeat,
    //   []
    // });
  };

  // Use um loop for para criar instâncias de FeatOptions com base no valor de character.level
  for (let i = 1; i <= character.level; i++) {
    if (i % 2 === 0 || i === 1) {
      featOptions.push(
        // <FeatOptions
        //   key={i}
        //   feats={feats}
        //   featSelectHandler={featSelectHandler}
        //   selectedOption={selectedFeat[i]}
        // />
        <OptionSelector listName="feat" list={feats} nameId={`level_${i}`} />
      );
    }
  }

  return (
    <div id={styles.FeatSelector}>
      <h2>Talentos</h2>
      <div className={styles.selectWrapper}>
        <div className={styles.customSelect}>
          {featOptions} {/* Renderiza as instâncias de FeatOptions */}
        </div>
      </div>
    </div>
  );
};

export default FeatSelector;
