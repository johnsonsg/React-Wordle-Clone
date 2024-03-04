// import wordBank from "./wordle-bank.txt";

export const boardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

export const generateWordSet = async (numberOfWords) => {
  let wordSet;
  let todaysWord;
  await fetch(`https://random-word-api.herokuapp.com/word?length=5&number=${numberOfWords}`)
    .then((response) => response.json())
    .then((result) => {
      const wordArr = result;
      todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)];
      wordSet = new Set(wordArr);
    });
  return { wordSet, todaysWord };
};
