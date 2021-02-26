// DOM Selections
const keyboard = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
const startButton = document.querySelector(".btn__reset");
const overlay = document.getElementById("overlay");


// Game logic
let misses = 0;

const phrases = [ 
                    "My six pack is protected by a layer of fat",
                    "I love my job only when I am on vacation",
                    "The road to success is always under construction",
                    "This sentence is a lie",
                    "I get enough exercise pushing my luck",
                    "Change is good but dollars are better",
                    "I am not lazy I am just very relaxed",
                    "A cookie a day keeps the sadness away",
                    "A balanced diet means a cupcake in each hand",
                    "You live learn and upgrade"
                ];

const getRandomPhraseAsArray = (arr)=>{
    const index = Math.floor(Math.random() * phrases.length);
    return arr[index].split("");
};

const addPhrasetoDisplay = (arr) => {
    const ul = document.querySelector("ul");
    for(let i = 0; i< arr.length; i++){
        let li = document.createElement("li");
        li.textContent =arr[i];
        if(/\s+/.test(li.textContent)){
            li.className = "space";
        } else {
            li.className = "letter";
        }
        ul.appendChild(li);
    }
};

const checkLetter = (clickedBtn)=>{
    const letters =document.querySelectorAll(".letter");
    let match = null;
    for(let i = 0; i <letters.length; i++){
        if(clickedBtn === letters[i].textContent.toLowerCase()){
            letters[i].classList.add("show");
            match = clickedBtn;
        }
    }
    return match;
};

const missedGuess = () => {
    const heartLi= document.querySelectorAll(".tries")[0];
    const heartImg = heartLi.firstElementChild;
    heartImg.src = "images/lostHeart.png"
    heartLi.className ="lost";
    misses++
};

const endGameOverlay = (result, message) => {
    overlay.className = result;
    overlay.firstElementChild.textContent = message;
    overlay.style.display = "flex";
}

const checkWin = () => {
    const letters =document.querySelectorAll(".letter");
    const show =document.querySelectorAll(".show");
    if(letters.length === show.length){
        endGameOverlay("win", "You Won");
    } else if(misses > 4){
        endGameOverlay("lose", "You Lost");
    }

}


const phraseArray = getRandomPhraseAsArray(phrases);
addPhrasetoDisplay(phraseArray); 



// Event Handlers

const hideOverlay = ( ) => {
    startButton.parentNode.style.display= "none";
};

const handleLetterSelection = (evt) => {
    const clickedBtn = evt.target;
    const btnLetter = clickedBtn.textContent;
    if(clickedBtn.tagName === "BUTTON"){
        clickedBtn.className = "chosen";
        clickedBtn.disabled = true;
        let result = checkLetter(btnLetter);
        if(result === null) {
            missedGuess();
        }
    }
    checkWin();
}









// Event Listeners
startButton.addEventListener("click", hideOverlay);
keyboard.addEventListener("click", handleLetterSelection);