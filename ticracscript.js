class Move
{
	constructor()
	{
		let row,col;
	}
}

function getBoard() {
	let game_board = [];
	for(let i=0;i<3;i++) {
	  erow = []
	  for(let j=0;j<3;j++) {
		if(btnRef[3*i+j].innerText == 'x' || btnRef[3*i+j].innerText == 'o') {
		erow.push(btnRef[3*i+j].innerText)
		}
		else {
		  erow.push('_')
		}
	  }
	  game_board.push(erow);
	}
	return game_board;
  }

let player = 'o', opponent = 'x';

function isMovesLeft(board)
{
	for(let i = 0; i < 3; i++)
		for(let j = 0; j < 3; j++)
			if (board[i][j] == '_')
				return true;
				
	return false;
}

function evaluate(b)
{
	
	// Checking for Rows for X or O victory.
	for(let row = 0; row < 3; row++)
	{
		if (b[row][0] == b[row][1] &&
			b[row][1] == b[row][2])
		{
			if (b[row][0] == player)
				return +10;
				
			else if (b[row][0] == opponent)
				return -10;
		}
	}

	// Checking for Columns for X or O victory.
	for(let col = 0; col < 3; col++)
	{
		if (b[0][col] == b[1][col] &&
			b[1][col] == b[2][col])
		{
			if (b[0][col] == player)
				return +10;

			else if (b[0][col] == opponent)
				return -10;
		}
	}

	// Checking for Diagonals for X or O victory.
	if (b[0][0] == b[1][1] && b[1][1] == b[2][2])
	{
		if (b[0][0] == player)
			return +10;
			
		else if (b[0][0] == opponent)
			return -10;
	}

	if (b[0][2] == b[1][1] &&
		b[1][1] == b[2][0])
	{
		if (b[0][2] == player)
			return +10;
			
		else if (b[0][2] == opponent)
			return -10;
	}

	// Else if none of them have
	// won then return 0
	return 0;
}

// This is the minimax function.
function minimax(board, depth, isMax)
{
	let score = evaluate(board);

	// If Maximizer has won the game
	// return his/her evaluated score
	if (score == 10)
		return score;

	// If Minimizer has won the game
	// return his/her evaluated score
	if (score == -10)
		return score;

	// If there are no more moves and
	// no winner then it is a tie
	if (isMovesLeft(board) == false)
		return 0;

	// If this maximizer's move
	if (isMax)
	{
		let best = -1000;

		// Traverse all cells
		for(let i = 0; i < 3; i++)
		{
			for(let j = 0; j < 3; j++)
			{
				
				// Check if cell is empty
				if (board[i][j]=='_')
				{
					
					// Make the move
					board[i][j] = player;

					// Call minimax recursively
					// and choose the maximum value
					best = Math.max(best, minimax(board,
									depth + 1, !isMax));

					// Undo the move
					board[i][j] = '_';
				}
			}
		}
		return best;
	}

	// If this minimizer's move
	else
	{
		let best = 1000;

		// Traverse all cells
		for(let i = 0; i < 3; i++)
		{
			for(let j = 0; j < 3; j++)
			{
				
				// Check if cell is empty
				if (board[i][j] == '_')
				{
					
					// Make the move
					board[i][j] = opponent;

					// Call minimax recursively and
					// choose the minimum value
					best = Math.min(best, minimax(board,
									depth + 1, !isMax));

					// Undo the move
					board[i][j] = '_';
				}
			}
		}
		return best;
	}
}

function findBestMove(board)
{
	let bestVal = -1000;
	let bestMove = new Move();
	bestMove.row = -1;
	bestMove.col = -1;

	// Traverse all cells, evaluate
	// minimax function for all empty
	// cells. And return the cell
	// with optimal value.
	for(let i = 0; i < 3; i++)
	{
		for(let j = 0; j < 3; j++)
		{
			
			// Check if cell is empty
			if (board[i][j] == '_')
			{
				
				// Make the move
				board[i][j] = player;

				// compute evaluation function
				// for this move.
				let moveVal = minimax(board, 0, false);

				// Undo the move
				board[i][j] = '_';

				// If the value of the current move
				// is more than the best value, then
				// update best
				if (moveVal > bestVal)
				{
					bestMove.row = i;
					bestMove.col = j;
					bestVal = moveVal;
				}
			}
		}
	}

	return bestMove;
}

let pvpbutton = document.getElementById("p");
let pvcbutton = document.getElementById("pp");
let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
// let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");
//Winning Pattern Array
let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];
//Player 'X' plays first
let xTurn = true;
let count = 0;
let pvc = true;

//Disable All Buttons
const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
  //enable popup
  popupRef.classList.remove("hide");
};

//Enable all buttons (For New Game and Restart)
const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  //disable popup
  popupRef.classList.add("hide");
};

//This function is executed when a player wins
const winFunction = (letter) => {
  disableButtons();
  if (letter == 'x') {
    msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";
  } else {
    msgRef.innerHTML = "&#x1F389; <br> 'O' Wins";
  }
};

//Function for draw
const drawFunction = () => {
  disableButtons();
  msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
};

function removehandler() {
	btnRef.forEach((element) => {
		element.removeEventListener("click", ()=>{console.log("Removed handler");});
	});
}

//New Game
restartBtn.addEventListener("click", () => {
  count = 0;
  disableButtons();
  msgRef.innerHTML = "";
  btnRef.forEach((item)=>{
	item.innerHTML=""
  })
  console.log(btnRef.innerHTML)
//   	Btn.style.display = "none";
});
pvcbutton.addEventListener("click", ()=>{
	count = 0;
	enableButtons();
	pvc = true;
});
pvpbutton.addEventListener("click", ()=>{
	count = 0;
	enableButtons();
	pvc = false;
});
//Win Logic
const winChecker = () => {
  //Loop through all win patterns
  for (let i of winningPattern) {
    let [element1, element2, element3] = [
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,
    ];
    //Check if elements are filled
    //If 3 empty elements are same and would give win as would
    if (element1 != "" && (element2 != "") & (element3 != "")) {
      if (element1 == element2 && element2 == element3) {
        //If all 3 buttons have same values then pass the value to winFunction
        winFunction(element1);
      }
    }
  }
};

//Display X/O on click
btnRef.forEach((element) => {
	element.addEventListener("click", () => {
	if(pvc) {
	  //Display X
	  element.innerText = 'x';
	  element.disabled = true;
	  let Board = getBoard();
	  let bestMove = findBestMove(Board);
	  btnRef[bestMove.row*3 + bestMove.col].innerText = 'o';
	  //Increment count on each click
	  count += 2;
	  if (count >= 9) {
		drawFunction();
	  }
	  //Check for win on every click
	  winChecker();
	}
	else {
		if (xTurn) {
			//Display X
			element.innerText = 'x';
			element.disabled = true;
			xTurn = false;
		  }
		  else{
			  //Display Y
			  element.innerText = 'o';
			  element.disabled = true;
			  xTurn = true;
		  }
		  //Increment count on each click
		  count += 1;
		  if (count == 9) {
			drawFunction();
		  }
		  //Check for win on every click
		  winChecker();
	}
	});
  });
//Enable Buttons and disable popup on page load
window.onload = disableButtons;