const startButton = document.getElementsByClassName("start-button")[0];
let alphabetRow = document.getElementsByClassName("alphabet")[0];
let wordRow = document.getElementById("word");
const letterButtons = document.getElementsByClassName("single-letter");
let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let words = ["HUMAN", "CITY", "CAR", "DOG", "AHAHAHA"];
let word = words[Math.floor(Math.random() * words.length)];

startButton.addEventListener("click", function startGame() {
    for (let i = 0; i < alphabet.length; i++) {
        alphabetRow.innerHTML += `<input type="button" class="single-letter" value="${alphabet[i]}">`;
    };
    wordSpace = [];
    for (let i = 0; i < word.length; i++) {
        wordSpace.push(" _");
        wordRow.innerText += wordSpace[i];
    }

    console.log(word);
    console.log(wordSpace);
}, { once: true });

document.body.addEventListener('click', function (e) {
    if (e.target.className == "single-letter") {
        for (let i = 0; i < 1; i++) {
            if (word.includes(e.target.value)) {
                console.log(e.target.value);
                for (let i = 0; i < 1; i++) {
                    //wordRow.textContent += e.target.value
                    letterInWord = [];
                    startIndex = 0;
                    while ((index = word.indexOf((e.target.value), startIndex)) > -1) {
                        letterInWord.push(index);
                        startIndex = index + e.target.value.length;
                    }

                }
                console.log(letterInWord);
                for (let i = 0; i < letterInWord.length; i++) {
                    wordSpace[letterInWord[i]] = e.target.value;
                }
                console.log(wordSpace);
                withoutCommas = wordSpace.join(" ");
                console.log(withoutCommas);
                wordRow.innerText = withoutCommas;

            } else {
                console.log("Wrong letter");
            }
        }
    }
});

