function GameBoard(){
const row = 3;
const column = 3;
const board = [];



for (let i = 0; i < row; i++){
    board[i] = [];
     for (let j = 0; j < column; j++){
       board[i].push(Cell());
     }
}
const getBoard = () => board;
return {
getBoard,
}
}
function Cell(){
  let value = '';
  const getValue = () => value;
  const setToken = (token) => {
  value = token;
 }
 return {
  getValue,
  setToken,
 }

}
function GameController(p1name = "Player One", p2name = "Player Two") {
const board = GameBoard();
const boardData = board.getBoard();

let winner = null;

const STATES = {
  PLAYING: 'playing',
  WIN: 'win',
  DRAW: 'draw'
};

let status = STATES.PLAYING;

const players = [{
name: p1name,
symbol: 'X'
},
{
name: p2name,
symbol: 'O'
}]
let activePlayer = players[0];

const switchPlayerTurn = () => {
activePlayer = activePlayer === players[0] ? players[1] : players[0];
}

const getActivePlayer = () => activePlayer;

const playRound = (row, column) => {
  
if (boardData[row][column].getValue() !== '' || status === STATES.WIN || status === STATES.DRAW){
  return; };
boardData[row][column].setToken(activePlayer.symbol);


if (checkWin()) {
  
  winner = activePlayer;
  status = STATES.WIN;

} else if (checkDraw()) {
 
  status = STATES.DRAW;
} else {
  
  switchPlayerTurn();
}
return boardData;


}

const winningCombinations = [
  // Rows 
  [[0, 0], [0, 1], [0, 2]],
  [[1, 0], [1, 1], [1, 2]],
  [[2, 0], [2, 1], [2, 2]],
  // Columns
  [[0, 0], [1, 0], [2, 0]],
  [[0, 1], [1, 1], [2, 1]],
  [[0, 2], [1, 2], [2, 2]],
  // Diagonals
  [[0, 0], [1, 1], [2, 2]],
  [[0, 2], [1, 1], [2, 0]]
];

const checkWin = () => {
const hasWon = winningCombinations.some(combo => {
  return combo.every(coord => {
    const cell = boardData[coord[0]][coord[1]];
    return cell.getValue() !== '' && cell.getValue() === activePlayer.symbol;
  });
});


return hasWon
}

const checkDraw = () => {
 return boardData.flat().every(cell => cell.getValue() !== '');
  
}

const getStatus = () => status;
const getWinner = () => winner;
const resetGame = () => {
   winner = null;
  boardData.forEach(row => {
    row.forEach(cell => {
      cell.setToken(''); 
    });
  });
status = 'playing';
activePlayer = players[0];

}

return {
 playRound,
 getActivePlayer,
 switchPlayerTurn,
 getBoard: board.getBoard,
 resetGame,
 getWinner,
 getStatus
}
}

const ScreenController = (function(){
const boardDiv = document.querySelector('.board');
const turnDiv = document.querySelector('.turn')
const p1Input = document.querySelector('#p1')
const p2Input = document.querySelector('#p2')
const startButton = document.querySelector('.start')
const resetButton = document.querySelector('.reset')

let game;

const updateScreen = () =>{
  if (!game) return;
let getWin = game.getWinner();
let currentStatus = game.getStatus();
const currentBoard = game.getBoard()
const activePlayer = game.getActivePlayer()
if (currentStatus === 'win' && getWin){
  turnDiv.textContent = `${getWin.name} wins!`;
}
else if (currentStatus === 'draw') {
  turnDiv.textContent = "It's a draw!";
}
else turnDiv.textContent = `${activePlayer.name}'s turn!`;

boardDiv.textContent = '';
currentBoard.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
    const cellButton = document.createElement('button');
    cellButton.classList.add('cell');
    cellButton.textContent = cell.getValue();
    cellButton.dataset.row = rowIndex;
    cellButton.dataset.column = colIndex;
    boardDiv.appendChild(cellButton);
    });
 });
};

const clickHandler = (e) => {
 const selectedRow = e.target.dataset.row
 const selectedColumn = e.target.dataset.column

 if (!selectedRow || !selectedColumn) return;

 game.playRound(selectedRow, selectedColumn)

 updateScreen()
}

boardDiv.addEventListener('click', clickHandler);

startButton.addEventListener('click', () => {
 const playerOneName = p1Input.value || "Player One"
 const playerTwoName = p2Input.value || "Player Two"

 game = GameController(playerOneName, playerTwoName);

boardDiv.classList.add('active');


 updateScreen();

 
})

resetButton.addEventListener('click', () => {

game.resetGame();
boardDiv.textContent = '';
turnDiv.textContent = '';
boardDiv.classList.remove('active');

})

updateScreen();

})();


