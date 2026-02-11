function GameBoard(){
const rows = 3;
const columns = 3;
const board = [];

for (let i = 0; i < rows; i++ ) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
    board[i].push(Cell());;
    }
}



const getBoard = () => board;
const printBoard = () => {
    const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
    console.log(boardWithCellValues);

}
return {getBoard, printBoard}
}

function Cell(){
    let value = '';
 
    const getValue = () => value;

    return {
      getValue
    }
}

function GameController(){
 const playerOneName = 'Player one';
 const playerTwoName = 'Player two';
 
 const board = GameBoard()

 const players = [{
 name: playerOneName,
 symbol: 'X'
 },
 {name: playerTwoName,
 symbol: 'O'
 }
];
let activePlayer = players[0];

const switchPlayerturn = () => {
  activePlayer = activePlayer === players[0] ? players[1] : players[0];  
};
const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn. Place ${getActivePlayer().symbol}!`);
  };

switchPlayerturn();
printNewRound();

  return {
    getActivePlayer,
    getBoard: board.getBoard
  };
}

function ScreenController(){
const game = GameController();
const boardDiv = document.querySelector('.board');
const playerTurnDiv = document.querySelector('.turn');

const updateScreen = () => {
boardDiv.textContent = "";

const board = game.getBoard();
const activePlayer = game.getActivePlayer();

playerTurnDiv.textContent = `${activePlayer.name}'s turn.`

board.forEach(row => { 
    row.forEach((cell, index) => {
     const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        cellButton.dataset.column = index
        cellButton.textContent = cell.getValue();
        boardDiv.appendChild(cellButton);
    })
    
});

}
 function clickHandlerBoard(e) {
    const selectedCell = e.target.classList.contains("cell");
    if (!selectedCell) return;
    
    const activePlayerSymbol = game.getActivePlayer().symbol;
    selectedCell.textContent = activePlayerSymbol;
    
    updateScreen();
  }
  boardDiv.addEventListener("click", clickHandlerBoard);

  // Initial render
  updateScreen();

}

ScreenController();



//player 1 turn start with O
//user presses cell when they are assigned
//button dissapears and O replaces it
//switch to player 2 who is x
//keep the O with button gone
//player 2 presses cell and the same happens
//when the win conditions are met or tie announce it
//reset game
