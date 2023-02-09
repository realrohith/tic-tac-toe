/* eslint-disable no-alert */
const gridFields = document.querySelectorAll('.field>p');
const turn = document.querySelector('span');
const btnRestart = document.querySelector('#restart');

class Player {
  constructor(field) {
    this.field = field;
    this.spots = [];
  }

  getSign() {
    return this.field;
  }
}

const gameBoard = (() => {
  const board = ['', '', '', '', '', '', '', '', ''];
  function reset() {
    let cnt = 0;
    board.forEach((field) => {
      gridFields[cnt].textContent = field;
      cnt += 1;
    });
  }
  return { reset };
})();

const displayController = (() => {
  const PlayerX = new Player('X');
  const PlayerO = new Player('O');
  let round = 1;
  let isGameOver = false;

  function getCurrentPlayerSign() {
    return round % 2 === 0 ? PlayerO.getSign() : PlayerX.getSign();
  }

  function addSpotOnBoard(e) {
    if (e.target.textContent !== '' || isGameOver === true) return;
    e.target.textContent = turn.textContent;

    if (turn.textContent === 'X') turn.textContent = 'O';
    else turn.textContent = 'X';

    if (getCurrentPlayerSign() === 'X')
      PlayerX.spots.push(e.target.dataset.index);
    else PlayerO.spots.push(e.target.dataset.index);

    round += 1;
  }

  function checkWinner(spots) {
    const winSet = [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['1', '4', '7'],
      ['2', '5', '8'],
      ['3', '6', '9'],
      ['1', '5', '9'],
      ['3', '5', '7'],
    ];

    return winSet.some((set) => set.every((val) => spots.includes(val)));
  }

  function announceWinner(winner) {
    switch (winner) {
      case 'O':
        alert('Player O wins!');
        btnRestart.click();
        break;
      case 'X':
        alert('Player X wins!');
        btnRestart.click();
        break;
      default:
        alert("It's a draw!");
        btnRestart.click();
        break;
    }
  }

  gridFields.forEach((spot) => {
    spot.addEventListener('click', (e) => {
      addSpotOnBoard(e);
      if (round > 9) {
        announceWinner('draw');
      } else if (round > 5) {
        if (getCurrentPlayerSign() === 'X' && checkWinner(PlayerO.spots)) {
          isGameOver = true;
          announceWinner('O');
        } else if (checkWinner(PlayerX.spots)) {
          isGameOver = true;
          announceWinner('X');
        }
      }
    });
  });

  btnRestart.onclick = () => {
    gameBoard.reset();
    round = 1;
    isGameOver = false;
    turn.textContent = 'X';
    PlayerX.spots = [];
    PlayerO.spots = [];
  };
})();
