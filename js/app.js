// Global DOM variables
const phrase = document.getElementById("phrase");
const keyboard = document.getElementById("qwerty");
const startGameBtn = document.getElementsByClassName("btn__reset")[0];
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

const getRandomPhraseArr = (arr) => {
    const index = Math.floor(Math.random() * arr.length);
    const phraseArr = arr[index].split("");
    return phraseArr ;
};

const addPhraseToDisplay = (arr) =>{
    const ul = document.querySelector("ul");
    for(let i = 0; i < arr.length; i++){
        let li = document.createElement('li');
        li.textContent = arr[i];
        if(/\s+/.test(li.textContent)){
            li.className = "space";
        } else {
            li.className = "letter";
        }

        ul.appendChild(li);
    }
};

const checkLetter = (clickedBtn)=>{
    const letters = document.getElementsByClassName("letter");
    let match = null;
    for(let i = 0; i < letters.length; i++){
        if(letters[i].textContent.toLowerCase() === clickedBtn){
            letters[i].classList.add("show");
            match = clickedBtn;        
        } 
    }
    return match;
}

const loseTry = () => {
    const heartLi = document.getElementsByClassName("tries")[0];
    const heartImg = heartLi.firstElementChild;
    heartLi.className = "";
    heartImg.src = "images/lostHeart.png"
    misses++;
};

const checkWin = () => {
    const letters = document.getElementsByClassName("letter");
    const shown = document.getElementsByClassName("show");
    if(letters.length === shown.length){
        overlay.className = "win";
        overlay.style.display = "flex";
    } else if(misses > 4){
        overlay.className = "lose"
        overlay.style.display ="flex";
    }
};


const phraseArr = getRandomPhraseArr(phrases);
addPhraseToDisplay(phraseArr);



// Event Handlers
const handleStartGame = () => {
    const overlay = startGameBtn.parentNode;
    overlay.style.display="none";
};


const handleLetterCheck = (evt)=>{
    const clickedBtn = evt.target;
    if(clickedBtn.tagName === 'BUTTON'){
        clickedBtn.className = "chosen";
        clickedBtn.disabled = true;
        let letterFound = checkLetter(clickedBtn.textContent);
        if(letterFound === null){
            loseTry();
        } 
    }
    checkWin();
}










// Event Listeners
startGameBtn.addEventListener("click", handleStartGame);
keyboard.addEventListener("click",  handleLetterCheck);