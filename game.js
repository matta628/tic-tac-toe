/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
const Player = (name, color) => {
  const getName = () => name;
  const getColor = () => color;
  return { getName, getColor };
};

const joe = Player('Jatt', '#fe5b5a');
const matt = Player('Matt', '#00d5b1');

const gameBoard = (() => {
  const board = [
    [{}, {}, {}],
    [{}, {}, {}],
    [{}, {}, {}],
  ];
  const select = (player, row, col) => {
    board[row][col] = player;
  };
  const cellEmpty = (row, col) => Object.keys(board[row][col]).length === 0;
  const getCellPlayer = (row, col) => board[row][col];
  const getWinner = () => {
    // TODO: detect tie!
    // rows
    for (let row = 0; row < 3; row++) {
      if (
        !cellEmpty(row, 0)
        && board[row][0] === board[row][1]
        && board[row][1] === board[row][2]
      ) {
        return board[row][0];
      }
    }
    // cols
    for (let col = 0; col < 3; col++) {
      if (
        !cellEmpty(0, col)
        && board[0][col] === board[1][col]
        && board[1][col] === board[2][col]
      ) {
        return board[0][col];
      }
    }
    // diagonals
    if ((!cellEmpty(0, 0) && board[0][0] === board[1][1] && board[1][1] === board[2][2])
      || (!cellEmpty(0, 2) && board[0][2] === board[1][1] && board[1][1] === board[2][0])) {
      return board[1][1];
    }
    return null;
  };
  return {
    select,
    cellEmpty,
    getCellPlayer,
    getWinner,
  };
})();

const displayController = (() => {
  const update = () => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
      const row = +cell.dataset.row;
      const col = +cell.dataset.col;
      if (!gameBoard.cellEmpty(row, col)) {
        const player = gameBoard.getCellPlayer(row, col);
        console.log(player);
        cell.style.backgroundColor = player.getColor();
      }
    });
  };
  return { update };
})();

const game = ((player1, player2) => {
  let currentPlayer = player1;
  const gameover = false;

  const nextSelection = (cell) => {
    if (gameover === true) return;
    const row = +cell.dataset.row;
    const col = +cell.dataset.col;
    if (!gameBoard.cellEmpty(row, col)) return;
    gameBoard.select(currentPlayer, row, col);
    currentPlayer = (currentPlayer === player1) ? player2 : player1;
    displayController.update();
  };

  const setup = () => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
      cell.addEventListener('click', nextSelection.bind(this, cell));
    });
  };
  return { setup };
})(matt, joe);

game.setup();
