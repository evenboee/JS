const $ = id => document.getElementById(id);

const width = 20,
	  height = 20,
	  fps = 10,
	  scale = 25;

let snake,
	food,
	interval,
	keyQueue = [],
	score = 0;

document.onkeydown = e => inputParser(e.keyCode);

function inputParser(e) {
	switch(e) {
		case 38:
			keyQueue.push([0, -1]);
			break;
		case 39:
			keyQueue.push([1, 0]);
			break;
		case 40:
			keyQueue.push([0, 1]);
			break;
		case 37:
			keyQueue.push([-1, 0]);
			break;
		case 32:
			snake.add();
			break;
	}
}

window.onload = ()=> {
	$("canvas").style.width = (width * scale) + "px";
	$("canvas").style.height = (height * scale) + "px";

	snake = new Snake();
	food = new Food();
	food.pickSpot();
	interval = setInterval(update, 1000/fps);
}

function update() {
	//console.time("Loop...");

	if (keyQueue.length != 0) {
		let key = keyQueue.shift();
		if (snake.dir.x != -key[0] && snake.dir.y != -key[1]) snake.setDir(key[0], key[1]);
	}

	snake.update();
	if (snake.overlaps(food.pos)) {
		snake.add();
		food.pickSpot();
		$("score").innerHTML = ++score;
	}
	if (snake.isDead()) stop();
	else {
		$("canvas").innerHTML = "";
		snake.show();
		food.show();
	}
	//console.timeEnd("Loop...");
}

function stop() {clearInterval(interval);}