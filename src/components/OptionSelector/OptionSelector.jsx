import React, { useState } from "react";
import styles from "./OptionSelector.module.css";

const OptionSelector = ({ listName, list, nameId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const renderOptions = () => {
    const options = list.Feats.map((option) => (
      <div key={option.id} className={styles.optionWrapper}>
        <input
          type="radio"
          id={option.name}
          name={nameId}
          className={styles.option}
          checked={selectedOption === option}
          onChange={() => handleOptionClick(option)}
          onClick={() => setIsOpen(false)}
        />
        <label htmlFor={option.name}>{option.name}</label>
      </div>
    ));

    // Reordena a lista para colocar a opção selecionada no topo
    if (selectedOption) {
      const selectedOptionIndex = list.Feats.findIndex(
        (option) => option === selectedOption
      );
      if (selectedOptionIndex > -1) {
        options.splice(selectedOptionIndex, 1);
        options.unshift(
          <div
            key={selectedOption.id}
            className={`${styles.optionWrapper} ${styles.selected}`}
          >
            <input
              type="radio"
              id={selectedOption.name}
              name={nameId}
              className={styles.option}
              checked={true}
              onChange={() => handleOptionClick(selectedOption)}
            />
            <label htmlFor={selectedOption.name}>{selectedOption.name}</label>
          </div>
        );
      }
    }

    return options;
  };

  return (
    <section
      className={styles.optionSelector}
      style={isOpen ? { height: `${list.Feats.length * 2.65}rem` } : {}}
    >
      <form>{renderOptions()}</form>
      <button
        className={`${isOpen ? styles.open : ""} ${styles.handlerButton}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {">"}
      </button>
    </section>
  );
};

export default OptionSelector;
