const createConnect4Board = () => {
  // Get the container element where the board will be placed
  const gameBoard = document.getElementById("container");

  // Create the board element and add a class for styling
  const board = document.createElement("div");
  board.classList.add("board");
  gameBoard.appendChild(board);

  // Loop to create 42 slots (7 columns x 6 rows) for the Connect 4 grid
  for (let i = 0; i < 42; i++) {
    const slot = document.createElement("div"); // Create a slot element
    slot.classList.add("slot"); // Add a class for styling
    slot.id = (i % 7) + "-" + Math.floor(i / 7); // Assign a unique ID in "column-row" format
    slot.dataset.column = i % 7; // Add the column index as a dataset attribute
    slot.dataset.row = Math.floor(i / 7); // Add the row index as a dataset attribute
    board.appendChild(slot); // Add the slot to the board
  }
  // creating reset button and display
  const resetButton = document.createElement("button");
  resetButton.innerHTML = "Reset Game";
  resetButton.classList.add("reset_button");

  // Create a container for the controls (player disc choices)
  // Create the controls container
  // Create the controls container
  const controls = document.createElement("div");
  controls.classList.add("controls"); // Add a class for styling

  // Create and configure the red disc selection
  // Create the red disc element and input
  const redDisc = document.createElement("div");
  redDisc.classList.add("redDisc"); // Add a class for styling
  redDisc.style.display = "none"; // Hide the red disc element

  const redInput = document.createElement("input"); // Create a radio input
  redInput.type = "radio"; // Set type to radio
  redInput.name = "discChoice"; // Set name for grouping radio buttons
  redInput.id = "redDiscChoice"; // Assign an ID
  redInput.checked = true; // Make red the default selected disc
  redInput.style.display = "none"; // Hide the input element

  // Create the yellow disc element and input
  const yellowDisc = document.createElement("div");
  yellowDisc.classList.add("yellowDisc"); // Add a class for styling
  yellowDisc.style.display = "none"; // Hide the yellow disc element

  const yellowInput = document.createElement("input"); // Create a radio input
  yellowInput.type = "radio"; // Set type to radio
  yellowInput.name = "discChoice"; // Group with red disc radio
  yellowInput.id = "yellowDiscChoice"; // Assign an ID
  yellowInput.style.display = "none"; // Hide the input element

  // Create containers for each disc choice and append elements
  const redContainer = document.createElement("div");
  redContainer.appendChild(redDisc);
  redContainer.appendChild(redInput);

  const yellowContainer = document.createElement("div");
  yellowContainer.appendChild(yellowDisc);
  yellowContainer.appendChild(yellowInput);

  // Append the red and yellow containers to the controls div
  controls.appendChild(redContainer);
  controls.appendChild(yellowContainer);

  // Optionally, append the controls div to the body or another parent container
  document.body.appendChild(controls);

  // Append the disc choices to the controls section
  controls.appendChild(redContainer);
  controls.appendChild(yellowContainer);
  gameBoard.appendChild(controls); // Add controls to the game board

  // Add a status message (h3) below the board for displaying the current turn or winner
  const status = document.createElement("h3");
  gameBoard.appendChild(status);
  gameBoard.appendChild(resetButton);
};

document.addEventListener("DOMContentLoaded", createConnect4Board());

let array = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
];

let currentPlayer = 1;
let currentPlayerName = "player one";
let playerOne = "player one";
let playerTwo = "player two";
let playerOneColor = "red";
let playerTwoColor = "yellow";

let currentColor = playerOneColor;
let islock = false;

function toggleplayer() {
  currentPlayer = 3 - currentPlayer;
  console.log(`player ${currentPlayer}`);
if(currentPlayer==1){
  currentColor="yellow"
}else {
    currentPlayer="red"
}
}
const waitForAnimation = (duration) => {
    return new Promise((resolve) => setTimeout(resolve, duration))
}

function onClick(event) {
  console.log(event);
  const slot = event.target;
  console.log(slot);
  console.log(slot.dataset.column);
  const columnIndex = parseInt(slot.dataset.column);
  console.log("this is column index", columnIndex);
  const column = array.map((row) => row[columnIndex]);
  console.log("this is column", column);
  const rowIndex = column.lastIndexOf(null);
  

  array[rowIndex][columnIndex] = currentPlayer;
  const disc = document.createElement("div");
  disc.classList.add("disc", `${currentColor}Disc`);

  const targetSlot = document.querySelector(
    `.slot[data-column="${columnIndex}"][data-row="${rowIndex}"]`
  );

  console.log("this is target slot", targetSlot);

  targetSlot.classList.add(currentColor);

  toggleplayer();
}
  document.querySelectorAll(".slot").forEach((slot) => {
    slot.addEventListener("click", onClick);
    console.log("slot is spiked");
  });

