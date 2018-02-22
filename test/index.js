import { Game } from '../src/index';

// initialize test game configuration
const game = new Game();

// Initialize the pawns:
for (var i = 0; i < 8; i++) {
	game.piece('pawn', i, 6, 'W');
	game.piece('pawn', i, 1, 'B');
}

// Initialize the black figs:
game.piece('rook', 0, 0, 'B');
game.piece('knight', 1, 0, 'B');
game.piece('bishop', 2, 0, 'B');
game.piece('queen', 3, 0, 'B');
game.piece('king', 4, 0, 'B');
game.piece('bishop', 5, 0, 'B');
game.piece('knight', 6, 0, 'B');
game.piece('rook', 7, 0, 'B');

// Initialize the white figs:
game.piece('rook', 0, 7, 'W');
game.piece('knight', 1, 7, 'W');
game.piece('bishop', 2, 7, 'W');
game.piece('queen', 3, 7, 'W');
game.piece('king', 4, 7, 'W');
game.piece('bishop', 5, 7, 'W');
game.piece('knight', 6, 7, 'W');
game.piece('rook', 7, 7, 'W');

console.log(game);