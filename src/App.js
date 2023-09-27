import React, { useState, useEffect } from "react";
import "./App.css";
import CharacterHeader from "./components/CharacterHeader/CharacterHeader";
import Skills from "./components/Skills/Skills";

function App() {
  const defaultCharacter = {
    name: "",
    generation: 0,
    level: 1,
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCharacter({ ...character, [name]: value });
  };

  const handleAbilityChange = (e) => {
    const { name, value } = e.target;
    console.log(`Habilidade ${name} alterada para ${value}`);

    // Processo alternativo para garantir renderização
    const updatedCharacter = { ...character };
    updatedCharacter.abilities[name] = parseInt(value);
    setCharacter(updatedCharacter);

    character.skills
      .filter((skill) => skill.mod === name)
      .forEach((filteredSkills) =>
        handleSkillChange(filteredSkills.name, filteredSkills.checked)
      );
  };

  const resetCharacter = () => {
    setCharacter(defaultCharacter);
    localStorage.removeItem("character");
  };

  const handleSkillChange = (skillName, checked) => {
    // const levelBonus = calculateLevelBonus(character.level);

    const updatedSkills = character.skills.map((skill) => {
      if (skill.name === skillName) {
        const trainedBonus = checked ? 2 : 0;
        const abilityModifier = Math.floor(
          (character.abilities[skill.mod] - 10) / 2
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

    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      skills: updatedSkills,
    }));
  };

  // const rollSkill = (skill) => {
  //   const rollResult = Math.floor(Math.random() * 20) + 1;
  //   alert(
  //     `Resultado da rolagem para ${skill.name}: ${rollResult + skill.bonus}`
  //   );
  // };

  // const calculateLevelBonus = (level) => {
  //   if (level >= 6 && level <= 10) {
  //     return 1;
  //   } else if (level >= 11 && level <= 15) {
  //     return 2;
  //   } else if (level >= 16 && level <= 20) {
  //     return 3;
  //   }
  //   return 0;
  // };

  const handleSkill = (name, checked) => {};

  return (
    <div className="App">
      <section id={"sheetHeader"}>
        <h1>Ficha de Personagem de RPG</h1>
        <CharacterHeader
          character={character}
          handleChange={handleChange}
          handleAbilityChange={handleAbilityChange}
        />
        <Skills skills={character.skills} onClick={handleSkillChange} />
        {/* <Skills
          skills={character.skills}
          handleSkillChange={handleSkillChange}
          rollSkill={rollSkill}
        /> */}
        <button onClick={resetCharacter}>
          Restaurar Padrão e Limpar LocalStorage
        </button>
      </section>
    </div>
  );
}

export default App;
