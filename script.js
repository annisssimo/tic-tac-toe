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
    if (row >= 0 && row < 3 && col >= 0 && col < 3 && board[row][col] === '') {
      board[row][col].addSign(sign);
    }
  };

  //we won't need it after we build our UI
  const printBoard = () => {
    const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
    console.log(boardWithCellValues);
  };

  return {getBoard, updateCell, printBoard};
})();

function Cell() {
  let value = '';


  const addSign = (sign) => {
    value = sign;
  }

  const getValue = () => value;

  return {addSign, getValue};
}