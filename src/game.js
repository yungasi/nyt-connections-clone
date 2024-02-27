import { end } from "/nyt-connections-clone/src/main.js";
export { play };

// get button labels & answers
const CONTENT = JSON.parse(buttons);
const ANSWERS = JSON.parse(answers);

// globals
let shuffled = [...CONTENT];
let guess = [];
let correctGuessCount = 0, correctRowCount = 0, incorrectGuessCount = 4;
let buttonArray = [];

let wrapper = document.createElement("div");

let grid = document.createElement("div");
grid.id = "grid";

let hint = document.createElement("h3");
hint.textContent = "one away...";
hint.id = "one-away";
    
// game initialization
function play() {
    let wrapper = document.createElement("div");
    wrapper.id = "wrapper";
    document.body.appendChild(wrapper);

    let setupDiv = document.createElement("div");
    setupDiv.id = "setup";
    wrapper.appendChild(setupDiv);

    // title setup
    let title = document.createElement("h3");
    title.textContent = "chrasia connections";
    title.id = "title";
    setupDiv.appendChild(title);

    // lives setup
    let livesDiv = document.createElement("div");
    livesDiv.id = "lives-cont";
    for (let i = 0; i < 4; i++) {
        let circle = document.createElement("div");
        circle.classList.add("lives");
        livesDiv.appendChild(circle);
    }
    setupDiv.appendChild(livesDiv);

    // shuffle button placement within array
    shuffle();
    let labelCount = 0;
    
    // button setup
    for (let j = 0; j < 16; j++) {
        let button = document.createElement("button");

        button.textContent = shuffled[labelCount]["label"];
        button.classList.add("button");
        button.classList.add(shuffled[labelCount]["group"]);
        button.id = shuffled[labelCount]["id"];

        button.addEventListener("click", function() {
            handleClick(button);
        })

        buttonArray.push(button);
        grid.appendChild(button);
        labelCount++;
    }

    wrapper.appendChild(grid);
    wrapper.appendChild(hint);

    // shuffle buttons on screen
    /**
    let shuffleButton = document.createElement("button");
    shuffleButton.textContent = "shuffle";
    shuffleButton.id = "shuffle-button";
    shuffleButton.addEventListener("click", function() {
        shuffle();
    });
    setupDiv.appendChild(shuffleButton);
    **/
}

// util functions

// shuffle position of buttons on screen
function shuffle() {
    for (var i = 0; i < shuffled.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (shuffled.length - i));
        var temp = shuffled[j];
        shuffled[j] = shuffled[i];
        shuffled[i] = temp;
    }
}

// swap position of two buttons
function swap(btns) {
    for (let i = 0; i < btns.length; i++) {
        btns[i].style.gridArea = `${correctRowCount}/${i+1}`
    }
}

// disable/renable buttons
function disable(disableButtons) {
    if (disableButtons) {
        for (let i = 0; i < buttonArray.length; i++) {
            buttonArray[i].disabled = true;
            buttonArray[i].style.pointerEvents = "none";
        }
    } else {
        for (let i = 0; i < buttonArray.length; i++) {
            buttonArray[i].disabled = false;
            buttonArray[i].style.pointerEvents = "auto";
        }
    }
}

// gameplay functions

// handle button clicks
function handleClick(button) {
    // total of four buttons have been pressed
    if (guess.length <= 3 && !button.classList.contains("button-active")) {
        if (guess.length == 3) {
            guess.push(button);
            button.classList.add("button-active");
            check();
        }
        guess.push(button);
        button.classList.add("button-active");
    } 
    // select button
    else {
        let index = guess.indexOf(button);
        if (index > -1) { 
            guess.splice(index, 1);
        }
        button.classList.remove("button-active");
    }
}

// check user guess
function check() {
    let correct = false;
    let guessIDs = [];
    let freqs = [];

    // array of each selected button's answer id
    for (let i = 0; i < 4; i++) {
        guessIDs.push(guess[i].classList[1]);
    }

    // count frequencies of each answer id guessed
    for (let i = 1; i <= 4; i++) {
        let count = 0;
        for (let j = 0; j < 4; j++) {
            if (guessIDs[j] == i) {
                count++;
            }
        }
        freqs.push(count);
    }

    if (freqs.includes(4)) { // correct guess
        displayCorrectGuess(guessIDs[0]);
    } else {
        if (freqs.includes(3)) { // guess was one off
            displayWrongGuess(true);
        } else {
            displayWrongGuess(false);
        }
    }
}

// animate correct guess & reset for next guess, or end game
function displayCorrectGuess(group) {
    // disable buttons
    disable(true);
    correctRowCount += 1;
    correctGuessCount += 1;
    // swap each correct button to answer row
    swap(guess);

    // generate answer card
    let answer = document.createElement("div");
    answer.classList.add("answer");
    answer.id = `ans${correctRowCount}`;
    let label = ANSWERS[group-1]["label"];
    answer.appendChild(document.createTextNode(label));

    // animate buttons
    setTimeout(function() {
        for (let i = 0; i < guess.length; i++) {
            guess[i].classList.add("button-right-answer");
        }
    }, 100);
    
    // hide buttons
    setTimeout(function() {
        for (let i = 0; i < guess.length; i++) {
            guess[i].style.visibility = "hidden";
        }
    }, 500);

    // replace row with answer card & animate
    setTimeout(function() {
        grid.appendChild(answer);
        answer.style.gridArea = `${correctRowCount}/1/${correctRowCount}/5`; 
        answer.classList.add("answer-scale");
        // renable buttons
        disable(false);
        // reset for next correct answer
        guess = [];
        // if all answers have been revealed
        if (correctGuessCount == 4) {
            setTimeout(function() {
                // hide game and show end card
                wrapper.remove();
                end();
            }, 1000);
        }
    }, 500);
}

// animate wrong guess & reset for next guess
function displayWrongGuess(oneAway) {
    // disable buttons
    disable(true);
    

    // show hint
    if (oneAway) {
        hint.style.visibility = "visible";
    }

    // display wrong guess
    for (let i = 0; i < 4; i++) {
        // animation
        guess[i].classList.add("button-wrong-answer");
    }

    // reset
    setTimeout(function() {
        // remove animations, colour, & hint
        for (let i = 0; i < 4; i++) {
            guess[i].classList.remove("button-wrong-answer");
            guess[i].classList.remove("button-active");
        }
        if (oneAway) {
            hint.style.visibility = "hidden";
        }

        // decrease lives
        incorrectGuessCount--;
        console.log(incorrectGuessCount);

        let lives = document.getElementsByClassName("lives");
        lives[incorrectGuessCount].style.visibility = "hidden";
        console.log(lives[incorrectGuessCount]);
        
        // end game if out of lives
        setTimeout(function() {
            if (incorrectGuessCount == 0) {
                wrapper.remove();
                end();
            }
        }, 400);
       
        // reenable buttons
        disable(false);
        // reset guess array
        guess = [];
    }, 1250);

}




