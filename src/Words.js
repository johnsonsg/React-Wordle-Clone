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


// export const generateWordSet = async (numberOfWords) => {
//   const wordBank = "https://random-word-api.herokuapp.com/word?length=5&number=10";
//   console.log("🚀 ~ generateWordSet ~ wordBank:", wordBank);
//   let wordSet;
//   let todaysWord;
//   await fetch(wordBank)
//     .then((response) => response.json()) // Use response.json() to parse JSON
//     .then((result) => {
//       const wordArr = result; // No need to split or manipulate, as it's already an array
//       todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)];
//       wordSet = new Set(wordArr);
//       console.log("🚀 ~ .then ~ wordSet:", wordSet);
//     });
//   return { wordSet, todaysWord };
// };

// export const generateWordSet = async (numberOfWords) => {
//   const wordBank = `https://random-word-api.herokuapp.com/word?length=5&number=${numberOfWords}`;
//   console.log("🚀 ~ generateWordSet ~ wordBank:", wordBank);
  
//   let wordArray = [];

//   try {
//     const response = await fetch(wordBank);
//     if (!response.ok) {
//       throw new Error(`Failed to fetch words. Status: ${response.status}`);
//     }

//     const result = await response.json();
//     // result is an array of words
//     wordArray = result;
//     console.log("🚀 ~ generateWordSet ~ wordArray:", wordArray);
//   } catch (error) {
//     console.error("Error fetching words:", error.message);
//   }

//   return wordArray;
// };

