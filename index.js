let startButton = document.getElementsByClassName("start-button")[0];
let alphabetRow = document.getElementsByClassName("alphabet")[0];
let wordRow = document.getElementById("word");
let letterButton = document.getElementById("single-letter");
let letterButtonVal = document.getElementById("single-letter");

let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let words = ["HUMAN", "CITY", "CAR", "DOG"];
let word = words[Math.floor(Math.random()*words.length)];
console.log(word);

startButton.addEventListener("click", function startGame() {
  for (let i = 0; i < alphabet.length; i++) {
  alphabetRow.innerHTML += `<input type="button" class="single-letter" value="${alphabet[i]}">`;
  };
  wordRow.textContent = ("_ ").repeat(word.length)
}, {once : true})

if (letterButton) {
  letterButton.addEventListener("click", function addLetter() {
    if (word.includes(letterButtonVal)) {
      return "hi";
    }
})}
