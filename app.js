const sections = document.querySelectorAll('.grid-section');
const restartBtn = document.querySelector('.restart-btn');
const currentPlayerElement = document.querySelector('.move');
const resultPopup = document.querySelector('.modal-wrapper');
const resultDisplay = document.querySelector('.modal-text');
const closeBtn = document.querySelector('.close');

// Game States
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;


// Player
let currentPlayer = 'Player 1';
currentPlayerElement.innerHTML = `Move: ${currentPlayer}`;

// Conditions
const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// Functions
// Handle Click on Section
const clickOnSection = (e) =>{
    // Get Section
    const clickedSection = e.target;
    const clickedSectionIndex = parseInt(clickedSection.getAttribute('data-section-index'),);

    // Prevent Code from Running if Game is not playing
    if(gameState[clickedSectionIndex] !== '' || !gameActive){
        return;
    }
    //handle Played Section
    handlePlayedSection(clickedSection, clickedSectionIndex);
    getResult();
}

// Handle Played Section
const handlePlayedSection = (section, sectionIndex) => {
    gameState[sectionIndex] = currentPlayer;
    section.innerHTML = currentPlayer === 'Player 1' ? 'X' : 'O';
}

// Get Result for a Game
const getResult = () => {
    // Winning Condition
    let roundWon = false;

    for(let i = 0; i < 7; i++){
        const winCondition = winningConditions[i];

        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if(a === '' || b === '' || c === ''){
            continue;
        }

        if(a === b && b === c){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        resultPopup.classList.add('visible');
        resultDisplay.innerHTML = `${currentPlayer} has won the game`;
        gameActive = false;
        return;
    }
    // Draw Condition
    let roundDraw = !gameState.includes('');

    if(roundDraw){
        resultPopup.classList.add('visible');
        resultDisplay.innerHTML = `Draw`;
        gameActive = false;
        return;
    }

    // Change Player
    changePlayer();
}

// Changing of Players
const changePlayer = () => {
    currentPlayer = currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1';
    currentPlayerElement.innerHTML = `Move: ${currentPlayer}`;
}

// Close Popup
const closePopup = () => {
    resultPopup.classList.remove('visible');
}

// Restart Game
const restartGame = () => {
    gameActive = true;
    currentPlayer = 'Player 1';
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayerElement.innerHTML = `Move: ${currentPlayer}`;
    sections.forEach(section => section.innerHTML = '');
}

// Events
sections.forEach(section => section.addEventListener('click', clickOnSection));
closeBtn.addEventListener('click', closePopup);
restartBtn.addEventListener('click', restartGame);