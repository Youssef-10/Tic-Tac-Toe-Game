let cells = document.querySelectorAll("[data-cell]");
let border = document.getElementById("border");
let text = document.getElementById("text");
let winningMsg = document.getElementById("winning-msg");
let restartBtn = document.getElementById("btn");

const xClass = "x";
const circleClass = "circle";
const winningCompenations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let circleTurn;

startGame();

restartBtn.addEventListener("click", startGame);

function startGame() {
  cells.forEach((cell) => {
    cell.classList.remove(xClass);
    cell.classList.remove(circleClass);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBorderHover();
  winningMsg.classList.remove("show");
}

function handleClick(e) {
  let cell = e.target;
  let currentClass = circleTurn ? circleClass : xClass;
  placeMark(cell, currentClass);
  // check for win
  if (checkWin(currentClass)) {
    endGame(false);
    // check for draw
  } else if (isDraw()) {
    endGame(true);
  } else {
    // switch turns
    swapTurn();
    setBorderHover();
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurn() {
  circleTurn = !circleTurn;
}

function setBorderHover() {
  border.classList.remove(xClass);
  border.classList.remove(circleClass);
  if (circleTurn) {
    border.classList.add(circleClass);
  } else {
    border.classList.add(xClass);
  }
}

function checkWin(currentClass) {
  return winningCompenations.some((compenation) => {
    return compenation.every((index) => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function endGame(draw) {
  if (draw) {
    text.innerText = `Draw!`;
    winningMsg.classList.add("show");
  } else {
    text.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
    winningMsg.classList.add("show");
  }
}

function isDraw() {
  return [...cells].every((cell) => {
    return (
      cell.classList.contains(xClass) || cell.classList.contains(circleClass)
    );
  });
}
