import { Game } from '../src/index';

// initialize test game configuration
const game = Game.prototype.initializeGame();
game.moveSelected(
  game.board[1][1], {y: 2, x: 1}, ()=>{}, ()=>{}, false, false
)

game.moveSelected(
  game.board[7][1], { y: 5, x: 0 }, ()=>{}, ()=>{}, false, false
)

console.log(game.FEN);