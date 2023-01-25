/* eslint-disable no-param-reassign */
const gameBoard = (() => {
  const board = [
    [{ color: '#d4046f' }, {}, {}],
    [{}, {}, {}],
    [{}, {}, {}],
  ];
  const select = (player, row, col) => {
    board[row][col] = player;
  };
  const getCellPlayer = (row, col) => board[row][col];
  return { select, getCellPlayer };
})();

const displayController = ((board) => {
  const update = () => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
      const row = cell.className.split(' ')[1].split('-')[1];
      const col = cell.className.split(' ')[2].split('-')[1];
      console.log({ row, col });
      if (board.getCellPlayer(row, col)) {
        cell.style.backgroundColor = board.getCellPlayer(row, col).color;
      }
    });
  };
  return { update };
})(gameBoard);

displayController.update();
