const boxes = document.querySelectorAll('.box');
const resetButton = document.querySelector('#reset-button');

class Game {
	constructor(boxes, resetButton) {
		this.boxes = boxes;
		this.resetButton = resetButton;
		this.turn = 0;
		this.board = [
			'_', '_', '_',
			'_', '_', '_',
			'_', '_', '_'
		];

		this.addListeners();
	}

	addListeners() {
		this.boxes.forEach(box => {
			box.addEventListener('click', this.addSymbol.bind(this));
		})

		this.resetButton.addEventListener('click', this.reset.bind(this));
	}

	addSymbol(event) {
		// Ignore if 'X' or 'O' already
		if(event.target.textContent !== '_') {
			return;
		}

		// Add 'X' or 'O'
		if(this.turn % 2 !== 0) {
			event.target.textContent = 'X';
		}
		else {
			event.target.textContent = 'O';
		}

		// Toggle turn
		this.turn += 1;

		// Update board
		this.boxes.forEach((box, index) => {
			if(box.textContent === 'X' || box.textContent === 'O') {
				this.board[index] = box.textContent;
			}
			else {
				this.board[index] = '_';
			}
		});

		this.checkGameOver();
	}

	checkGameOver() {
		const winningLines =[
			// Rows
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			// Columns
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			// Diagonals
			[0, 4, 8],
			[2, 4, 6]
		];

		for(let i = 0; i < winningLines.length; i++) {
			// console.log(winningLines[i]);
			let sequence = [];

			for(let j = 0; j < winningLines[i].length; j++) {
				// console.log('i',winningLines[i]);
				// console.log('j',winningLines[i][j]);
				// console.log(this.board[winningLines[i][j]]);
				sequence.push(this.board[winningLines[i][j]]);
			}
			console.log(sequence);

			const checkWinner = sequence.every((character, index, array) => {
				// console.log({character, index, array});
				return character === array[0] && character !== '_';
			});

			if(checkWinner) {
				this.reset();
				return;
			}
		}

		const checkFullBoard = Array.from(this.boxes).every(box => {
			return box.textContent === 'X' || box.textContent === 'O';
		})
		if(checkFullBoard) {
			this.reset();
			return;
		}
	}

	reset() {
		console.log('resetting');
		this.boxes.forEach(box => {
			box.textContent = '_';
		});
	}
}

const game = new Game(boxes, resetButton);