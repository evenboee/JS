class Snake {
	constructor() {
		this.snake = [new Pos(1, 1), new Pos(0, 1)];
		this.dir = new Pos(0, 1);
	}

	update() {
		for (let i = this.snake.length - 1; i > 0; i--) {
			this.snake[i].x = this.snake[i-1].x;
			this.snake[i].y = this.snake[i-1].y;
		}

		this.snake[0].x += this.dir.x;
		this.snake[0].y += this.dir.y;
	}

	show() {
		for (let i in this.snake) {
			let ele = document.createElement("div");
			ele.setAttribute("class", "snake");
			ele.setAttribute("style", "width:" + scale + "px;height:" + scale + "px;top:" + (this.snake[i].y * scale) + "px;left:" + (this.snake[i].x * scale) + "px;");
			$("canvas").appendChild(ele);
		}
	}

	isDead() {
		if (this.snake[0].x < 0 || this.snake[0].x + 1 > width) return true;
		if (this.snake[0].y < 0 || this.snake[0].y + 1 > height) return true;
		for (let i = 1; i < this.snake.length; i++) if (this.overlaps(this.snake[i])) return true;
		return false;
	}

	overlaps(o, t = this.snake[0]) {
		if (Math.abs(t.x - o.x) < 1 && Math.abs(t.y - o.y) < 1) return true;
		return false;
	}

	setDir(x, y) {
		this.dir.x = x;
		this.dir.y = y;
	}

	add() {
		let last = this.snake[this.snake.length - 1];
		this.snake.push(new Pos(last.x, last.y));
	}
}