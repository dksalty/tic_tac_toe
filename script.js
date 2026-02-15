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
const resetBoard = () => {
  board.forEach(row =>
    row.forEach(cell => cell.clear())
  );
};
return {getBoard, printBoard, resetBoard}
}

function Cell() {
  let value = '';

  const play = (symbol) => {
    if (value !== '') return false;  
    value = symbol;
    return true;                    
  };

  const clear = () => {
    value = '';
  };

  const getValue = () => value;

  return { play, clear, getValue };
}
 

function GameController(){
 const playerOneName = 'Player one';
 const playerTwoName = 'Player two';
 let gameOver = false;
 let winner = null;
 
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
  if (gameOver || winner) return; 
  
  const boardData = board.getBoard();

  
 const moveSuccessful = boardData[row][column].play(activePlayer.symbol);

 if (!moveSuccessful) return;

  if (checkWin(activePlayer.symbol)) {
    winner = activePlayer;
    gameOver = true;
    console.log(`${activePlayer.name} wins!`);
    return;
  }
 if (checkDraw()) {
    gameOver = true;
    winner = null;
    return;
  }
  
  switchPlayerTurn();
};
const checkDraw = () => {
  const boardData = board.getBoard();

  return boardData.every(row =>
    row.every(cell => cell.getValue() !== '')
  );
};

  

const resetGame = () => {
  board.resetBoard();
  activePlayer = players[0];
  gameOver = false;
  winner = null;
};


const getWinner = () => winner;
const isGameOver = () => gameOver;
  return {
    switchPlayerTurn,
    getActivePlayer,
    getBoard: board.getBoard,
    playRound,
    getWinner,
    isGameOver,
    resetGame
   };
}

function ScreenController(){
const game = GameController();
const boardDiv = document.querySelector('.board');
const playerTurnDiv = document.querySelector('.turn');
const resetButton = document.querySelector('.reset')

const updateScreen = () => {
  boardDiv.textContent = "";

  const board = game.getBoard();


  board.forEach((row, rowIndex) => { 
    row.forEach((cell, columnIndex) => {
      const cellButton = document.createElement("button");
      cellButton.classList.add("cell");
      cellButton.dataset.row = rowIndex;
      cellButton.dataset.column = columnIndex;
      cellButton.textContent = cell.getValue();
      boardDiv.appendChild(cellButton);
    });
  });

  if (game.isGameOver()) {

    const winner = game.getWinner();

    if (winner) {
      playerTurnDiv.textContent = `${winner.name} wins!`;
    } else {
      playerTurnDiv.textContent = "Draw!";
    }

  } else {
    const activePlayer = game.getActivePlayer();
    playerTurnDiv.textContent = `${activePlayer.name}'s turn`;
  }
};
 function clickHandlerBoard(e) {
    const row = Number(e.target.dataset.row);
const column = Number(e.target.dataset.column);

if (Number.isNaN(row) || Number.isNaN(column)) return;

  game.playRound(row, column);
  updateScreen();
  }
  boardDiv.addEventListener("click", clickHandlerBoard);
 resetButton.addEventListener('click', () => {
  game.resetGame();
  updateScreen();
});
 
  updateScreen();

}

ScreenController();

