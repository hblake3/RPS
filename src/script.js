let numLives, numWins;
let playerName = 'PLR';

function setPlayerInitials(){
    console.log("test");
}

const rules = {
    rock: {beats: 'scissors'},
    paper: {beats: 'rock'},
    scissors: {beats: 'paper'},
};

const gameText_el = document.getElementById("gameText");
const compChoiceText_el = document.getElementById("compChoiceText");
const winsText_el = document.getElementById("winsText");
const livesText_el = document.getElementById("livesText");
let playerButtons = []; //holds all player button objects

// create an array of all player buttons
document.querySelectorAll('#gameButtons button').forEach(button => {
    playerButtons.push(button);
});


// initialize the game
document.addEventListener("DOMContentLoaded", () => {
    resetGame(); // run the reset function
});

// reset the game
function resetGame(){
    numWins = 0
    numLives = 3
    updateGameUI();
}

// update the UI text elements
function updateGameUI(){
    winsText_el.innerHTML = numWins;
    livesText_el.innerHTML = numLives;
}

function runGame(choice){
    if(numLives > 0){
        // Style the selection & non-selected buttons
        playerButtons.forEach(button =>{
            button.classList.remove("rps-selected");
            button.classList.add("rps-button-inactive");
        })

        // document.querySelectorAll('#gameButtons button').forEach(button => {
        //     button.classList.remove("rps-selected");
        //     button.classList.add("rps-button-inactive");
        // });

        choice.classList.remove("rps-button-inactive");
        choice.classList.add("rps-selected");


        // get computer choice
        const compChoices = Object.keys(rules);
        let compChoice = compChoices[Math.floor(Math.random() * compChoices.length)];
        compChoiceText_el.innerHTML = (`Computer chose ${compChoice}!`);
        
        
        // run the game
        if(choice.value === compChoice){
            printOutcome('tie');
        }
        else if(rules[choice.value].beats === compChoice){
            numWins++;
            printOutcome('win');
        }
        else{
            numLives--;
            printOutcome('lose');
        }
    }
    if(numLives <= 0){
        // reset the button appearance
        playerButtons.forEach(button =>{
            button.classList.remove("rps-selected");
            button.classList.add("rps-button-inactive");
        })
        // disable the buttons
        playerButtons.forEach(button => {
            button.disabled = true;
        });

        // show game over popup

    }
}

function printOutcome(result){
    const messages = {
        'tie': "It was a tie.",
        'win': "You are winner, ha ha ha.",
        'lose': "You are one pathetic loser!"
    }
    gameText_el.innerHTML = messages[result];
    updateGameUI();
}