import { useEffect, useState } from "react";
import styles from "./FeatOptions.module.css";

const FeatOptions = ({ feats, featSelectHandler, selectedOption }) => {
  const [optionHover, setOptionHover] = useState(false);
  const [hoveredFeat, setHoveredFeat] = useState();

  const mouseOverHandler = (feat) => {
    setOptionHover(true);
    setHoveredFeat(<div className={styles.featDescription}>{feat.name}</div>);
  };

  const mouseLeaveHandler = () => {
    setOptionHover(false);
  };

  return (
    <>
      <select
        className={styles.featSelect}
        name={"feats"}
        value={selectedOption} // Define o valor selecionado no elemento select
        onChange={featSelectHandler}
      >
        <option value="">Selecione um talento</option>

        {feats.Feats.map((feat, i) => {
          return (
            <option
              key={feat.id}
              value={feat.id}
              selected={selectedOption === i && true}
              onMouseEnter={() => mouseOverHandler(feat)}
              onMouseLeave={mouseLeaveHandler}
            >
              {feat.name}
            </option>
          );
        })}
      </select>
      {optionHover && hoveredFeat}{" "}
      {/* Renderize hoveredFeat apenas quando optionHover for verdadeiro */}
    </>
  );
};

export default FeatOptions;
