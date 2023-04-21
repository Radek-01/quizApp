("use strict");

//Get quiz data from json files

let quizes = [];
let quizObjects = [];
let currentQuiz;
let currentQuizObj;

async function loadAllQuizData() {
  const schema = {}; // JSON schema for validation

  const dataFiles = await fetch("/data/")
    .then((response) => response.text())
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      return Array.from(doc.querySelectorAll("a"))
        .filter((a) => a.href.endsWith(".json"))
        .map((a) => a.href.split("/").pop());
    });
  const quizData = [];
  for (const file of dataFiles) {
    const response = await fetch(`/data/${file}`);
    if (response.ok) {
      const jsonData = await response.json();
      // if (validateAgainstSchema(jsonData, schema)) {
      //   loadedData.push(jsonData);
      // } else {
      //   console.error(`Error loading ${file}: data does not validate against schema`);
      // }
      quizData.push(jsonData);
    } else {
      console.error(
        `Error loading ${file}: ${response.status} ${response.statusText}`
      );
    }
  }

  return quizData;
}

loadAllQuizData()
  .then((data) => {
    quizes = data;
    quizObjects = quizes.map((quizData) => {
      return new Quiz(quizData);
    });
    console.log(quizObjects[0]);
    //Load page for the first time
    currentQuiz = 0;
    currentQuizObj = quizObjects[currentQuiz];
    loadQuiz();
  })
  .catch((error) => {
    console.error(error); // handle errors here
  });

//End get quiz ...

