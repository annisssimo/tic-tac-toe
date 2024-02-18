const gameBoard = (function() {
  const board = [];
  const rows = 3;
  const cols = 3;

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < cols; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  const updateCell = (row, col, sign) => {
    if (row >= 0 && row < 3 && col >= 0 && col < 3 && board[row][col].getValue() === 0) {
      board[row][col].addSign(sign);
    }
  };

  const printBoard = () => {
    const formattedBoard = board.map(row => row.map(cell => cell.getValue()));
    console.log(formattedBoard);
  };

  return {getBoard, updateCell, printBoard};
})();

function Cell() {
  let value = 0;

  // Accept a player's token to change the value of the cell
  const addSign = (sign) => {
    value = sign;
  };

  // How we will retrieve the current value of this cell through closure
  const getValue = () => value;

  return {
    addSign,
    getValue
  };
}

const gameController = (function() {
  firstPlayerName = 'Player 1';
  secondPlayerName = 'Player 2';

  const players = [
    {
      name: firstPlayerName,
      sign: 'X',
    },
    {
      name: secondPlayerName,
      sign: 'O',
    }
  ]

  let activePlayer = players[0];

  const switchPlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  }

  const printNewRound = () => {
    gameBoard.printBoard();
    console.log(`${activePlayer.name}'s turn.`);
  }

  const playRound = (row, col) => {

    if (row >= 0 && row < 3 && col >= 0 && col < 3 && gameBoard.getBoard()[row][col].getValue() === 0) {
      gameBoard.updateCell(row, col, activePlayer.sign);

    console.log(
      `Put ${activePlayer.name}'s sign ${activePlayer.sign} into cell [${row}][${col}]`
    );

    /*  This is where we would check for a winner and handle that logic,
        such as a win message. */

    switchPlayer();
    printNewRound();
    }
    else {
      console.log('Invalid input. Try again...');
      return;
    }
  };

  return {playRound};

})();