import React from "react";

function Skills({ skills, handleSkillChange, rollSkill }) {
  return (
    <div className="character-skills">
      <h2>Perícias</h2>
      {skills.map((skill, index) => (
        <div key={index} className="skill-item">
          <label>
            {skill.nome}:<input disabled value={skill.bonus}></input>
            <input
              type="checkbox"
              checked={skill.treinada}
              onChange={(e) => handleSkillChange(skill.nome, e.target.checked)}
            />
            <button onClick={() => rollSkill(skill)}>Rolar Perícia</button>
          </label>
        </div>
      ))}
    </div>
  );
}

export default Skills;
