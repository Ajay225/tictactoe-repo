const statusDisplay = document.querySelector(".game__status")

/* Variable to check that status of the game */
let gameActive = true;

/* We store our current player here(To know whos turn) */
let currentPlayer = "X";

/* We will store the current game state. empty strings help us to track the played cells */
let gameState = ["", "", "", "", "", "", "", "", ""]

/* Messages to the players depending on the game*/
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw`;
const currentPlayerTurn = () => `Its ${currentPlayer}'s turn`;

/* We set the initial message to let the player know whos turn it is */

statusDisplay.innerHTML = currentPlayerTurn();

/* update our internal game state and update our UI. */
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
//  Using ternary operator
currentPlayer = currentPlayer === "X" ? "O" : "X";
statusDisplay.innerHTML = currentPlayerTurn();

// Same above logic using if else loop

// if(currentPlayer === "X"){
//     currentPlayer = "0";
//     statusDisplay.innerHTML = currentPlayerTurn();   
// }
// else
// currentPlayer = "X";
// statusDisplay.innerHTML = currentPlayerTurn();
// }
}
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleResultValidation() {
 let roundWon = false;
 for(let i = 0; i <= 7; i++){
 const winCondition = winningConditions[i];
 let a = gameState[winCondition[0]];
 let b = gameState[winCondition[1]];
 let c = gameState[winCondition[2]];

 if(a === "" || b === "" || c === ""){
    continue;
 }
  if( a === b && b === c){
    roundWon = true;
    break;
  }

 }
 if(roundWon == true){
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;
 }
 /* Checking whether there is any value in gamestate array is not populated */
 /* If there is no empty value that does mean the game is a draw */

 let roundDraw = !gameState.includes("")
 if(roundDraw == true){
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
 }

 handlePlayerChange();

}

/* need to check if the clicked cell has already been clicked and if it hasn’t we need to continue our game  */
function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    alert("already selected");
}
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
 
}
function handleRestartGame() {
 gameActive = true;
 currentPlayer = "X";
 gameState = ["", "", "", "", "", "", "", "", ""];
 statusDisplay.innerHTML = currentPlayerTurn();
 document.querySelectorAll(".cell").forEach(cell => cell.innerHTML = "");
}

/* Event listener tio all the cells */
document.querySelectorAll(".cell").forEach(cell => cell.addEventListener("click", handleCellClick));

/* Event for restart button */
document.querySelectorAll(".game__restart").forEach(cell => cell.addEventListener("click", handleRestartGame));

