const startButton = document.getElementsByClassName("start-button")[0];   
let alphabetRow = document.getElementsByClassName("alphabet")[0];
let wordRow = document.getElementById("word");
const letterButtons = document.getElementsByClassName("single-letter");
const messageEl = document.getElementById("message");
const chancesEl = document.getElementById("chances");
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let words = ["HUMAN", "AHAHAHA"];
let word = words[Math.floor(Math.random() * words.length)];     //draw a word from array
let wordSpace = [];     //underscore in the number of letters in the word
let chances = 10;       
let amountOfCorrectLetters = 0;  //

startButton.addEventListener("click", function startGame() {
    addAlphabetToDesktop();
    addPlaceForLetter();
    chancesEl.textContent = `You have ${chances} chances`;
}, { once: true });     

function addAlphabetToDesktop() {
    for (let i = 0; i < alphabet.length; i++) {
        alphabetRow.innerHTML += `<input type="button" class="single-letter" value="${alphabet[i]}">`;
    };
}

function addPlaceForLetter() {
    for (let i = 0; i < word.length; i++) {
        wordSpace.push(" _");
        wordRow.innerText += wordSpace[i];
    }
    console.log(word);
}

function checkPlaceOfLetterInWord(e) {
    for (let i = 0; i < 1; i++) {
        letterInWord = [];
        startIndex = 0;
        while ((index = word.indexOf((e.target.value), startIndex)) > -1) {
            letterInWord.push(index);
            startIndex = index + e.target.value.length;
        }
    } 
}

function displayCorrectLetter(e) {
    for (let i = 0; i < letterInWord.length; i++) {
        wordSpace[letterInWord[i]] = e.target.value;
        amountOfCorrectLetters += 1;
    }
    withoutCommas = wordSpace.join(" ");
    wordRow.innerText = withoutCommas;
    
}

function checkWin() {
    if (amountOfCorrectLetters === word.length) {
        return (messageEl.textContent = "You win!")
    } 
}

function hangman(e) {
    if (e.target.className == "single-letter") {
            if (word.includes(e.target.value)) {
                checkPlaceOfLetterInWord(e);
                displayCorrectLetter(e);
                messageEl.textContent = "Great! Keep going.";
                if (amountOfCorrectLetters === word.length) {
                    document.body.removeEventListener('click', hangman)
                    return (messageEl.textContent = "You win!");
                }
                console.log(amountOfCorrectLetters);
                console.log(word.length);
            } 
            else if (chances <= 1) {
                chances = 0
                chancesEl.textContent = `You have ${chances} chances`;
                document.body.removeEventListener('click', hangman)
                return (messageEl.textContent = "Game over!")
            } 
            else if (word.includes(e.target.value) == false) {
                console.log("Wrong letter");
                messageEl.textContent = "Wrong letter! Try again."
                chances -= 1;
                console.log(chances);
                chancesEl.textContent = `You have ${chances} chances`;
                
            } 
        }
    }

document.body.addEventListener('click', hangman)