/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
const Player = (name, color) => {
  const getName = () => name;
  const getColor = () => color;
  return { getName, getColor };
};

const joe = Player('Joe', '#fe5b5a');
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
  const detectTie = () => {
    // if any threes is empty or only has one type => return false

    // rows
    for (let row = 0; row < 3; row++) {
      let player1 = null;
      let player2 = null;
      for (let col = 0; col < 3; col++) {
        const currentCellPlayer = getCellPlayer(row, col);
        if (!cellEmpty(row, col)) {
          if (!player1) {
            player1 = currentCellPlayer;
          } else if (player1 !== currentCellPlayer) {
            player2 = currentCellPlayer;
          }
        }
      }
      if (!player1 || !player2) return false;
    }
    // cols
    for (let col = 0; col < 3; col++) {
      let player1 = null;
      let player2 = null;
      for (let row = 0; row < 3; row++) {
        const currentCellPlayer = getCellPlayer(row, col);
        if (!cellEmpty(row, col)) {
          if (!player1) {
            player1 = currentCellPlayer;
          } else if (player1 !== currentCellPlayer) {
            player2 = currentCellPlayer;
          }
        }
      }
      if (!player1 || !player2) return false;
    }
    // top left to bottom right diagonal [0,0], [1,1], [2,2]
    let player1 = null;
    let player2 = null;
    for (let row = 0; row < 3; row++) {
      const currentCellPlayer = getCellPlayer(row, row);
      if (!cellEmpty(row, row)) {
        if (!player1) {
          player1 = currentCellPlayer;
        } else if (player1 !== currentCellPlayer) {
          player2 = currentCellPlayer;
        }
      }
    }
    if (!player1 || !player2) return false;
    // bottom left to top right diagonal [0,2], [1,1], [2,0]
    //                                     0      1      2
    player1 = null;
    player2 = null;
    for (let row = 0; row < 3; row++) {
      const currentCellPlayer = getCellPlayer(row, 2 - row);
      if (!cellEmpty(row, 2 - row)) {
        if (!player1) {
          player1 = currentCellPlayer;
        } else if (player1 !== currentCellPlayer) {
          player2 = currentCellPlayer;
        }
      }
    }
    if (!player1 || !player2) return false;
    // no possibility of win!
    return true;
  };
  return {
    select,
    cellEmpty,
    getCellPlayer,
    getWinner,
    detectTie,
  };
})();

const displayController = (() => {
  const update = (currentPlayer, gameover) => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
      const row = +cell.dataset.row;
      const col = +cell.dataset.col;
      if (!gameBoard.cellEmpty(row, col)) {
        const player = gameBoard.getCellPlayer(row, col);
        cell.style.backgroundColor = player.getColor();
      }
    });
    const currentTurn = document.querySelector('.current-turn');
    if (gameover) {
      currentTurn.textContent = `${currentPlayer.getName()} wins!`;
    } else {
      currentTurn.textContent = `${currentPlayer.getName()}'s turn`;
    }
  };
  return { update };
})();

const game = ((player1, player2) => {
  let currentPlayer = (Math.random() <= 0.5) ? player1 : player2;
  let gameover = false;

  const nextSelection = (cell) => {
    if (gameover === true) return;
    const row = +cell.dataset.row;
    const col = +cell.dataset.col;
    if (!gameBoard.cellEmpty(row, col)) return;
    gameBoard.select(currentPlayer, row, col);
    const winner = gameBoard.getWinner();

    if (winner) {
      gameover = true;
    } else {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    }
    displayController.update(currentPlayer, gameover);
  };

  const setup = () => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
      cell.addEventListener('click', nextSelection.bind(this, cell));
    });
    displayController.update(currentPlayer);
  };
  return { setup };
})(matt, joe);

game.setup();
