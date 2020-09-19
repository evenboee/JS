class Food {
	constructor() {
		this.pos = new Pos();
	}

	pickSpot() {
		this.pos.x = Math.floor(Math.random()*width);
		this.pos.y = Math.floor(Math.random()*height);
		let i = -1, found = false;
		while (++i < snake.snake.length && !found) found = (snake.snake[i].x == this.pos.x && snake.snake[i].y == this.pos.y);
		if (found) {console.log("Redo");this.pickSpot();}
	}

	show() {
		let ele = document.createElement("div");
		ele.setAttribute("class", "food");
		ele.setAttribute("style", "width:" + scale + "px;height:" + scale + "px;top:" + (this.pos.y * scale) + "px;left:" + (this.pos.x * scale) + "px;");
		$("canvas").appendChild(ele);
	}
}