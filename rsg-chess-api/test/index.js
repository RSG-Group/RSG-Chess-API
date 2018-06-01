import { Game, AI, Pieces, tools } from '../src/index'

// Pieces test
console.log('\nTesting the Pieces API... \nThese are all supported piece characters:')
console.log(Pieces.PIECE_CHARS)

if (Pieces.PIECE_CHARS.queen.black === '♚') {
  console.log('The PIECE_CHARS test succeded.')
} else {
  console.log('The PIECE_CHARS test did not succed.')
}

// initialize game test
const game = Game.prototype.initializeGame()

// piece movement and pawn promotion tests
console.log('\nTesting the pawn promotion...')

game.moveSelected(game.board[6][0], { y: 5, x: 0 }, () => {}, () => {}, false, false)
game.moveSelected(game.board[5][0], { y: 4, x: 0 }, () => {}, () => {}, false, false)
game.moveSelected(game.board[4][0], { y: 3, x: 0 }, () => {}, () => {}, false, false)
game.moveSelected(game.board[3][0], { y: 2, x: 0 }, () => {}, () => {}, false, false)
game.moveSelected(game.board[2][0], { y: 1, x: 1 }, () => {}, () => {}, false, false)
game.moveSelected(game.board[1][1], { y: 0, x: 0 }, () => { console.log('Promotion succeeded!') }, () => {}, false, false)

// AI tests
console.log('\nTesting the AI API:')
const bestAI = new AI(4, game, true)
console.log('The output from our AI API:')
console.log(bestAI)

console.log('\nTesting the API tools... \ntools.stringifyTurns() \n')
console.log(tools.stringifyTurns(game.turn))
