"use strict";

class Quiz {
  constructor(questions) {
    this.quizData = questions;
    this.currentQuestion = 0;
    this.shuffledQuizData = this.shuffleData(this.quizData);
    this.lastAnswerCorrect = false;
    this.lastQuestion = false;
    this.results = {};
  }
  shuffleData(data) {
    const shuffled = [...data];
    let currentIndex = shuffled.length;
    let temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (1 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      if (randomIndex < currentIndex - 1) {
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = shuffled[currentIndex];
        shuffled[currentIndex] = shuffled[randomIndex];
        shuffled[randomIndex] = temporaryValue;
      }
    }
    return shuffled;
  }
  checkAnswer(answer) {
    const answerCheck =
      this.shuffledQuizData[this.currentQuestion].correctAnswer === answer;
    if (answerCheck) {
      //correct answer
      this.results.correctCount = (this.results.correctCount || 0) + 1;
    } else {
      this.results.incorrectCount = (this.results.incorrectCount || 0) + 1;
    }
    this.results.score =
      (this.results.correctCount / this.shuffledQuizData.length) * 100;
    this.lastAnswerCorrect = answerCheck;
  }
  nextQuestion() {
    if (!this.lastQuestion) {
      this.currentQuestion++;
    }
    this.lastQuestion =
      this.currentQuestion + 1 === this.shuffledQuizData.length;
  }
}
