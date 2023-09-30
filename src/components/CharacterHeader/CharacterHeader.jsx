import React from "react";

import styles from "./CharacterHeader.module.css";
import { Body, Ego, Shield } from "../Icons/Icons";

function CharacterHeader({
  character,
  handleChange,
  handleAbilityChange,
  handleHPEgoChange,
}) {
  const abilityKeys = Object.keys(character.abilities);

  return (
    <div className={styles.characterHeader}>
      <div className={styles.info}>
        <input
          className={styles.name}
          type="text"
          name="name"
          placeholder="Nome do personagem"
          value={character.name}
          onChange={handleChange}
        />
      </div>
      <div className={styles.info}>
        <label>Geração: </label>
        <input
          type="number"
          name="generation"
          value={character.generation}
          onChange={handleChange}
        />
      </div>
      <div className={styles.info}>
        <label>Nível:</label>
        <input
          type="number"
          name="level"
          value={character.level}
          onChange={handleChange}
        />
      </div>

      <div className={styles.statusContainer}>
        <h2>Status</h2>
        <div className={styles.status}>
          <div className={styles.hp}>
            <label htmlFor="hp">HP</label>
            <Body
              current={character.hp[0].current}
              max={character.hp[0].max}
              size={"50"}
            />
            <input
              name="hp"
              type="number"
              style={{ width: "50px" }}
              value={character.hp[0].current}
              onChange={handleHPEgoChange}
            ></input>
          </div>
          <div>
            <label htmlFor="AC">AC</label>
            <Shield size={"50"} />
            {character.ac}
          </div>
          <div>
            <label htmlFor="ego">Ego</label>
            <Ego
              current={character.ego[0].current}
              max={character.ego[0].max}
              size={"50"}
            />
            <input
              name="ego"
              type="number"
              style={{ width: "50px" }}
              value={character.ego[0].current}
              onChange={handleHPEgoChange}
            ></input>
          </div>
        </div>
      </div>

      <div className="character-abilities">
        <h2>Habilidades</h2>
        <div className={styles.abilitiesContainer}>
          {abilityKeys.map((ability) => {
            return (
              <div key={ability}>
                <label htmlFor={ability}>{ability}</label>
                <input
                  type="number"
                  name={ability}
                  value={character.abilities[ability]}
                  onChange={handleAbilityChange}
                ></input>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CharacterHeader;
