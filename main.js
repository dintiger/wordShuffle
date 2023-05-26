// // dont show repeated  words

// words[done].done = "done";
// console.log(words);

// grab html data !
const wordText = document.querySelector(".word");
const hintText = document.querySelector(".hint");
const lifeText = document.querySelector(".life");
const skipButton = document.querySelector(".skip-word");
const scoreText = document.querySelector(".score");
const timerCount = document.querySelector(".timer");
const inputText = document.querySelector(".input-guess");
const submitAnswer = document.querySelector(".submit-word");
const levelText = document.querySelector(".level");
const canvas = document.querySelector("#confetti");

// initial variable
let word = "";
let timer;
let time = 15;
let playerScore = 0;
let playerLife = 3;
let playerEmoji = "❤️❤️❤️";
let randomWord = {};
let gameLevel = "Level 1";
const jsConfetti = new JSConfetti();

function startGame() {
  inputText.value = "";
  //filter the words is user tried it & pick random word
  const filteredWords = words.filter((obj) => !obj.done);
  let randomIndex = Math.floor(Math.random() * filteredWords.length);
  let randomWord = filteredWords[randomIndex];
  randomWord.done = true;

  console.log(filteredWords);

  word = randomWord.word.toLowerCase();
  let wordArr = word.split("").sort(() => Math.random() - 0.6);
  let shuffleWord = wordArr.join(" ");
  console.log(word);

  lifeText.innerHTML = `Life: ${playerEmoji}`;
  hintText.innerHTML = `hint: ${randomWord.hint}`;
  wordText.innerHTML = shuffleWord;
  scoreText.innerHTML = `SCORE: ${playerScore}`;
  timerCount.innerHTML = time;
  levelText.innerHTML = gameLevel;
  // console.log(word);
  // console.log("game start");

  timer = setInterval(() => {
    if (time > 0) {
      time--;
      return (timerCount.innerHTML = time);
    }
    loseGame();
  }, 1000);
}

function rightAnswer() {
  jsConfetti.addConfetti();
  playerScore++;
  time = 15;
  clearInterval(timer);
  startGame();
  if (playerScore > 5) {
    levelUp();
  }
  if (playerScore >= 100) {
    const choice = prompt(
      `You win the game sah!! You score: ${playerScore}, Restart GAME?`,
      "yes"
    );
    if (choice.toLowerCase() == "yes") {
      gameRestart();
      console.log("game restart");
    }
  }
}

function levelUp() {
  // if player score more than ... ,
  // cut time to half
  console.log("levelup");
  if (playerScore > 5);
  {
    gameLevel = "Level 2";
    time = 8;
    clearInterval(timer);
    startGame();
  }
}

function loseGame() {
  jsConfetti.addConfetti({
    emojis: ["💩", "🤬", "😩", "💩", "🥶", "💩"],
  });
  playerLife--;
  playerEmoji = playerEmoji.slice(0, -1);
  playerEmoji = playerEmoji.slice(0, -1);

  time = 15;

  clearInterval(timer);
  if (playerScore > 3) {
    levelUp();
  }
  startGame();
  if (playerLife < 0) {
    const choice = prompt(
      `Game Over, u ran out of life!!, You score: ${playerScore}, Restart GAME?`,
      "yes"
    );
    if (choice.toLowerCase() == "yes") {
      gameRestart();
      console.log("game restart");
    }
  }
}

// input answer && skip button
let answer = "";
skipButton.addEventListener("click", () => loseGame());
inputText.addEventListener("input", (event) => {
  answer = event.target.value;
});

submitAnswer.addEventListener("click", () => {
  compareAnswer();
  // only mark xxx if u submit it, wont xxx if u skip the word
  // randomWord.done = "xxx";
});

// submit answer using "enter"
inputText.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent the default form submission behavior
    compareAnswer(answer);
    console.log(event.key);
    // randomWord.done = "xxx";
  }
});

//
function compareAnswer() {
  // console.log(answer);
  // console.log(word);
  randomWord.done = "xxx";

  if (answer === word) {
    console.log("Correct!");

    rightAnswer();
    // Perform actions for correct guess
  } else {
    console.log("Wrong");
    loseGame();
    // Perform actions for wrong guess
  }
}

function skipGame() {
  jsConfetti.addConfetti({
    emojis: ["💩", "🤬", "😩", "💩", "🥶", "💩"],
  });
  if (playerScore > 3) {
    levelUp();
  }
  word = "";
  time = 15;
  clearInterval(timer);
  startGame();
}

function gameRestart() {
  word = "";
  let gameLevel = "Level 1";
  time = 15;
  playerScore = 0;
  playerLife = 3;
  playerEmoji = "❤️❤️❤️";
  clearInterval(timer);
  startGame();
}
// function gameOver() {
//   if ((playerLife = -1));
//   alert("Game Over, u ran out of life!!, restart game?");
//   word = "";
//   time = 10;
//   playerLife = 3;
//   clearInterval(timer);
//   startGame();
// }

startGame();
