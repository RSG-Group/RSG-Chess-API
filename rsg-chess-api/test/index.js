import { Game, AI } from '../src/index'

// initialize game test
const game = Game.prototype.initializeGame()

// piece movement and pawn promotion tests
game.moveSelected(game.board[6][0], { y: 5, x: 0 }, () => {}, () => {}, false, false)
game.moveSelected(game.board[5][0], { y: 4, x: 0 }, () => {}, () => {}, false, false)
game.moveSelected(game.board[4][0], { y: 3, x: 0 }, () => {}, () => {}, false, false)
game.moveSelected(game.board[3][0], { y: 2, x: 0 }, () => {}, () => {}, false, false)
game.moveSelected(game.board[2][0], { y: 1, x: 1 }, () => {}, () => {}, false, false)
game.moveSelected(game.board[1][1], { y: 0, x: 0 }, () => { console.log('Promotion succeeded!') }, () => {}, false, false)

// AI tests
const bestAI = new AI(4, game, true)
console.log('The output from our AI API:')
console.log(bestAI)