const javascriptQuiz = {
  header: {
    h1Text: "Check your javascript knowledge",
    pText:
      "Answer 10 questions to check your knowledge of javascript bascis. Good luck!",
  },
  quizData: [
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
  ],
};
const englishQuiz = {
  header: {
    h1Text: "Check your english knowledge",
    pText:
      "Answer 10 questions to check your knowledge of intermediate english. Good luck!",
  },
  quizData: [
    {
      question: "What is a phrasal verb?",
      answers: [
        "A type of verb that consists of a main verb and one or more particles",
        "A verb that is always used in the present tense",
        "A verb that is used to describe emotions or feelings",
        "A verb that is always followed by a preposition",
      ],
      correctAnswer:
        "A type of verb that consists of a main verb and one or more particles",
    },
    {
      question: "What is the difference between 'affect' and 'effect'?",
      answers: [
        "Affect is a verb and effect is a noun",
        "Effect is a verb and affect is a noun",
        "They are synonyms and can be used interchangeably",
        "They have no relationship to each other",
      ],
      correctAnswer: "Affect is a verb and effect is a noun",
    },
    {
      question: "What is the present perfect tense?",
      answers: [
        "A tense that is used to describe an action that started in the past and continues up to the present",
        "A tense that is used to describe an action that will happen in the future",
        "A tense that is used to describe an action that happened at a specific time in the past",
        "A tense that is used to describe an action that was completed at some point in the past",
      ],
      correctAnswer:
        "A tense that is used to describe an action that was completed at some point in the past",
    },
    {
      question: "What is the difference between 'few' and 'a few'?",
      answers: [
        "'Few' means almost none, while 'a few' means some",
        "'A few' means almost none, while 'few' means some",
        "They are synonyms and can be used interchangeably",
        "They have no relationship to each other",
      ],
      correctAnswer: "'Few' means almost none, while 'a few' means some",
    },
    {
      question: "What is the difference between 'may' and 'might'?",
      answers: [
        "There is no difference",
        "'May' is used for more certain or probable situations, while 'might' is used for less certain or probable situations",
        "'Might' is used for more certain or probable situations, while 'may' is used for less certain or probable situations",
        "They are only used in formal situations",
      ],
      correctAnswer:
        "'May' is used for more certain or probable situations, while 'might' is used for less certain or probable situations",
    },
    {
      question: "What is a gerund?",
      answers: [
        "A verb form that ends in -ing and is used as a noun",
        "A verb form that is used to describe actions that happened in the past",
        "A verb form that is used to give commands or directions",
        "A verb form that is used to describe hypothetical situations",
      ],
      correctAnswer: "A verb form that ends in -ing and is used as a noun",
    },
    {
      question: "What is a conditional sentence?",
      answers: [
        "A sentence that expresses a condition and its results",
        "A sentence that expresses a strong opinion or belief",
        "A sentence that expresses a fact or observation",
        "A sentence that expresses a feeling or emotion",
      ],
      correctAnswer: "A sentence that expresses a condition and its results",
    },
    {
      question: "What is the passive voice?",
      answers: [
        "A construction that emphasizes the receiver of the action rather than the doer",
        "A construction that emphasizes the doer of the action rather than the receiver",
        "A construction that indicates a state of being rather than an action",
        "A construction that is used for hypothetical or imaginary situations",
      ],
      correctAnswer:
        "A construction that emphasizes the receiver of the action rather than the doer",
    },
    {
      question: "What is the difference between 'advice' and 'advise'?",
      answers: [
        "'Advice' is a noun and 'advise' is a verb",
        "'Advise' is a noun and 'advice' is a verb",
        "They are synonyms and can be used interchangeably",
        "They have no relationship to each other",
      ],
      correctAnswer: "'Advice' is a noun and 'advise' is a verb",
    },
    {
      question: "What is the difference between 'fewer' and 'less'?",
      answers: [
        "'Fewer' is used with countable nouns, while 'less' is used with uncountable nouns",
        "'Less' is used with countable nouns, while 'fewer' is used with uncountable nouns",
        "They are synonyms and can be used interchangeably",
        "They have no relationship to each other",
      ],
      correctAnswer:
        "'Fewer' is used with countable nouns, while 'less' is used with uncountable nouns",
    },
  ],
};
const physicsQuiz = {
  header: {
    h1Text: "Sprawdź swoją wiedzę z fizyki",
    pText:
      "Odpowiedz na 10 pytań, aby sprawdzić swoją wiedzę z podstaw fizyki. Powodzenia!",
  },
  quizData: [
    {
      question: "Co to jest energia kinetyczna?",
      answers: [
        "Energia związana z ruchem",
        "Energia związana z położeniem",
        "Energia związana z temperaturą",
        "Energia związana z dźwiękiem",
      ],
      correctAnswer: "Energia związana z ruchem",
    },
    {
      question: "Jakie jest równanie siły?",
      answers: ["F = m x a", "E = m x c²", "P = V x I", "E = F x d"],
      correctAnswer: "F = m × a",
    },
    {
      question: "Co to jest praca?",
      answers: [
        "Produkt siły i drogi, jaką przebywa ciało pod jej wpływem",
        "Produkt siły i czasu, w którym działa",
        "Produkt masy i przyspieszenia",
        "Produkt natężenia prądu i czasu przepływu prądu",
      ],
      correctAnswer:
        "Produkt siły i drogi, jaką przebywa ciało pod jej wpływem",
    },
    {
      question: "Co to jest energia potencjalna?",
      answers: [
        "Energia związana z położeniem",
        "Energia związana z ruchem",
        "Energia związana z temperaturą",
        "Energia związana z dźwiękiem",
      ],
      correctAnswer: "Energia związana z położeniem",
    },
    {
      question: "Co to jest gęstość?",
      answers: [
        "Masa podzielona przez objętość",
        "Masa pomnożona przez objętość",
        "Masa plus objętość",
        "Masa minus objętość",
      ],
      correctAnswer: "Masa podzielona przez objętość",
    },
    {
      question: "Co to jest siła oporu?",
      answers: [
        "Siła hamująca ruch ciała w płynie lub gazie",
        "Siła przyspieszająca ruch ciała",
        "Siła przyciągająca ciała o masie",
        "Siła odpychająca ciała o przeciwnych ładunkach elektrycznych",
      ],
      correctAnswer: "Siła hamująca ruch ciała w płynie lub gazie",
    },
    {
      question: "Jakie są zasady dynamiki Newtona?",
      answers: [
        "Zasada bezwładności, zasada równoważenia sił, zasada akcji i reakcji",
        "Zasada zachowania energii, zasada powszechności, zasada wewnętrznej energii",
        "Zasada trzeciego prawka dynamiki, zasada przeciwieństwa czynników, zasada ciągłości",
        "Zasada dwóch pierwszych praw Newtona, zasada przyspieszania, zasada ciągłości",
      ],
      correctAnswer:
        "Zasada bezwładności, zasada równoważenia sił, zasada akcji i reakcji",
    },
    {
      question: "Co to jest prąd elektryczny?",
      answers: [
        "Przepływ ładunków elektrycznych",
        "Przepływ ciepła",
        "Przepływ masy",
        "Przepływ energii",
      ],
      correctAnswer: "Przepływ ładunków elektrycznych",
    },
    {
      question: "Co to jest energia?",
      answers: [
        "Zdolność do wykonywania pracy",
        "Materia",
        "Cząstka elementarna",
        "Fala elektromagnetyczna",
      ],
      correctAnswer: "Zdolność do wykonywania pracy",
    },
    {
      question: "Co to jest pole magnetyczne?",
      answers: [
        "Obszar, w którym działają siły magnetyczne",
        "Obszar, w którym działa grawitacja",
        "Obszar, w którym działa elektromagnetyzm",
        "Obszar, w którym działa siła ciężkości",
      ],
      correctAnswer: "Obszar, w którym działają siły magnetyczne",
    },
  ],
};

