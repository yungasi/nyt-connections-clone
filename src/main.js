import { play } from "/nyt-connections-clone/src/game.js";
export { end };

// initialization
function init() {
    let startDiv = document.createElement("div");
    document.body.append(startDiv);
    startDiv.id = "start-cont";

    let text = document.createElement("p");
    startDiv.appendChild(text);
    // intro text
    text.innerHTML = "welcome to chrasia connections!<br/><br/>you know how to play connections.<br/>";
    text.innerHTML += "the answers are related to both our relationship, and us as individuals.<br/><br/>have fun!";

    // button to start game
    let start = document.createElement("button");
    startDiv.appendChild(start);
    start.textContent = "let's play!"
    start.id = "start";
    start.addEventListener("click", function() {
        startDiv.remove();
        play();
    });
}

// end of game
function end(win) {
    let endDiv = document.createElement("div");
    document.body.appendChild(endDiv);
    endDiv.id = "end-cont";

    let text = document.createElement("p");
    if (win) {
        text.innerHTML = "you win!<br>";
    } else {
        text.innerHTML = "game over!<br>";
    }
    endDiv.appendChild(text);

    // replay 
    let replayButton = document.createElement("button");
    replayButton.id = "replay-button";
    replayButton.textContent = "play again?";
    replayButton.addEventListener("click", function() {
        endDiv.remove();
        play();
    });
    endDiv.appendChild(replayButton);
}

document.addEventListener("DOMContentLoaded", init);