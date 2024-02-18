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
    if (row >= 0 && row < 3 && col >= 0 && col < 3 && board[row][col].getValue() === '') {
      board[row][col].addSign(sign);
    }
  };

  const printBoard = () => {
    const formattedBoard = board.map(row => row.map(cell => cell.getValue()));
    console.log(formattedBoard);
  };

  const resetBoard = () => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        board[i][j].addSign('');
      }
    }
    console.log('----STARTING NEW GAME----');
  };

  return {getBoard, updateCell, printBoard, resetBoard};
})();

function Cell() {
  let value = '';

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
    if (row >= 0 && row < 3 && col >= 0 && col < 3 && gameBoard.getBoard()[row][col].getValue() === '') {
      gameBoard.updateCell(row, col, activePlayer.sign);

      console.log(
        `Put ${activePlayer.name}'s sign ${activePlayer.sign} into cell [${row}][${col}]`
      );

      const announceWinner = () => {
        const winner = checkWin();

        const getWinner = () => winner;
      
        if (winner) {
          gameBoard.printBoard();
          console.log(`${activePlayer.name} wins!`);
          gameBoard.resetBoard();
        } else {
          const isDraw = gameBoard.getBoard().every(row =>
            row.every(cell => cell.getValue() !== '')
          );
      
          if (isDraw) {
            console.log("It's a draw!");
            gameBoard.resetBoard();
          } else {
            switchPlayer();
            printNewRound();
          }
        }

        return {getWinner}
      };

      announceWinner();
      return;
    }
    else {
      console.log('Invalid input. Try again...');
      return;
    }
  };

  /* heck for a winner and handle that logic */
  function checkWin() {
    const board = gameBoard.getBoard();

    const winConditions = [
      // Horizontal Wins
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      // Vertical Wins
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      // Diagonal Wins
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]]
    ];
    
  
    return winConditions.some(condition => {
      const [a, b, c] = condition;
      const valueA = board[a[0]][a[1]].getValue();
      const valueB = board[b[0]][b[1]].getValue();
      const valueC = board[c[0]][c[1]].getValue();
  
      return valueA !== '' && valueA === valueB && valueA === valueC;
    });
  }

  return {playRound};
})();


const handleDOM = () => {
  const boardJS = gameBoard.getBoard();
  const boardHTML = document.querySelector('.board-container');
  
  // Clear existing board HTML
  boardHTML.innerHTML = '';

  // Create HTML elements for each cell
  for (let i = 0; i < boardJS.length; i++) {
    for(let j = 0; j < boardJS[i].length; j++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.textContent = boardJS[i][j].getValue();
      boardHTML.appendChild(cell);
    }
  }
};

// Add an event listener for cell clicks


// Call handleDOM initially to set up the board
handleDOM();