// const quizes = [javascriptQuiz, englishQuiz, physicsQuiz];
// const quizObjects = quizes.map((quizData) => {
//   return new Quiz(quizData);
// });

const resetSelection = () => {
  const answerElements = document.querySelectorAll('[class*="answer"]');
  answerElements.forEach((element) => {
    element.classList.remove("clicked");
    element.classList.remove("answer_--correct");
    element.classList.remove("answer_--incorrect");
    element.classList.remove("answer_--correct--header");
  });
};

const displayQuizHeader = () => {
  const header_H1_El = document.querySelector(".welcome h1");
  const header_p_El = document.querySelector(".welcome p");
  header_H1_El.textContent = currentQuizObj.quizHeader.h1Text;
  header_p_El.textContent = currentQuizObj.quizHeader.pText;
};

const displayQuestion = (activeQuestion) => {
  resetSelection();
  const progressEl = document.querySelector(".progress");
  const questionNoEl = document.querySelector(".question h4");
  const questionEl = document.querySelector(".question h2");
  questionNoEl.textContent = `Question ${
    currentQuizObj.currentQuestion + 1
  } of ${currentQuizObj.shuffledQuizData.length}`;
  questionEl.textContent =
    currentQuizObj.shuffledQuizData[currentQuizObj.currentQuestion].question;
  for (const [key, value] of currentQuizObj.shuffledQuizData[
    currentQuizObj.currentQuestion
  ].answers.entries()) {
    const answerEl = document.querySelector(`.answer--${key} h3`);
    answerEl.textContent = value;
  }
  //update progress
  progressEl.style.width = `${
    ((activeQuestion + 1) / currentQuizObj.shuffledQuizData.length) * 100
  }%`;
};

