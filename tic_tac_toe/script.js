var td = document.querySelectorAll("td");
var resetButton = document.getElementById("reset"); 
var oneVsOneButton = document.getElementById("1vs1");
var againstComputerButton = document.getElementById("computer");
var turn = false , count = 0 , state = " ";
var Me = "X" , Computer = "O";
var Board = Array.from(Array(9).keys());

resetButton.addEventListener('click',function(){
	Reset();
	state = "Reset"; 
});

oneVsOneButton.addEventListener('click',function(){
	Reset();
	state = "1VS1";
	addEventActionFrom_xORoFunction();	
});
againstComputerButton.addEventListener('click',function()
{
	Reset();
	state = "againstComp";
	addEventActionFrom_xORoFunction();
});

function xORo(e)
{
	if(e.type === "click")
		e = e.currentTarget;
	if(e.textContent != Computer && e.textContent != Me )
	{
			e.classList.toggle('help');
			count++;
			var ia = Number(e.id); 
			!turn ? e.textContent = Me : e.textContent = Computer;
			!turn ? Board[ia] = Me : Board[ia] = Computer;
			turn=!turn;

			if(checkIfWinner(Board , Board[ia])){
				setTimeout(()=>alert("Player " + (turn? 'X' : 'O') + " Winner"), 250);
				removeEventActioFrom_xORoFunction();
			}
			else if(td.length === count)
				setTimeout(()=>alert("Draw"),150);
			if(state === "againstComp" && turn === true)
				setTimeout(()=>xORo(td[minimax(Board,Computer).index]),250);
		}
}

function Reset()
{
	turn = false;
	count = 0;
	td.forEach(function(a){
		a.textContent = " ";
		a.classList.remove('help');
	});
	removeEventActioFrom_xORoFunction();
	Board = Array.from(Array(9).keys()); 
}

function addEventActionFrom_xORoFunction()
{
	for(var i=0;i<td.length;i++)
		 td[i].addEventListener('click',xORo);

}
function removeEventActioFrom_xORoFunction(){
	for(let i=0;i<td.length;i++)
			td[i].removeEventListener('click',xORo);
}

// miniMax algo
function emptyIndexies(B)
{
  return B.filter(s => s != "O" && s!='X');
}

function checkIfWinner(board , player)
{	if(board[0]===player&&board[1]===player&&board[2]===player||
	    board[0]===player&&board[3]===player&&board[6]===player||
		board[0]===player&&board[4]===player&&board[8]===player||
		board[1]===player&&board[4]===player&&board[7]===player||
		board[2]===player&&board[5]===player&&board[8]===player||
		board[3]===player&&board[4]===player&&board[5]===player||
		board[6]===player&&board[7]===player&&board[8]===player||
		board[2]===player&&board[4]===player&&board[6]===player)
			return true;
	return false;
}

function minimax(newBoard, player) {

	var availSpots = emptyIndexies(newBoard);

	if (checkIfWinner(newBoard, Me)) {
		return {score: -10};
	} else if (checkIfWinner(newBoard, Computer)) {
		return {score: 10};
	} else if (availSpots.length === 0) {
		return {score: 0};
	}
	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;

		if (player == Computer) {
			var result = minimax(newBoard, Me);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, Computer);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;

		moves.push(move);
	}

	var bestMove;
	if(player === Computer) {
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}

