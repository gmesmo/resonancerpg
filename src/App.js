import React, { useState, useEffect } from "react";
import "./App.css";
import CharacterHeader from "./components/CharacterHeader/CharacterHeader";
import Skills from "./components/Skills/Skills";
import { Trash } from "./components/Icons/Icons";
import isEqual from "lodash/isEqual";

function App() {
  const defaultCharacter = {
    name: "",
    generation: 0,
    level: 1,
    levelModifier: 2,
    hp: [
      {
        current: 5,
        max: 5,
      },
    ],
    ac: 10,
    ego: [
      {
        current: 10,
        max: 10,
      },
    ],
    abilities: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    },
    skills: [
      {
        name: "Atletismo",
        treinada: false,
        mod: "strength",
        bonus: 0,
      },
      {
        name: "Adestrar Animais",
        treinada: false,
        mod: "wisdom",
        bonus: 0,
      },
      {
        name: "Acrobacia",
        treinada: false,
        mod: "dexterity",
        bonus: 0,
      },
      {
        name: "Atuação",
        treinada: false,
        mod: "charisma",
        bonus: 0,
      },
      {
        name: "Conhecimento",
        treinada: false,
        mod: "intelligence",
        bonus: 0,
      },
      {
        name: "Diplomacia",
        treinada: false,
        mod: "charisma",
        bonus: 0,
      },
      {
        name: "Dissimulação",
        treinada: false,
        mod: "charisma",
        bonus: 0,
      },
      {
        name: "Furtividade",
        treinada: false,
        mod: "dexterity",
        bonus: 0,
      },
      {
        name: "Identificar Poder",
        treinada: false,
        mod: "intelligence",
        bonus: 0,
      },
      {
        name: "Iniciativa",
        treinada: false,
        mod: "dexterity",
        bonus: 0,
      },
      {
        name: "Intimidação",
        treinada: false,
        mod: "charisma",
        bonus: 0,
      },
      {
        name: "Intuição",
        treinada: false,
        mod: "wisdom",
        bonus: 0,
      },
      {
        name: "Pilotagem",
        treinada: false,
        mod: "dexterity",
        bonus: 0,
      },
      {
        name: "Ladinagem",
        treinada: false,
        mod: "dexterity",
        bonus: 0,
      },
      {
        name: "Meditação",
        treinada: false,
        mod: "wisdom",
        bonus: 0,
      },
      {
        name: "Ofício",
        treinada: false,
        mod: "intelligence",
        bonus: 0,
      },
      {
        name: "Percepção",
        treinada: false,
        mod: "wisdom",
        bonus: 0,
      },
      {
        name: "Sobrevivência",
        treinada: false,
        mod: "wisdom",
        bonus: 0,
      },
      {
        name: "Medicina",
        treinada: false,
        mod: "intelligence",
        bonus: 0,
      },
      {
        name: "Tecnologia",
        treinada: false,
        mod: "intelligence",
        bonus: 0,
      },
      {
        name: "Investigação",
        treinada: false,
        mod: "intelligence",
        bonus: 0,
      },
      {
        name: "Religião",
        treinada: false,
        mod: "wisdom",
        bonus: 0,
      },
    ],
  };

  const [character, setCharacter] = useState(
    JSON.parse(localStorage.getItem("character")) || defaultCharacter
  );

  useEffect(() => {
    localStorage.setItem("character", JSON.stringify(character));
  }, [character]);

  const calculateLevelBonus = (level) => {
    let levelBonus = 2;

    if (level >= 6 && level <= 10) {
      levelBonus = 3;
    } else if (level >= 11 && level <= 15) {
      levelBonus = 4;
    } else if (level >= 16 && level <= 20) {
      levelBonus = 5;
    }

    return levelBonus;
  };

  const calculateSkills = (character) => {
    const updatedSkills = character.skills.map((skill) => {
      const trainedBonus = skill.treinada ? 2 + character.levelModifier : 0;
      const abilityModifier = Math.floor(
        (character.abilities[skill.mod] - 10) / 2
      );
      const totalBonus = abilityModifier + trainedBonus;

      return {
        ...skill,
        bonus: totalBonus,
      };
    });

    return {
      ...character,
      skills: updatedSkills,
    };
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "generation") {
      value = Math.max(0, Math.min(4, Number(e.target.value)));
    } else if (name === "level") {
      value = Math.max(1, Math.min(20, Number(e.target.value)));
    }
    setCharacter({ ...character, [name]: value });
  };

  const handleHPEgoChange = (e) => {
    let { name, value } = e.target;

    if (name === "hp") {
      value = Math.max(
        0,
        Math.min(character.hp[0].max, Number(e.target.value))
      );
    } else if (name === "ego") {
      value = Math.max(
        0,
        Math.min(character.ego[0].max, Number(e.target.value))
      );
    }

    setCharacter((prevCharacter) => {
      const updated = prevCharacter.name.map((temp) => {
        return { ...temp, current: value };
      });
    });
  };

  const handleAbilityChange = (e) => {
    const { name, value } = e.target;
    const updatedCharacter = { ...character };
    updatedCharacter.abilities[name] = parseInt(value);
    setCharacter(updatedCharacter);
  };

  const handleSkillChange = (skillName, checked) => {
    setCharacter((prevCharacter) => {
      const updatedSkills = prevCharacter.skills.map((skill) => {
        if (skill.name === skillName) {
          const trainedBonus = checked ? 2 + prevCharacter.levelModifier : 0;
          const abilityModifier = Math.floor(
            (prevCharacter.abilities[skill.mod] - 10) / 2
          );
          const totalBonus = abilityModifier + trainedBonus;

          return {
            ...skill,
            treinada: checked,
            bonus: totalBonus,
          };
        }
        return skill;
      });

      return {
        ...prevCharacter,
        skills: updatedSkills,
      };
    });
  };

  const resetCharacter = () => {
    setCharacter(defaultCharacter);
    localStorage.removeItem("character");
  };

  useEffect(() => {
    const levelBonus = calculateLevelBonus(character.level);
    const updatedCharacter = calculateSkills({
      ...character,
      levelModifier: levelBonus,
    });

    // Verifique se o personagem atualizado é diferente do personagem existente antes de atualizá-lo
    if (!isEqual(updatedCharacter, character)) {
      setCharacter(updatedCharacter);
    }
  }, [character.level, character.abilities, character.skills]);

  const rollDice = (bonus) => {
    const D20 = Math.floor(Math.random() * 20) + 1; // Gera um número aleatório entre 1 e 20
    alert(`Dado rolado: ${D20} | Resultado: ${D20 + bonus}`);
  };

  return (
    <>
      <div className="App">
        <section id={"sheetHeader"}>
          <h1>Ficha de Personagem de RPG</h1>
          <CharacterHeader
            character={character}
            handleChange={handleChange}
            handleAbilityChange={handleAbilityChange}
            handleHPEgoChange={handleHPEgoChange}
          />

          <Skills
            skills={character.skills}
            onClick={handleSkillChange}
            rollDice={rollDice}
          />
        </section>
      </div>
      <button id="trash" onClick={resetCharacter}>
        <Trash size="32" />
      </button>
    </>
  );
}

export default App;
