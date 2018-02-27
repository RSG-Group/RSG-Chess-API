import { Game } from '../src/index';
import { AI } from '../src/index';

// initialize test game configuration
const game = Game.prototype.initializeGame();
game.moveSelected(
  game.board[6][0], { y: 5, x: 0 }, ()=>{}, ()=>{}, false, false
)

const bestAI = new AI(game);

console.log(game.allMoves().length);
console.log(bestAI);