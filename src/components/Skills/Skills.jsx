import React from "react";

import styles from "./Skills.module.css";

function Skills(props) {
  const skills = props.skills;

  return (
    <div className={styles.characterSkills}>
      <h2>Perícias</h2>
      {skills.map((skill, index) => (
        <div key={index} className={styles.skill}>
          <label>
            {skill.name}
            <input
              type="checkbox"
              checked={skill.treinada}
              onChange={(e) => props.onClick(skill.name, e.target.checked)}
            ></input>
          </label>
          Bônus: {skill.bonus}
        </div>
      ))}
    </div>
  );
}

export default Skills;

// <div className="character-skills">
//   <h2>Perícias</h2>
//   {skills.map((skill, index) => (
//     <div key={index} className="skill-item">
//       <label>
//         {skill.name}:
//         <input
//           type="checkbox"
//           checked={skill.treinada}
//           onChange={(e) => handleSkillChange(skill.name, e.target.checked)}
//         />
//       </label>
//       <span>Bônus: {skill.bonus}</span>
//       <button onClick={() => rollSkill(skill)}>Rolar Perícia</button>
//     </div>
//   ))}
// </div>
