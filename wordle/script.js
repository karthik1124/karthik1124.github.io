let words = [
  "Zebra",  "Sling",
  "Crate",  "Brick",
  "press",  "truth",
  "sweet",  "salty",
  "alert",  "check",
  "roast",  "toast",
  "shred",  "cheek",
  "shock",  "czech",
  "woman",  "wreck",
  "court",  "coast",
  "flake",  "think",
  "smoke",  "unrig",
  "slant",  "ultra",
  "vague",  "pouch",
  "radix",  "yeast",
  "zoned",  "cause",
  "quick",  "bloat",
  "level",  "civil",
  "civic",  "madam",
  "house",  "delay",
];
let container = document.querySelector(".container");
let winScreen = document.querySelector(".win-screen");
let submitButton = document.querySelector(".submit");
let inputCount, tryCount, inputRow;
let backSpaceCount = 0;
let randomWord, finalWord;


const isTouchDevice = () => {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
};

const startGame = async () => {
  winScreen.classList.add("hide");
  container.innerHTML = "";
  inputCount = 0;
  successCount = 0;
  tryCount = 0;
  finalWord = "";

  for (let i = 0; i < 6; i++) {
    let inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");
    for (let j = 0; j < 5; j++) {
      inputGroup.innerHTML += `<input type="text" class="input-box" onkeyup="checker(event)" maxlength="1" disabled>`;
    }
    await container.appendChild(inputGroup);
  }
  inputRow = document.querySelectorAll(".input-group");
  inputBox = document.querySelectorAll(".input-box");
  updateDivConfig(inputRow[tryCount].firstChild, false);
  randomWord = getRandom();
  // alert ("Hey, " + randomWord + "!");
  console.log(randomWord);
};

const getRandom = () =>
  words[Math.floor(Math.random() * words.length)].toUpperCase();

const updateDivConfig = (element, disabledStatus) => {
  element.disabled = disabledStatus;
  if (!disabledStatus) {
    element.focus();
  }
};

const checker = async (e) => {
  let value = e.target.value.toUpperCase();
  updateDivConfig(e.target, true);
  if (value.length == 1) {
    if (inputCount <= 4 && e.key != "Backspace") {
      finalWord += value;
      if (inputCount < 4) {
        updateDivConfig(e.target.nextSibling, false);
      }
    }
    inputCount += 1;
  } else if (value.length == 0 && e.key == "Backspace") {
    finalWord = finalWord.substring(0, finalWord.length - 1);
    if (inputCount == 0) {
      updateDivConfig(e.target, false);
      return false;
    }
    updateDivConfig(e.target, true);
    e.target.previousSibling.value = "";
    updateDivConfig(e.target.previousSibling, false);
    inputCount = -1;
  }
};

window.addEventListener("keyup", (e) => {
  if (inputCount > 4) {
    if (isTouchDevice()) {
      submitButton.classList.remove("hide");
    }
    if (e.key == "Enter") {
      validateWord();
    } else if (e.key == "Backspace") {
      inputRow[tryCount].lastChild.value = "";
      finalWord = finalWord.substring(0, finalWord.length - 1);
      updateDivConfig(inputRow[tryCount].lastChild, false);
      inputCount -= 1;
    }
  }
});

const validateWord = async () => {
  if (isTouchDevice()) {
    submitButton.classList.add("hide");
  }
  let failed = false;
  let currentInputs = inputRow[tryCount].querySelectorAll(".input-box");
 
  await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${finalWord}`
  ).then((response) => {
    if (response.status == "404") {
      console.clear();
      alert("Please Enter Valid Word");
      failed = true;
    }
  });

  if (failed) {
    return false;
  }
  let successCount = 0;
  let successLetters = "";
  for (let i in randomWord) {
    if (finalWord[i] == randomWord[i]) {
      currentInputs[i].classList.add("correct");
      successCount += 1;
      successLetters += randomWord[i];
    } else if (
      randomWord.includes(finalWord[i]) &&
      !successLetters.includes(finalWord[i])
    ) {
      currentInputs[i].classList.add("exists");
    } else {
      currentInputs[i].classList.add("incorrect");
    }
  }
  tryCount += 1;
  if (successCount == 5) {
    setTimeout(() => {
      winScreen.classList.remove("hide");
      winScreen.innerHTML = `
        <span>Total guesses: ${tryCount}</span>
        <button onclick="startGame()">New Game</button>
        `;
    }, 1000);
  } else {
    inputCount = 0;
    finalWord = "";
    if (tryCount == 6) {
      tryCount = 0;
      winScreen.classList.remove("hide");
      winScreen.innerHTML = ` <span>You lose</span>
        <button onclick="startGame()">New Game</button>`;
      return false;
    }
    updateDivConfig(inputRow[tryCount].firstChild, false);
  }
  inputCount = 0;
};

window.onload = startGame();