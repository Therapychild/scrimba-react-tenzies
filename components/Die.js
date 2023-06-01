import React from "react";

export function Die(props) {
  const { className, isHeld, value, handleSelect } = props;
  const dots = []
  
  for(let i = 0; i < value; i++) {
    dots.push(<div key={i} className={`dot __${i+1}`}></div>);
  }
  
  const bg = isHeld ? "held" : "";

  return(
    <div
      className={`die ${bg} ${className}`}
      onClick={handleSelect}
      >
      {dots}
    </div>
  )
}