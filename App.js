import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { Header } from './components/Header';
import { DiceBox } from './components/DiceBox';
import { RollButton } from './components/RollButton';
import Confetti from 'react-confetti'

export function App() {
  const [ diceArray, setDiceArray ] = useState(allNewDice());
  const [ winner, setWinner ] = useState(false);
  const [ heldNumber, setHeldNumber ] = useState(null);
  const [ rolls, setRolls ] = useState(1);
  const best = window.localStorage.getItem("best") || 99;

  function generateDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    let dice = [];
    for(let i = 0; i < 10; i++) {
      dice.push(generateDie());
    }
    return dice;
  }

  function reset() {
    setWinner(false);
    setHeldNumber(null);
    setDiceArray(allNewDice());
    setRolls(1)
  }

  function rollDice() {
    setRolls(oldRolls => {return oldRolls + 1});
    setDiceArray(prevArray => 
      prevArray.map(die => {
        if(!die.isHeld) {
          return generateDie();
        } else {
          return die;
        }
      })
    );
  }

  function handleSelect(id, value) {
    // If won, exit: do not run update the diceArray;
    if(winner) {
      return;
    }

    setDiceArray(prevArray => {
      let newArray = [];
      
      prevArray.map(die => {
        // Check if the incoming id matches the selected Die's id
        if(die.id === id) {
          // If the die is held, unhold it.
          if(die.isHeld === true) {
            die.isHeld = false;
          } else {
            // If there is no heldNumber, set it to the incoming value,
            // and hold the current die.
            if(!heldNumber) {
              setHeldNumber(value)
              die.isHeld = true;
            }
            // If there id a heldNumber, and this die mathces it,
            // hold the current die.
            else if(heldNumber === value) {
              die.isHeld = true;
            }
          }
          newArray.push(die);
        } else {
          newArray.push(die);
        }
      });
      
      // If all dice are held, set the winner state to true and return.
      // the previous array
      if(!newArray.find(die => die.isHeld === false)) {
        setWinner(true)
        return prevArray;
      } 
      // If there are no held dice (In the instance the player de-selects
      // the last held die), set the heldNumber to null
      else {
        if(!newArray.find(die => die.isHeld === true)) {
          setHeldNumber(null);
        }
        return newArray;
      }
    })
  }

  useEffect(() => {
    console.log("You have won")
    if(winner === true && rolls < best) {
      window.localStorage.setItem("best", rolls);
    }
  }, [winner]);

  return(
    <main>
      {winner && <Confetti />}
      <section>
        <div className="scores">
          <div className="score">Best: {best}</div>
          <div className="score">Rolls: {rolls}</div>
        </div>
        <Header />
        <DiceBox diceArray={diceArray} handleSelect={handleSelect} />
        <RollButton rollDice={rollDice} reset={reset} winner={winner} />
      </section>
    </main>
  )
} 