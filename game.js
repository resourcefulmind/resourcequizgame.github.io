const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question:
      "Kanye West is the richest rapper in the world and his net worth was recently confirmed by Forbes to be in the billions. How much is he worth?",
    choice1: "3 billion USD",
    choice2: "2.2 billion USD",
    choice3: "3.5 billion USD",
    choice4: "3.2 billion USD",
    answer: 4,
  },
  {
    question:
      "What is the Government name of the hip-hop artist popularly known as 'Diddy' or 'P-Diddy'?",
    choice1: "Sean Carter",
    choice2: "Sean Combs",
    choice3: "Dwayne Carter",
    choice4: "Dwayne Johnson",
    answer: 2,
  },
  {
    question:
      "The popular rapper Calvin Cordozar Broadus Jr a.k.a Snoop Dogg owns a record label named?",
    choice1: "Doggy Style Records",
    choice2: "Doggy Inc",
    choice3: "Bad Boy Records",
    choice4: "Boobietrapped Records",
    answer: 1,
  },
  {
    question:
      "Chris Brown has been nominated for the prestigious Grammy Awards 12 times and has won the coveted awards how many times?",
    choice1: "Seven",
    choice2: "Three",
    choice3: "One",
    choice4: "Ten",
    answer: 3,
  },
  {
    question:
      "Controversial husband to Belcalis Marlenis Almanzar a.k.a Cardi B, Offset, and his wife welcomed their daughter Kulture Kiari to the world in what year?",
    choice1: 2017,
    choice2: 2018,
    choice3: 2015,
    choice4: 2019,
    answer: 2,
  },
];

//creating a couple of constants for the game below
// first we create a constant for how many marks the user is entitled to when they answer a single question correctly
const CORRECT_BONUS = 20;
// then we create a constant for the total number of question a user has to answer before they finish
const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    // move to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
