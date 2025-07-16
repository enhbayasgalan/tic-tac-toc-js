document.addEventListener("DOMContentLoaded", createConnect4Board);

let array = Array(6).fill(null).map(() => Array(7).fill(null));

let currentPlayer = 1;
let playerOneColor = "red";
let playerTwoColor = "yellow";
let currentColor = playerOneColor;

// ✅ Тоглоомын самбар үүсгэх
function createConnect4Board() {
  const gameBoard = document.getElementById("container");
  gameBoard.innerHTML = ""; // clear old content if reloaded

  const board = document.createElement("div");
  board.classList.add("board");
  gameBoard.appendChild(board);

  // 7 багана × 6 мөр = 42 slot
  for (let i = 0; i < 42; i++) {
    const slot = document.createElement("div");
    slot.classList.add("slot");
    slot.dataset.column = i % 7;
    slot.dataset.row = Math.floor(i / 7);
    board.appendChild(slot);
  }

  // Reset button
  const resetButton = document.createElement("button");
  resetButton.textContent = "Reset Game";
  resetButton.classList.add("reset_button");
  resetButton.addEventListener("click", resetGame);

  // Status харуулна
  const status = document.createElement("h3");
  status.id = "status";
  status.textContent = `Turn: Player ${currentPlayer} (${currentColor})`;

  gameBoard.appendChild(status);
  gameBoard.appendChild(resetButton);

  // Slot бүр дээр click event нэмэх
  document.querySelectorAll(".slot").forEach((slot) => {
    slot.addEventListener("click", onClick);
  });
}

// ✅ Тоглогч ээлжилж солих
function togglePlayer() {
  currentPlayer = 3 - currentPlayer;
  currentColor = currentPlayer === 1 ? playerOneColor : playerTwoColor;

  const status = document.getElementById("status");
  status.textContent = `Turn: Player ${currentPlayer} (${currentColor})`;
}

// ✅ Click event
function onClick(event) {
  const columnIndex = parseInt(event.target.dataset.column);

  // Багана дахь хамгийн доод мөрийг олно
  const column = array.map((row) => row[columnIndex]);
  const rowIndex = column.lastIndexOf(null);

  // Хэрвээ багана дүүрсэн бол юу ч хийхгүй
  if (rowIndex === -1) return;

  // Array update
  array[rowIndex][columnIndex] = currentPlayer;

  // DOM update
  const targetSlot = document.querySelector(
    `.slot[data-column="${columnIndex}"][data-row="${rowIndex}"]`
  );
  targetSlot.classList.add(currentColor);

  togglePlayer();
}

// ✅ Reset Game
function resetGame() {
  array = Array(6).fill(null).map(() => Array(7).fill(null));
  currentPlayer = 1;
  currentColor = playerOneColor;

  const status = document.getElementById("status");
  status.textContent = `Turn: Player ${currentPlayer} (${currentColor})`;

  document.querySelectorAll(".slot").forEach((slot) => {
    slot.classList.remove("red", "yellow");
  });
}
