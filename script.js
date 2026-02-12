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
  const setValue = (newValue) => {
    if (value !== '') return; 
    value = newValue;
  };

  const addToken = (symbol) => {
  value = symbol;
};

  return { getValue, setValue, addToken};
}
 

function GameController(){
 const playerOneName = 'Player one';
 const playerTwoName = 'Player two';
 
 const board = GameBoard()

 const players = [{
 name: playerOneName,
 symbol: 'x'
 },
 {name: playerTwoName,
 symbol: 'o'
 }
];
let activePlayer = players[0];

const switchPlayerTurn = () => {
  activePlayer = activePlayer === players[0] ? players[1] : players[0];  
};
const getActivePlayer = () => activePlayer;

const checkWin = (symbol) => {
  const boardData = board.getBoard();

  const winningCombos = [
    [[0,0],[0,1],[0,2]],
    [[1,0],[1,1],[1,2]],
    [[2,0],[2,1],[2,2]],
    [[0,0],[1,0],[2,0]],
    [[0,1],[1,1],[2,1]],
    [[0,2],[1,2],[2,2]],
    [[0,0],[1,1],[2,2]],
    [[0,2],[1,1],[2,0]],
  ];

  return winningCombos.some(combo =>
    combo.every(([row, col]) =>
      boardData[row][col].getValue() === symbol
    )
  );
};

const playRound = (row, column) => {
  const boardData = board.getBoard();

  
  boardData[row][column].setValue(activePlayer.symbol);


  if (checkWin(activePlayer.symbol)) {
    console.log(`${activePlayer.name} wins!`);
    return;
  }

  
  switchPlayerTurn();
};

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn. Place ${getActivePlayer().symbol}!`);
  };


printNewRound();

  return {
    switchPlayerTurn,
    getActivePlayer,
    getBoard: board.getBoard,
    playRound
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

board.forEach((row, rowIndex) => { 
    row.forEach((cell, columnIndex) => {
     const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        cellButton.dataset.row = rowIndex;
        cellButton.dataset.column = columnIndex;
        cellButton.textContent = cell.getValue();
        boardDiv.appendChild(cellButton);
    })
    
});

}
 function clickHandlerBoard(e) {
    const row = Number(e.target.dataset.row);
const column = Number(e.target.dataset.column);

if (Number.isNaN(row) || Number.isNaN(column)) return;

  game.playRound(row, column);
  updateScreen();
  }
  boardDiv.addEventListener("click", clickHandlerBoard);
 
 
  updateScreen();

}

ScreenController();

