import { Game } from '../src/index';

// initialize test game configuration
const game = Game.prototype.initializeGame();
game.moveSelected(
  game.board[6][0], { y: 5, x: 0 }, ()=>{}, ()=>{}, false, false
)

game.moveSelected(
  game.board[1][4], { y: 3, x: 4 }, ()=>{}, ()=>{}, false, false
)

console.log(game.all_moves().length);