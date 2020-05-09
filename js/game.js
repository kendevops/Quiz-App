const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestion = [];

let questions = [
  {
    question: "Inside which HTML element do we put the Javascript??",
    choice1: "<script> Tag",
    choice2: "<Javascript> Tag",
    choice3: "<Js> Tag",
    choice4: "<scripting> Tag",
    answer: 1,
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script src='xxx.js'>",
    choice3: "<script name='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 2,
  },
  {
    question: "How do you write 'Hello World' in an alert box in JavaScript??",
    choice1: "alertBox ('Hello World');",
    choice2: "msgBox('Hello World');",
    choice3: "console.log('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4,
  },
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

const startGame = () => {
  (questionCounter = 0), (score = 0);
  availableQuestion = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestion.length === 0 || questionCounter >= MAX_QUESTIONS) {
    return window.location.assign("./end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  const questionIndex = Math.floor(Math.random() * availableQuestion.length);
  currentQuestion = availableQuestion[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestion.splice(questionIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  const number = choice.dataset["number"];
  const val = choice.parentElement;

  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    selectedChoice.parentElement.classList.add(classToApply);
    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
    // const rightAnswer = "correct";
    // const wrongAnswer = "incorrect";
    // if (selectedAnswer == currentQuestion.answer) {
    //   selectedChoice.parentElement.classList.add(rightAnswer);
    //   setTimeout(() => {
    //     selectedChoice.parentElement.classList.remove(rightAnswer);
    //     getNewQuestion();
    //   }, 1000);
    // } else if(number == currentQuestion.answer) {
    //   for (let i = 0; i <= val.length; i++) {
    //     if (i == currentQuestion.answer) {
    //       console.log(val[i]);
    //     }
    //   }
    //   selectedChoice.parentElement.classList.add(wrongAnswer);

    //   setTimeout(() => {
    //     selectedChoice.parentElement.classList.remove(wrongAnswer);
    //     val.classList.add(rightAnswer);
    //     getNewQuestion();
    //   }, 1000);
    // }
    // getNewQuestion();
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
