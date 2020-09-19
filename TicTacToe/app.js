const $ = id => document.getElementById(id);

const table = $("table");
let board = [
	['', '', ''],
	['', '', ''],
	['', '', '']
];
const players = ["X", "O"];
let count = 0;

let finished = false;

window.onload = ()=> makeBoard();

function makeBoard() {
	table.innerHTML = "";
	for (let i in board) {
		let tr = document.createElement("tr");
		for (let z in board[i]) {
			let td = document.createElement("td");
			td.setAttribute("id", i + "-" + z);
			td.setAttribute("onclick", "place(" + z + ", " + i + ")");
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
	update();
}

function update() {
	for (let y in board) {
		for (let x in board[y]) {
			$(y + "-" + x).innerHTML = board[y][x];
		}
	}
}

function place(x, y) {
	if (!finished && board[y][x] == '') {
		count++;
		board[y][x] = players[(count-1)%players.length];
		$("turn").innerHTML = "Next move: " + players[(count)%players.length];
		check();
		update();
	}
}

function check() {
	let full = true;
	if (board[0][0] != '' && board[0][0] == board[1][1] && board[1][1] == board[2][2]) {win(players[count%players.length], [[0,0],[1,1],[2,2]]);}
	else if (board[0][2] != '' && board[0][2] == board[1][1] && board[1][1] == board[2][0]) {win(players[count%players.length], [[0,2],[1,1],[2,0]]);}
	else {
		for (let i in board) {
			if (board[0][i] != '' && board[0][i] == board[1][i] && board[1][i] == board[2][i]) {win(players[count%players.length], [[0,i],[1,i],[2,i]]);}
			if (board[i][0] != '' && board[i][0] == board[i][1] && board[i][1] == board[i][2]) {win(players[count%players.length], [[i,0],[i,1],[i,2]]);}
			for (let z in board[i]) if (board[i][z] == '') full = false;
		}
	}

	if (!finished && full) win("Noone");
}

function win(player, spots = []) {
	$("turn").innerHTML = player + " wins! Turns: " + count + "<br /> <button onclick=\"restart()\">Restart</button>";
	for (let i in spots) {
		$(spots[i][0] + "-" + spots[i][1]).style.backgroundColor = "#ff0";
	}
	finished = true;
}

function restart() {
	board = [
		['', '', ''],
		['', '', ''],
		['', '', '']
	];
	count = 0;
	finished = false;
	update();
	$("turn").innerHTML = "Next move: " + players[(count)%players.length];
	for (let i in board) for (let z in board[i]) $(i + "-" + z).style.backgroundColor = "#fff";
}