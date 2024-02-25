const CONTENT = JSON.parse(buttons);
const ANSWERS = JSON.parse(answers);
//const MAIN = document.getElementById("grid");
let buttonArray = [];
let shuffled = [...CONTENT];
let guess = [];
let correctGuessCount = 0, correctRowCount = 0;

let grid = document.createElement("div");
grid.id = "grid";

function init() {
    let startDiv = document.createElement("div");
    document.body.append(startDiv);
    startDiv.id = "start-cont";

    let text = document.createElement("p");
    startDiv.appendChild(text);
    text.innerHTML = "welcome to chrasia connections!<br/><br/>you know how to play connections.<br/>";
    text.innerHTML += "the answers are related to both our relationship, and us as individuals.<br/><br/>have fun!";

    let start = document.createElement("button");
    startDiv.appendChild(start);
    start.textContent = "let's play!"
    start.id = "start";

    start.addEventListener("click", function() {
        startDiv.remove();
        play();
    });
}

// initialization
function play() {
    // title setup
    let title = document.createElement("h3");
    title.textContent = "chrasia connections";
    title.id = "title";
    document.body.appendChild(title);

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

    document.body.appendChild(grid);
    
}

function swap(btns) {
    for (let i = 0; i < btns.length; i++) {
        btns[i].style.gridArea = `${correctRowCount}/${i+1}`
    }
}

function displayCorrectGuess(group) {
    // disable buttons
    disable(true);
    correctRowCount += 1;
    correctGuessCount += 1;
    // swap each button
    swap(guess);

    // generate title
    let answer = document.createElement("div");
    answer.classList.add("answer");
    answer.id = `ans${correctRowCount}`;
    let label = ANSWERS[group-1]["label"];
    answer.appendChild(document.createTextNode(label));

    // button animation
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

    // replace row with answer & animation
    setTimeout(function() {
        grid.appendChild(answer);
        answer.style.gridArea = `${correctRowCount}/1/${correctRowCount}/5`; 
        answer.classList.add("answer-scale");
        // renable buttons
        disable(false);
        // reset for next correct answer
        guess = [];
        if (correctGuessCount == 4) {
            end();
        }
    }, 500);
}

// animate wrong guess & reset for next guess
function displayWrongGuess() {
    // disable click & hover
    disable(true);

    // display wrong guess
    for (let i = 0; i < 4; i++) {
        // animation
        guess[i].classList.add("button-wrong-answer");
    }

    // reset
    setTimeout(function() {
        // remove animations & colour
        for (let i = 0; i < 4; i++) {
            guess[i].classList.remove("button-wrong-answer");
            guess[i].classList.remove("button-active");
        }
        // reenable click & hover
        disable(false);
        // reset guess array
        guess = [];
    }, 1250);
}

// check user guess
function check() {
    let correctGuess = true;
    let answer = guess[0].classList[1]; // corresponds to JSON answer group

    // check each button's answer
    for (let i = 0; i < 4; i++) {
        if (guess[i].classList[1] != answer) {
            correctGuess = false;
        }
    }

    if (correctGuess) {
        displayCorrectGuess(answer);
    } else {
        displayWrongGuess();
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

// handle button clicks
function handleClick(button) {
    if (guess.length <= 3 && !button.classList.contains("button-active")) {
        if (guess.length == 3) {
            guess.push(button);
            button.classList.add("button-active");
            check();
        }
        guess.push(button);
        button.classList.add("button-active");
    } 
    else {
        let index = guess.indexOf(button);
        if (index > -1) { 
            guess.splice(index, 1);
        }
        button.classList.remove("button-active");
    }
}

// shuffle buttons
function shuffle() {
    for (var i = 0; i < shuffled.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (shuffled.length - i));
        var temp = shuffled[j];
        shuffled[j] = shuffled[i];
        shuffled[i] = temp;
    }
}

function end() {
    let end = document.createElement("h4");
    end.textContent = "happy anniversary! < 3";
    end.id = "end";
    end.classList.add("end-reveal");
    document.body.appendChild(end);
}

document.addEventListener("DOMContentLoaded", init);