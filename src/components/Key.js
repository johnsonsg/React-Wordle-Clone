import React, { useContext } from "react";
import { AppContext } from "../App";

function Key({ keyVal, bigKey, disabled, pressed }) {
  const { gameOver, onSelectLetter, onDelete, onEnter } =
    useContext(AppContext);
  
  const selectLetter = () => {
    if (gameOver.gameOver) return;
    if (keyVal === "ENTER") {
      onEnter();
    } else if (keyVal === "DELETE") {
      onDelete();
    } else {
      onSelectLetter(keyVal);
    }
  };
  const keyClassName = `key ${pressed ? "pressed" : ""}`;
  return (
    <div
      className={keyClassName}
      id={bigKey ? "big" : disabled && "disabled"}
      onClick={selectLetter}
    >
      {keyVal}
    </div>
  );
}

export default Key;
