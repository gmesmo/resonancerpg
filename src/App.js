import React, { useState, useEffect } from "react";
import "./App.css";
import CharacterHeader from "./components/CharacterHeader/CharacterHeader";
import Skills from "./components/Skills/Skills";

function App() {
  const defaultCharacter = {
    name: "",
    generation: 0,
    level: 1,
    levelModifier: 2,
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
    let { name, value } = e.target;

    if (name === "generation") {
      value = Math.max(0, Math.min(4, Number(e.target.value)));
    } else if (name === "level") {
      value = Math.max(1, Math.min(20, Number(e.target.value)));
      calculateLevelBonus(value);
      console.log(character.levelModifier);
      character.skills.map((skill) =>
        handleSkillChange(skill.name, skill.checked)
      );
    }
    setCharacter({ ...character, [name]: value });

    // if (name === "level") {
    //   calculateLevelBonus
    // }
  };

  const resetCharacter = () => {
    setCharacter(defaultCharacter);
    localStorage.removeItem("character");
  };

  // Função para lidar com a mudança nas habilidades
  const handleAbilityChange = (e) => {
    // Obtém o nome e o valor da habilidade alterada
    const { name, value } = e.target;
    // Cria uma cópia do personagem para atualizações
    const updatedCharacter = { ...character };
    // Converte o valor para um número inteiro e atualiza a habilidade
    updatedCharacter.abilities[name] = parseInt(value);
    // Atualiza o estado das habilidades
    setCharacter(updatedCharacter);
    if (value % 2 == 0) {
      character.skills
        .filter((skill) => skill.mod === name)
        .forEach((filteredSkill) => {
          handleSkillChange(filteredSkill.name, filteredSkill.checked);
          console.log(`${filteredSkill.name} alterado`);
        });
    }
    // Filtra as habilidades relacionadas à habilidade modificada e chama handleSkillChange para cada uma
  };

  // Função para lidar com a mudança nas skills
  const handleSkillChange = (skillName, checked) => {
    // Atualiza o estado das skills com base na habilidade modificada
    setCharacter((prevCharacter) => {
      const updatedSkills = prevCharacter.skills.map((skill) => {
        if (skill.name === skillName) {
          // Calcula o bônus com base na habilidade e na perícia treinada
          const trainedBonus = checked ? 2 + character.levelModifier : 0;
          const abilityModifier = Math.floor(
            (prevCharacter.abilities[skill.mod] - 10) / 2
          );
          const totalBonus = abilityModifier + trainedBonus;
          // Retorna a skill atualizada
          return {
            ...skill,
            treinada: checked,
            bonus: totalBonus,
          };
        }
        return skill;
      });

      // Retorna o personagem com as skills atualizadas
      return {
        ...prevCharacter,
        skills: updatedSkills,
      };
    });
  };

  // const rollSkill = (skill) => {
  //   const rollResult = Math.floor(Math.random() * 20) + 1;
  //   alert(
  //     `Resultado da rolagem para ${skill.name}: ${rollResult + skill.bonus}`
  //   );
  // };

  const calculateLevelBonus = (level) => {
    let levelBonus = 2;

    if (level >= 6 && level <= 10) {
      levelBonus = 3;
    } else if (level >= 11 && level <= 15) {
      levelBonus = 4;
    } else if (level >= 16 && level <= 20) {
      levelBonus = 5;
    }
    const updatedCharacter = { ...character };
    // Converte o valor para um número inteiro e atualiza a habilidade
    updatedCharacter.levelModifier = levelBonus;
    // Atualiza o estado das habilidades
    setCharacter(updatedCharacter);
  };

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
