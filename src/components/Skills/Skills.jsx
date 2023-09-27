import React from "react";

import styles from "./Skills.module.css";

function Skills(props) {
  const skills = props.skills;

  return (
    <div className={styles.characterSkills}>
      <h2>Perícias</h2>
      <table>
        {skills.map((skill, index) => (
          <tr key={index} className={styles.skill}>
            <td>
              <label>
                <input
                  type="checkbox"
                  checked={skill.treinada}
                  onChange={(e) => props.onClick(skill.name, e.target.checked)}
                ></input>
              </label>
            </td>
            <td className={styles.skillName}>{skill.name}</td>
            <td>Bônus: {skill.bonus}</td>
            <td>
              <button
                className={styles.dice}
                onClick={() => props.rollDice(skill.bonus)}
              >
                20
              </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default Skills;
