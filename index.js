
// Select DOM elements
const winDisplay = document.getElementById('winEl');
const yourDisplay = document.getElementById('uChoies');
const computerDisplay = document.getElementById('cChoies');
const pScore = document.getElementById('pScore');
const cScore = document.getElementById('cScore');
const restart = document.getElementById('restart');

// Game variables
const choices = ['👊', '✋', '✌'];
let playerScore = 0;
let computerScore = 0;
let isGameRunning = true;

// Function to handle player's choice
function game(playerChoice) {
    if (!isGameRunning) return; // Stop if game is over

    const computerChoice = getComputerChoice();
    const result = getResult(playerChoice, computerChoice);

    // Update DOM with choices and result
    yourDisplay.textContent = `Player : ${playerChoice}`;
    computerDisplay.textContent = `Computer : ${computerChoice}`;
    winDisplay.textContent = result.message;

    // Update scores based on the result
    if (result.winner === 'player') playerScore++;
    if (result.winner === 'computer') computerScore++;

    updateScores();
    checkWinCondition();
}

// Function to get random computer choice
function getComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

// Function to determine the result of a round
function getResult(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return { message: 'The Same 😡', winner: null };
    }

    const outcomes = {
        '👊✌': 'Rock crushes Scissors!',
        '✋👊': 'Paper covers Rock!',
        '✌✋': 'Scissors cut Paper!'
    };

    const resultKey = playerChoice + computerChoice;
    const isPlayerWin = outcomes[resultKey];

    if (isPlayerWin) {
        return { message: `${outcomes[resultKey]} Good 👍`, winner: 'player' };
    } else {
        // Reverse key to find the computer's winning message
        const computerWinMessage = outcomes[computerChoice + playerChoice];
        return { message: `${computerWinMessage} Not Good 👎`, winner: 'computer' };
    }
}

// Function to update score display
function updateScores() {
    pScore.textContent = `Player Score : ${playerScore}`;
    cScore.textContent = `Computer Score : ${computerScore}`;
}

// Function to check if a player has won
function checkWinCondition() {
    if (playerScore === 3 || computerScore === 3) {
        winDisplay.textContent = playerScore === 3 ? 'You Win 🏆' : 'You Lose 😂';
        isGameRunning = false; // Stop the game
    }
}

// Restart game
restart.addEventListener('click', resetGame);

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    isGameRunning = true;

    // Reset display
    winDisplay.textContent = 'Start';
    yourDisplay.textContent = 'Player : ';
    computerDisplay.textContent = 'Computer : ';
    pScore.textContent = 'Player Score : 0';
    cScore.textContent = 'Computer Score : 0';
}
