const canvas = document.querySelector("#gamefield")
const ctx = canvas.getContext("2d")

class gameoflife {

	constructor() {

		// cell size
		this.cell_size = 5;

		// dead color
		this.dead_color = `#181818`;

		// alive color
		this.alive_color = `#210f83`;

		// active array
		this.active_field = [];

		// inactive array
		this.inactive_field = [];

		// cells in row
		this.cols = Math.floor(canvas.width / this.cell_size);

		// cells in column
		this.rows = Math.floor(canvas.height / this.cell_size);
	}

	start() {
		this.initialize();
	}

	run() {
		this.updateField();
		this.fillColor();
	}

	initialize() {
		for (let i = 0; i < this.rows; i++) {
			this.active_field[i] = [];
			for (let j = 0; j < this.cols; j++) {
				this.active_field[i][j] = 0;
			}
		}

		this.inactive_field = this.active_field;
	}


	randomFill() {
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				let prob = Math.random();
				if (prob > 0.92) {
					this.active_field[i][j] = 1;
				}
				else {
					this.active_field[i][j] = 0;
				}
			}
		}
	}

	fillColor() {
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				let color;
				if (this.active_field[i][j] == 1) {
					color = this.alive_color;
				}
				else {
					color = this.dead_color;
				}

				ctx.fillStyle = color;
				// fillRect( xpos, ypos, width, height )
				ctx.fillRect(j * this.cell_size, i * this.cell_size, this.cell_size, this.cell_size);
			}
		}
	}

	setCellHelper(row, col) {
		try {
			return this.active_field[row][col];
		}
		catch {
			return 0;
		}
	}
	

	countNeighbors(row, col) {
		let total_neighbors = 0;
		for (let i = row - 1; i <= row + 1; i++) {
			for (let j = col - 1; j <= col + 1; j++) {
				total_neighbors += this.setCellHelper(i, j);
			}
		} 
		return total_neighbors;
	}

	updateCell(row, col) {
		const total = this.countNeighbors(row, col);

		if (total > 4 || total < 3) {
			return 0;
		}
		else if (this.active_field[row][col] == 0 && total == 3) {
			return 1;
		}
		else {
			return this.active_field[row][col];
		}
	}

	updateField() {
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				let new_state = this.updateCell(i, j);
				this.inactive_field[i][j] = new_state;
			}
		}

		this.active_field = this.inactive_field;
	}
}


const game = new gameoflife();
game.start();
let pause = true;
const click = document.querySelector('#gameoflife').addEventListener("click", () => {
	if (pause) {
		pause = false;
		game.randomFill();
		game.fillColor();
		window.setInterval(() => {
			game.run();

		}, 50)
		document.querySelector('#gameoflife').innerHTML = "Click to stop";
	}
	else {
		game.start();
		pause = true;
		document.querySelector('#gameoflife').innerHTML = "Click to restart";
	}
});

