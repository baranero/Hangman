const startButton = document.getElementsByClassName("start-button")[0];
const replayButton = document.getElementsByClassName("start-button")[1];   
let alphabetRow = document.getElementsByClassName("alphabet")[0];
let wordRow = document.getElementById("word");
const letterButtons = document.getElementsByClassName("single-letter");
const messageEl = document.getElementById("message");
const chancesEl = document.getElementById("chances");
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let words = ["DOG", "CAT", "ELEPHANT", "TIGER", "WARSAW", "LONDON"];
let word = words[Math.floor(Math.random() * words.length)];     //draw a word from array
let wordSpace = [];     //underscore in the number of letters in the word
let chances = 10;       //number of chances
let amountOfCorrectLetters = 0;  

/* onClick function which add letters, underscores equal to the number of letters in the word and the field in which Hangman is drawn */

startButton.addEventListener("click", function startGame() {
    addAlphabetToDesktop();
    addPlaceForLetter();
    chancesEl.textContent = `You have ${chances} chances`;
    drawEl = document.getElementById("my-canvas");
    ctx = drawEl.getContext("2d");
    styles = `#my-canvas {

        height: 300px;
        width: 400px;
        margin-right: 50px;
        border: 1px solid black;
      }
    `
    styleSheet = document.createElement("style")
    styleSheet.innerText = styles
    document.head.appendChild(styleSheet)
}, { once: true, // starGame function only works once
 });
 
 replayButton.addEventListener("click", function (){ //button allows to start again
    window.location.reload();
 })

function addAlphabetToDesktop() { //function adds letters to desktop as inputs
    for (let i = 0; i < alphabet.length; i++) {
        alphabetRow.innerHTML += `<input type="button" class="single-letter" value="${alphabet[i]}">`;
    };
}

function addPlaceForLetter() { // function adds underscores equal to the number of letters in word
    for (let i = 0; i < word.length; i++) {
        wordSpace.push(" _");
        wordRow.innerText += wordSpace[i];
    }
    console.log(word);
}

function checkPlaceOfLetterInWord(event) { //function checks index of choosen letter and push it to letterInWord array
    for (let i = 0; i < 1; i++) {
        letterInWord = [];
        startIndex = 0;
        while ((index = word.indexOf((event.target.value), startIndex)) > -1 ) {
            letterInWord.push(index);
            startIndex = index + event.target.value.length;
        }
    } 
}

function displayCorrectLetter(event) { // function adds correct letters to desktop and counts amount of correct hits
    for (let i = 0; i < letterInWord.length; i++) {
        wordSpace[letterInWord[i]] = event.target.value;
        amountOfCorrectLetters += 1;
    }
    withoutCommas = wordSpace.join(" ");
    wordRow.innerText = withoutCommas;
    
}

function checkWin() { //checks if all letters have been guessed
    if (amountOfCorrectLetters === word.length) {
        return (messageEl.textContent = "You win!")
    } 
}

let moves = { //the coordinates of the starting points on the canvas
    x1: [30, 40, 40, 160, 160, 160, 160, 160, 160],
    y1: [130, 130, 30, 30, 64, 76, 76, 100, 100],
    x2: [200, 40, 160, 160, 160, 140, 180, 140, 180],
    y2: [130, 30, 30, 50, 100, 66, 66, 110, 110]
}

function drawLine(x1, y1, x2, y2) { //draws lines based on moves coordinates
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2)
    ctx.stroke();
}

function drawCircle() { //draws head of hanged man
    ctx.beginPath();
    ctx.arc(160, 57, 7, 0, 2 * Math.PI);
    ctx.stroke();
}

/* main function which checks and displays letters and draws every part of hanged man when user chooses wrong letter */

function hangman(event) {
    if (event.target.className == "single-letter") {
        if (word.includes(event.target.value)) {
            checkPlaceOfLetterInWord(event);
            displayCorrectLetter(event);
            messageEl.textContent = "Great! Keep going.";
            if (amountOfCorrectLetters === word.length) {
                document.body.removeEventListener('click', hangman)
                //alphabetRow.textContent = "Winner!"
                return (messageEl.textContent = "You win!");
            }
            console.log(amountOfCorrectLetters);
            console.log(word.length);
        } 
        else if (chances <= 1) {
            chances = 0
            drawLine(moves.x1[8], moves.y1[8], moves.x2[8], moves.y2[8])
            chancesEl.textContent = `You have ${chances} chances`;
            document.body.removeEventListener('click', hangman)
            return (messageEl.textContent = "Game over!")
        } 
        else if (word.includes(event.target.value) == false) {
            console.log("Wrong letter");
            messageEl.textContent = "Wrong letter! Try again."
            chances -= 1;
            if (chances == 9) {
                drawLine(moves.x1[0], moves.y1[0], moves.x2[0], moves.y2[0])
            } else if (chances == 8) {
                drawLine(moves.x1[1], moves.y1[1], moves.x2[1], moves.y2[1])
            } else if (chances == 7) {
                drawLine(moves.x1[2], moves.y1[2], moves.x2[2], moves.y2[2])
            } else if (chances == 6) {
                drawLine(moves.x1[3], moves.y1[3], moves.x2[3], moves.y2[3])
            } else if (chances == 5) {
                drawCircle()
            } else if (chances == 4) {
                drawLine(moves.x1[4], moves.y1[4], moves.x2[4], moves.y2[4])
            } else if (chances == 3) {
                drawLine(moves.x1[5], moves.y1[5], moves.x2[5], moves.y2[5])
            } else if (chances == 2) {
                drawLine(moves.x1[6], moves.y1[6], moves.x2[6], moves.y2[6])
            }  else if (chances == 1) {
                drawLine(moves.x1[7], moves.y1[7], moves.x2[7], moves.y2[7])
            }
            console.log(chances);
            chancesEl.textContent = `You have ${chances} chances`;

        }
        event.target.disabled = true; //letter is disabled after click
    }
}

document.body.addEventListener('click', hangman)
