import React from "react";

export function RollButton(props) {
  const { reset, rollDice, winner } = props;
  return (
    <button
      onClick={() => {
        if(winner) {
          console.log("We won");
          return reset();
        } else {
          return rollDice()
        }
      }}
    >
      {winner ? "Play Again" : "Roll"}
    </button>
  )

}