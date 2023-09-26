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
        nome: "Atletismo",
        treinada: false,
        mod: "strength",
        bonus: 0, // Bônus da perícia
      },
      {
        nome: "Adestrar Animais",
        treinada: false,
        mod: "wisdom",
        bonus: 0, // Bônus da perícia
      },
      {
        nome: "Acrobacia",
        treinada: false,
        mod: "dexterity",
        bonus: 0, // Bônus da perícia
      },
      {
        nome: "Atuação",
        treinada: false,
        mod: "charisma",
        bonus: 0, // Bônus da perícia
      },
      {
        nome: "Conhecimento",
        treinada: false,
        mod: "intelligence",
        bonus: 0, // Bônus da perícia
      },
      {
        nome: "Diplomacia",
        treinada: false,
        mod: "charisma",
        bonus: 0, // Bônus da perícia
      },
      // Adicione outras habilidades aqui...
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
    setCharacter({
      ...character,
      abilities: {
        ...character.abilities,
        [name]: parseInt(value),
      },
    });
  };

  const handleSkillChange = (skillNome, checked) => {
    const updatedSkills = character.skills.map((skill) => {
      if (skill.nome === skillNome) {
        const { mod } = skill;
        let bonus = 0;

        // Calcule o bônus com base na habilidade
        const ability = character.abilities[mod];
        const abilityModifier = Math.floor((ability - 10) / 2);
        bonus += abilityModifier;

        // Adicione o bônus de treinado se a perícia for treinada
        if (checked) {
          bonus += 2;
        }

        return { ...skill, treinada: checked, bonus };
      }
      return skill;
    });

    setCharacter({
      ...character,
      skills: updatedSkills,
    });
  };

  const rollSkill = (skill) => {
    // Simule um lançamento de dado de 20 lados
    const rollResult = Math.floor(Math.random() * 20) + 1;

    // Calcule o resultado final
    const totalResult = rollResult + skill.bonus;

    // Exiba o resultado para o usuário
    alert(`Resultado da rolagem para ${skill.nome}: ${totalResult}`);
  };

  const resetCharacter = () => {
    setCharacter(defaultCharacter);
    localStorage.removeItem("character");
  };

  return (
    <div className="App">
      <h1>Ficha de Personagem de RPG</h1>
      <CharacterHeader
        character={character}
        handleChange={handleChange}
        handleAbilityChange={handleAbilityChange}
      />
      <Skills
        skills={character.skills}
        handleSkillChange={handleSkillChange}
        rollSkill={rollSkill}
      />
      <button onClick={resetCharacter}>
        Restaurar Padrão e Limpar LocalStorage
      </button>
    </div>
  );
}

export default App;
