"use strict";

const quizData = [
  {
    question: "What is JavaScript?",
    answers: [
      "A programming language",
      "A markup language",
      "A scripting language",
      "All of the above",
    ],
    correctAnswer: "A programming language",
  },
  {
    question: "What is the syntax for creating a function in JavaScript?",
    answers: [
      "function = myFunction()",
      "function myFunction()",
      "function:myFunction()",
      "myFunction = function()",
    ],
    correctAnswer: "function myFunction()",
  },
  {
    question: "What is the DOM?",
    answers: [
      "Document Object Model",
      "Desktop Object Model",
      "Database Object Model",
      "None of the above",
    ],
    correctAnswer: "Document Object Model",
  },
  {
    question: "What does the 'this' keyword refer to in JavaScript?",
    answers: [
      "The current function",
      "The global object",
      "The object that owns the current function",
      "The object that is currently being created",
    ],
    correctAnswer: "The object that owns the current function",
  },
  {
    question: "What is an example of a JavaScript data type?",
    answers: ["String", "Boolean", "Number", "All of the above"],
    correctAnswer: "All of the above",
  },
  {
    question: "What is the purpose of an if/else statement in JavaScript?",
    answers: [
      "To execute a block of code if a condition is true",
      "To execute a block of code if a condition is false",
      "To execute a block of code regardless of the condition",
      "To assign a value to a variable",
    ],
    correctAnswer: "To execute a block of code if a condition is true",
  },
  {
    question: "What is a JavaScript array?",
    answers: [
      "A collection of objects",
      "A collection of strings",
      "A collection of variables",
      "A collection of data types",
    ],
    correctAnswer: "A collection of data types",
  },
  {
    question: "What is a JavaScript loop?",
    answers: [
      "A way to execute code repeatedly",
      "A way to add elements to an array",
      "A way to create variables",
      "A way to execute code conditionally",
    ],
    correctAnswer: "A way to execute code repeatedly",
  },
  {
    question: "What is an example of a JavaScript event?",
    answers: [
      "Clicking a button",
      "Typing in a form",
      "Scrolling a page",
      "All of the above",
    ],
    correctAnswer: "All of the above",
  },
  {
    question: "What is a JavaScript object?",
    answers: [
      "A function",
      "A data type",
      "A collection of properties",
      "A loop",
    ],
    correctAnswer: "A collection of properties",
  },
];

const newQuiz = new Quiz(quizData);
const questionEl = document.querySelector(".question h2");
const questionNoEl = document.querySelector(".question h4");
const answerElements = document.querySelectorAll('[class*="answer"]');
const progressEl = document.querySelector(".progress");

const resetSelection = () => {
  answerElements.forEach((element) => {
    const elementh3 = element.querySelector("h3");
    element.classList.remove("clicked");
    element.classList.remove("answer_--correct");
    element.classList.remove("answer_--incorrect");
    elementh3.classList.remove("answer_--correct--header");
  });
};

const displayQuestion = (activeQuestion) => {
  resetSelection();
  questionNoEl.textContent = `Question ${newQuiz.currentQuestion + 1} of ${
    newQuiz.shuffledQuizData.length
  }`;
  questionEl.textContent =
    newQuiz.shuffledQuizData[newQuiz.currentQuestion].question;
  for (const [key, value] of newQuiz.shuffledQuizData[
    newQuiz.currentQuestion
  ].answers.entries()) {
    const answerEl = document.querySelector(`.answer--${key} h3`);
    answerEl.textContent = value;
  }
  //update progress
  progressEl.style.width = `${
    ((activeQuestion + 1) / newQuiz.shuffledQuizData.length) * 100
  }%`;
};

const nextQuestion = () => {
  if (!newQuiz.lastQuestion) {
    newQuiz.nextQuestion();
    displayQuestion(newQuiz.currentQuestion);
  } else {
    displayResults();
  }
};

const displayResults = () => {
  const quizContainer = document.querySelector(".quiz");
  const resultsContainer = document.createElement("div");
  const resultsHeader = document.createElement("h4");
  resultsHeader.textContent = "QUIZ RESULTS";
  const resultsInfo = document.createElement("h5");
  resultsInfo.textContent = `Your score is ${newQuiz.results.score}%! You answered correctly ${newQuiz.results.correctCount} out of ${newQuiz.shuffledQuizData.length} questions! `;
  resultsInfo.textContent += `${
    newQuiz.results.correctCount > 5
      ? "You did really well, keep up the good work"
      : "Keep learning!!! And try again soon"
  }`;
  const tryAgainButtonEl = document.createElement("button");
  tryAgainButtonEl.classList.add("try-again");
  tryAgainButtonEl.innerHTML = "Try again";
  tryAgainButtonEl.onclick = function () {
    window.location.reload();
  };
  resultsContainer.append(resultsHeader, resultsInfo, tryAgainButtonEl);

  // Remove the question and answer divs from the parent element
  while (quizContainer.firstChild) {
    quizContainer.removeChild(quizContainer.firstChild);
  }

  quizContainer.append(resultsContainer);
};

const checkAnswer = (id, answer) => {
  newQuiz.checkAnswer(answer);
  if (newQuiz.lastAnswerCorrect) {
    document.querySelector(`.answer--${id}`).classList.add("answer_--correct");
    document
      .querySelector(`.answer--${id} h3`)
      .classList.add("answer_--correct--header");
    console.log("You are correct");
  } else {
    document
      .querySelector(`.answer--${id}`)
      .classList.add("answer_--incorrect");
    console.log("You are incorrect");
  }
  // document.querySelector(`.answer--${id}`).classList.add("clicked");
  answerElements.forEach((element) => {
    element.classList.add("clicked");
  });
};

displayQuestion(newQuiz.currentQuestion);

//event listeners
answerElements.forEach((answerEl) => {
  answerEl.addEventListener("click", function (event) {
    let answer = answerEl.querySelector("h3").textContent;
    let id = answerEl.id;
    checkAnswer(id, answer);
    setTimeout(nextQuestion, 1000);
  });
});