const nextQuestion = () => {
  if (!currentQuizObj.lastQuestion) {
    currentQuizObj.nextQuestion();
    displayQuestion(currentQuizObj.currentQuestion);
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
  resultsInfo.textContent = `Your score is ${currentQuizObj.results.score}%! You answered correctly ${currentQuizObj.results.correctCount} out of ${currentQuizObj.shuffledQuizData.length} questions! `;
  resultsInfo.textContent += `${
    currentQuizObj.results.correctCount > 5
      ? "You did really well, keep up the good work"
      : "Keep learning!!! And try again soon"
  }`;
  const tryAgainButtonEl = document.createElement("button");
  tryAgainButtonEl.classList.add("try-again");
  tryAgainButtonEl.innerHTML = "Try again";
  tryAgainButtonEl.onclick = function () {
    restartQuiz(currentQuiz);
  };
  resultsContainer.append(resultsHeader, resultsInfo, tryAgainButtonEl);

  // Remove the question and answer divs from the parent element
  while (quizContainer.firstChild) {
    quizContainer.removeChild(quizContainer.firstChild);
  }

  quizContainer.append(resultsContainer);
};

const checkAnswer = (id, answer) => {
  currentQuizObj.checkAnswer(answer);
  if (currentQuizObj.lastAnswerCorrect) {
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
  const answerElements = document.querySelectorAll('[class*="answer"]');
  answerElements.forEach((element) => {
    element.classList.add("clicked");
  });
};

function restartQuiz(quizNo) {
  currentQuiz = quizNo;
  currentQuizObj = quizObjects[currentQuiz];
  currentQuizObj.restartQuiz();
  const quizEl = document.querySelector(".quiz");
  quizEl.innerHTML = "";
  quizEl.append(createQuestionContent());
  loadQuiz();
}

function createQuestionContent() {
  const createSingleAnswer = (id, answer) => {
    const containerEl = document.createElement("div");
    containerEl.classList.add(`answer--${id}`);
    containerEl.id = `q${id}`;
    const answerTextEl = document.createElement("h3");
    // answerTextEl.textContent = answer;
    containerEl.append(answerTextEl);
    return containerEl;
  };

  const createProgressBar = () => {
    const container = document.createElement("div");
    container.classList.add("progress-bar");
    const bar = document.createElement("div");
    bar.classList.add("progress");
    bar.style.width = "10%";
    container.append(bar);
    return container;
  };
  //create all answers
  const questionContainer = document.createElement("div");
  questionContainer.classList.add("question");
  const progressTextEl = document.createElement("h4");
  const progressBar = createProgressBar();
  const questionTextEl = document.createElement("h2");
  // questionTextEl.textContent =
  //   currentQuizObj.shuffledQuizData[currentQuizObj.currentQuestion].question;
  questionContainer.append(progressTextEl, progressBar, questionTextEl);
  currentQuizObj.shuffledQuizData[
    currentQuizObj.currentQuestion
  ].answers.forEach((answer, index) => {
    questionContainer.append(createSingleAnswer(index, answer));
  });
  return questionContainer;
}

const loadQuiz = () => {
  displayQuizHeader();
  displayQuestion(currentQuizObj.currentQuestion);
  setAnswerListeners();
};

//event listeners
function setAnswerListeners() {
  const answerElements = document.querySelectorAll('[class*="answer"]');
  answerElements.forEach((answerEl) => {
    answerEl.addEventListener("click", function (event) {
      let answer = answerEl.querySelector("h3").textContent;
      let id = answerEl.id.slice(1);
      checkAnswer(id, answer);
      setTimeout(nextQuestion, 1000);
    });
  });
}

function openSubmenu(event) {
  const subMenu = document.querySelector(".quiz-sel-submenu");
  if (subMenu.style.display === "block") {
    subMenu.style.display = "none";
  } else {
    subMenu.style.display = "block";
  }
  event.stopPropagation();
}

const menuItems = document.querySelectorAll("nav ul li");
for (var i = 0; i < menuItems.length; i++) {
  if (menuItems[i].querySelector("ul")) {
    menuItems[i].addEventListener("click", function (event) {
      openSubmenu(event);
    });
  }
}

window.addEventListener("click", function (event) {
  let submenu = document.querySelector(".quiz-sel-submenu");
  if (submenu.style.display === "block" && !submenu.contains(event.target)) {
    submenu.style.display = "none";
  }
});

const quizSelectionItems = document.querySelectorAll(".quiz-sel-submenu li");
quizSelectionItems.forEach((item, idx) => {
  item.addEventListener("click", function () {
    restartQuiz(idx);
  });
});

const mainPageEl = document.querySelector(".homepage");
mainPageEl.addEventListener("click", function () {
  restartQuiz(0);
});

//temporary
// function saveQuizData(obj, filename) {
//   const jsonData = JSON.stringify(obj);
//   const fileUrl = URL.createObjectURL(
//     new Blob([jsonData], { type: "application/json" })
//   );
//   const downloadLink = document.createElement("a");
//   downloadLink.href = fileUrl;
//   downloadLink.download = `${filename}.json`;
//   downloadLink.click();
// }

// saveQuizData(physicsQuiz, "quizSet3");
