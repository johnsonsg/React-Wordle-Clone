import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { boardDefault, generateWordSet } from "./Words";
import React, { useState, createContext, useEffect } from "react";
import GameOver from "./components/GameOver";

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letter: 0 });
  const [wordSet, setWordSet] = useState(new Set());
  console.log("🚀 ~ App ~ wordSet:", wordSet)
  const [correctWord, setCorrectWord] = useState("");
  console.log("🚀 ~ App ~ correctWord:", correctWord)
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });
  const [pressed, setPressed] = React.useState(false);
  console.log("🚀 ~ App ~ pressed:", pressed)

  useEffect(() => {
    const numberOfWords = 8885;
    generateWordSet(numberOfWords).then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    });
  }, []);

const onEnter = () => {
  if (currAttempt.letter !== 5) return;

  const enteredWord = board[currAttempt.attempt].join('');

  if (wordSet.has(enteredWord.toLowerCase())) {
    setCurrAttempt({ attempt: currAttempt.attempt + 1, letter: 0 });
  } else {
    alert("Word not found");
  }

  if (enteredWord.toLowerCase() === correctWord.toLowerCase()) {
    console.log("🚀 ~ onEnter ~ YAY!!! correctWord:", correctWord);
    setGameOver({ gameOver: true, guessedWord: true });
    return;
  }

  console.log(currAttempt);

  if (currAttempt.attempt === 5) {
    setGameOver({ gameOver: true, guessedWord: false });
    return;
  }

  console.log("🚀 ~ onEnter ~ enteredWord:", enteredWord);
};

  const onDelete = () => {
    if (currAttempt.letter === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letter: currAttempt.letter - 1 });
  };

  const onSelectLetter = (key) => {
    console.log("🚀 ~ onSelectLetter ~ key:", key)
    if (currAttempt.letter > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter] = key;
    setBoard(newBoard);
    setCurrAttempt({
      attempt: currAttempt.attempt,
      letter: currAttempt.letter + 1,
    });
    setPressed(true);
  };

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          correctWord,
          onSelectLetter,
          onDelete,
          onEnter,
          setDisabledLetters,
          disabledLetters,
          gameOver,
        }}
      >
        <div className="game">
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard pressed={pressed} />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
