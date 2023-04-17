"use strict";

// let table = [3, 5, 7, 2];
// function shuffle(array) {
//   const _array = [...array];
//   let currentIndex = _array.length;
//   let temporaryValue, randomIndex;

//   // While there remain elements to shuffle...
//   while (1 !== currentIndex) {
//     // Pick a remaining element...
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     if (randomIndex < currentIndex - 1) {
//       currentIndex -= 1;
//       // And swap it with the current element.
//       temporaryValue = _array[currentIndex];
//       _array[currentIndex] = _array[randomIndex];
//       _array[randomIndex] = temporaryValue;
//     }
//   }

//   return _array;
// }
// console.log(shuffle(table));

//dana tablice questions
//losujemy wcześniej nie wylowowany index randomowy z tej tablicy
//pushujemy wartość na tym indeksie do nowej tablicy
//zapisujemy wartość wylosowanego indeksu do pamięci
//powtarzamy doopóki liczba zapamiętanych indeksów nie zrówna z wielkością tablicy questions

// const quiz1 = [0, 2, 5, 6];

// function shuffleDL(questions) {
//   const mixedArray = [];
//   const usedIndexes = [];
//   let randomIndex;
//   while (usedIndexes.length < questions.length) {
//     do {
//       randomIndex = Math.floor(Math.random() * questions.length);
//     } while (usedIndexes.includes(randomIndex));
//     usedIndexes.push(randomIndex);
//     mixedArray.push(questions[randomIndex]);
//   }
//   return mixedArray;
// }

// console.log("Oryginalny", quiz1);
// console.log("Zmieniony", shuffleDL(quiz1));
