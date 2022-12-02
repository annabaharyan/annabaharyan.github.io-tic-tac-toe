let inp = document.querySelector("#inp");
const winnerMSG = document.querySelector("#winnerMSG");
const restart = document.querySelector(".restartBtn");
let player = false;
let winner = false;

function createBoard() {
  if (+inp.value % 2 == 0) {
    document.querySelector(".errMsg").style.display = "block";
    inp.value = "";
  } else {
    board(+inp.value);
    document.querySelector(".errMsg").style.display = "none";
    inp.value = "";
  }
}

function board(size) {
  boardContainer = document.querySelector("#boardContainer");
  boardContainer.innerHTML = "";
  let boardMatrix = [];
  for (let i = 0; i < size; i++) {
    let row = document.createElement("div");
    boardMatrix.push([]);
    row.setAttribute("class", "row");
    for (let j = 0; j < size; j++) {
      let cell = document.createElement("div");
      cell.setAttribute("cellIndex", `${i} ${j}`);
      cell.setAttribute("class", "cell");
      boardMatrix[i].push("*");
      cell.addEventListener("click", (e) => getIndex(i, j, boardMatrix, e));
      row.append(cell);
    }
    boardContainer.append(row);
  }
}

function getIndex(i, j, boardMatrix, e) {
  player = !player;
  if (e.target.innerHTML == "") {
    e.target.innerHTML = player ? "x" : "o";
  } else {
    player = !player;
  }

  if (!winner) {
    boardMatrix[i][j] = e.target.innerHTML;
    checkDiagonal(boardMatrix) ||
      checkAuxilaryDiagonal(boardMatrix) ||
      checkHorizontal(boardMatrix) ||
      checkVertical(boardMatrix);
  }
}

function checkDiagonal(boardMatrix) {
  let X = 0;
  let O = 0;

  for (let i = 0; i < boardMatrix.length; i++) {
    for (let j = 0; j < boardMatrix.length; j++) {
      if (i == j && boardMatrix[i][j] == "x") {
        X++;
      } else if (i == j && boardMatrix[i][j] == "o") {
        O++;
      }

      if (X == boardMatrix.length) {
        winnerMSG.innerHTML = "winner X";
        winner = true;
      } else if (O == boardMatrix.length) {
        winnerMSG.innerHTML = "winner O";
        winner = true;
      }
    }
  }
  return winner;
}

function checkAuxilaryDiagonal(boardMatrix) {
  let X = 0;
  let O = 0;

  for (let i = 0; i < boardMatrix.length; i++) {
    for (let j = boardMatrix.length - 1; j >= 0; j--) {
      if (i + j == boardMatrix.length - 1 && boardMatrix[i][j] == "x") {
        X++;
      } else if (i + j == boardMatrix.length - 1 && boardMatrix[i][j] == "o") {
        O++;
      }

      if (X == boardMatrix.length) {
        winnerMSG.innerHTML = "winner X";
        winner = true;
      } else if (O == boardMatrix.length) {
        winnerMSG.innerHTML = "winner O";
        winner = true;
      }
    }
  }
  return winner;
}
function checkHorizontal(boardMatrix) {
  let X = 0;
  let O = 0;

  for (let i = 0; i < boardMatrix.length; i++) {
    for (let j = 0; j < boardMatrix.length; j++) {
      if (boardMatrix[i][j] == "x") {
        X += 1;
      } else if (boardMatrix[i][j] == "o") {
        O += 1;
      }
    }
    if (X == boardMatrix.length) {
      winnerMSG.innerHTML = "winner X";
      winner = true;
    } else if (O == boardMatrix.length) {
      winnerMSG.innerHTML = "winner O";
      winner = true;
    } else {
      X = 0;
      O = 0;
    }
  }
  return winner;
}
function checkVertical(boardMatrix) {
  let X = 0;
  let O = 0;
  let line = 0;

  for (let i = 0; i < boardMatrix.length; i++) {
    if (line == boardMatrix.length) {
      break;
    }
    if (boardMatrix[i][line] == "x") {
      X += 1;
    } else if (boardMatrix[i][line] == "o") {
      O += 1;
    }
    if (i == boardMatrix.length - 1) {
      i = -1;
      line++;
      if (O == boardMatrix.length || X == boardMatrix.length) {
        break;
      } else {
        X = 0;
        O = 0;
      }
    }
  }
  if (X == boardMatrix.length) {
    winnerMSG.innerHTML = "winner X";
    winner = true;
  } else if (O == boardMatrix.length) {
    winnerMSG.innerHTML = "winner O";
    winner = true;
  }
  return winner;
}

restart.addEventListener("click", () => {
  location.reload();
});
