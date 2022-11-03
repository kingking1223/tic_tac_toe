const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const ALMOST_WINNING_COMBINATIONS = [
    [0, 1],
    [0, 2],
    [1, 2],

    [3, 4],
    [3, 5],
    [4, 5],

    [6, 7],
    [6, 8],
    [7, 8],

    [0, 3],
    [0, 6],
    [3, 6],

    [1, 4],
    [1, 7],
    [4, 7],

    [2, 5],
    [2, 8],
    [5, 8],

    [0, 4],
    [0, 8],
    [4, 8],

    [2, 4],
    [2, 6],
    [4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageTextElement = document.querySelector('[data-winningMessage-text]');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('btn');
let circleTurn;
let chooseCorner;
let actualCorner;

const test = 

startGame();

restartButton.addEventListener('click', startGame);

//TRIED TO MAKE A COMPUTER, GAVE UP 
function computer1() {
    chooseCorner = Math.random(4);
    switch(chooseCorner) {
        case 0:
            actualCorner = 0;
            break;
        case 1:
            actualCorner = 2;
            break;
        case 2:
            actualCorner = 6;
            break;
        case 3:
            actualCorner = 8;
            break;
    }
    handleClick(actualCorner);
}

function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true});
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
    // computer1();
}

function handleClick(e) {
    console.log(e)
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)){
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw) {
    if (draw){
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `The winner is ${circleTurn ? "O!" : "X!"}`;
    }
    winningMessageElement.classList.add('show')
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    })
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
          return cellElements[index].classList.contains(currentClass);
        })
    })
}
