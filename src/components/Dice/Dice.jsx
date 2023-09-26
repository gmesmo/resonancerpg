import React, { useState } from "react";
import "./Dice.css";

function Dice() {
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState(null);

  const rollD20 = () => {
    if (!rolling) {
      setRolling(true);
      // Simula um lançamento de dado de 20 lados
      const rollResult = Math.floor(Math.random() * 20) + 1;
      setResult(rollResult);

      // Aguarde um tempo para animação
      setTimeout(() => {
        setRolling(false);
      }, 1000); // Tempo em milissegundos
    }
  };

  return (
    <div className="dice-container">
      <div className={`dice ${rolling ? "rolling" : ""}`} onClick={rollD20}>
        {result !== null && <div className="dice-result">{result}</div>}
      </div>
    </div>
  );
}

export default Dice;
