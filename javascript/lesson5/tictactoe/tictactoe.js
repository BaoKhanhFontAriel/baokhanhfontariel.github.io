const tds = document.querySelectorAll("td");
const rows = document.querySelectorAll("tr");
const turn = document.getElementById("turn");

let turnX = true;
turn.textContent = turnX ? "x" : "o";

tds.forEach(function (td) {
  td.addEventListener(
    "click",
    function () {
      if (turnX) {
        this.textContent = "x";
      } else {
        this.textContent = "o";
      }
      if (checkWin()) {
        alert(this.textContent + " wins");
        restart();
      }
      turnX = !turnX;
      turn.textContent = turnX ? "x" : "o";
    },
    {
      once: true,
    }
  );
});


function checkWin() {
  if (checkRows()) {
    return true;
  }

  if (checkCols()) {
    return true;
  }

  if (checkCross()) {
    return true;
  }

  return false;
}

function checkRows() {
  for (let i = 0; i < rows.length; i++) {
    let cols = rows[i].cells;
    let countX = 0;
    for (let j = 0; j < cols.length; j++) {
      if (cols[j].textContent == "x") {
        countX++;
      } else if (cols[j].textContent == "o") {
        countX--;
      }
    }

    if (countX == 3) {
      return true;
    } else if (countX == -3) {
      return true;
    }
  }

  return false;
}

function checkCols() {
  let j = 0;

  while (j < rows[0].cells.length) {
    let countX = 0;
    for (let i = 0; i < rows.length; i++) {
      let cols = rows[i].cells;
      if (cols[j].textContent == "x") {
        countX++;
      } else if (cols[j].textContent == "o") {
        countX--;
      }

      if (countX == 3) {
        return true;
      } else if (countX == -3) {
        return true;
      }
    }
    j++;
  }
}

function checkCross() {
  let countX = 0;
  let countReverseX = 0;

  for (let i = 0; i < rows.length; i++) {
    let cols = rows[i].cells;

    if (cols[i].textContent == "x") {
      countX++;
    } else if (cols[i].textContent == "o") {
      countX--;
    }

    if (cols[cols.length - 1 - i].textContent == "x") {
      countReverseX++;
    } else if (cols[cols.length - 1 - i].textContent == "o") {
      countReverseX--;
    }
  }

  if (countX == 3) {
    return true;
  } else if (countX == -3) {
    return true;
  }

  if (countReverseX == 3) {
    return true;
  } else if (countReverseX == -3) {
    return true;
  }

  return false;
}
