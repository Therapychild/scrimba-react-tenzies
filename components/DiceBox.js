import React from "react";
import { Die } from "./Die";

export function DiceBox(props) {
  const { diceArray, handleSelect } = props;

  const dice = diceArray.map(die => {
    return (
      <Die
        isHeld={die.isHeld}
        key={die.id} 
        value={die.value} 
        handleSelect={() => handleSelect(die.id, die.value)}
        id={die.id}
        className={`_${die.value}`}
      />
    )
  });

  return (
    <div className="dice-box">
      {dice}
    </div>
  )
}