import React from "react";

function CharacterHeader({ character, handleChange, handleAbilityChange }) {
  return (
    <div className="character-header">
      <label>Nome do Personagem:</label>
      <input
        type="text"
        name="name"
        value={character.name}
        onChange={handleChange}
      />
      <label>Geração:</label>
      <input
        type="number"
        name="generation"
        value={character.generation}
        onChange={handleChange}
      />
      <label>Nível:</label>
      <input
        type="number"
        name="level"
        value={character.level}
        onChange={handleChange}
      />
      <div className="character-abilities">
        <h2>Habilidades</h2>
        <label>Força:</label>
        <input
          type="number"
          name="strength"
          value={character.abilities.strength}
          onChange={handleAbilityChange}
        />
        <label>Destreza:</label>
        <input
          type="number"
          name="dexterity"
          value={character.abilities.dexterity}
          onChange={handleAbilityChange}
        />
        <label>Constituição:</label>
        <input
          type="number"
          name="constitution"
          value={character.abilities.constitution}
          onChange={handleAbilityChange}
        />
        <label>Inteligência:</label>
        <input
          type="number"
          name="intelligence"
          value={character.abilities.intelligence}
          onChange={handleAbilityChange}
        />
        <label>Sabedoria:</label>
        <input
          type="number"
          name="wisdom"
          value={character.abilities.wisdom}
          onChange={handleAbilityChange}
        />
        <label>Carisma:</label>
        <input
          type="number"
          name="charisma"
          value={character.abilities.charisma}
          onChange={handleAbilityChange}
        />
      </div>
    </div>
  );
}

export default CharacterHeader;
