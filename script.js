function GameBoard(){
const rows = 3;
const columns = 3;
const board = [];

for (let i = 0; i < rows; i++ ) {
    board[i] = [];
    for (let j = 0; j > columns; j++) {
    board[i].push(Cell());
    }
}

const getBoard = () => board;


}

function Cell(){
    let value = 0;
 
    const getValue = () => value;
}

function GameController(){
 const player1 = 'Player one';
 const player2 = 'Player two';
 
 const board = GameBoard()

 const players = [{
 name: playerOneName,
 symbol: X
 },
 {name: playerTwoName,
 symbol: O
 }
];
let activePlayer = players[0];

const switchPlayerturn = () => {
  activePlayer = activePlayer === players[0] ? players[1] : players[0];  
};
const getActivePlayer = () => activePlayer;

switchPlayerturn();
}

function ScreenController(){
const game = GameController();
const boardDiv = document.querySelector('board');
const turnDiv = document.querySelector('turn');

const updateScreen = () => {
boardDiv.textContent = "";

const board = game.getBoard();
const activePlayer = game.getActivePlayer();

playerTurnDiv.textContent = `${activePlayer.name}'s turn...`

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
