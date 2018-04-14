//
// RSG Chess
// Licensed under Apache 2.0 LICENSE

import Game from './game.js'

const ChessAI = function (depth, gameState, isMaximisingPlayer) {
  // Clone the gameState to access all game associated methods.
  // This usually doesn't make sense, but sometimes you cannot post functions to a backend or a web-worker
  // and that's why we're touching the game methods from new game configuration intead from the passed argument.
  // So if you pass {board: [myBoard], turn:[myTurn],...} for the game argument it will actually work!
  // Already described here: https://github.com/RSG-Group/Chess/issues/8#issuecomment-381245794
  var game = Game.prototype.initializeGame()
  game.board = gameState.board
  game.turn = gameState.turn
  game.threefold = gameState.threefold
  game.FEN = gameState.FEN
  game.FENboard = gameState.FENboard

  // Start looping and simulating all valid moves
  var allMoves = game.allMoves()
  var bestValue = -9999
  var bestMove

  for (var i = 0; i < allMoves.length; i++) {
    var newGameMove = allMoves[i]
    var undo = game.simpleMove(newGameMove)
    var boradValue = minimax(depth - 1, game, -10000, 10000, !isMaximisingPlayer)
    undo()
    if (boradValue >= bestValue) {
      bestValue = boradValue
      bestMove = newGameMove
    }
  }
  return bestMove
}

var minimax = function (depth, game, alpha, beta, isMaximisingPlayer) {
  if (depth === 0) {
    return -evaluateBoard(game.board)
  }

  var allMoves = game.allMoves()
  if (isMaximisingPlayer) {
    let bestValue = -9999
    for (let i = 0; i < allMoves.length; i++) {
      let undo = game.simpleMove(allMoves[i])
      bestValue = Math.max(bestValue, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer))
      undo()
      alpha = Math.max(alpha, bestValue)
      if (beta <= alpha) {
        return bestValue
      }
    }
    return bestValue
  } else {
    let bestValue = 9999
    for (let i = 0; i < allMoves.length; i++) {
      let undo = game.simpleMove(allMoves[i])
      bestValue = Math.min(bestValue, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer))
      undo()
      beta = Math.min(beta, bestValue)
      if (beta <= alpha) {
        return bestValue
      }
    }
    return bestValue
  }
}

var evaluateBoard = function (board) {
  var totalEvaluation = 0
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      // calculate the current evaluation
      totalEvaluation = totalEvaluation + getPieceValue(board[i][j])
    }
  }
  // return the total evaluation
  return totalEvaluation
}

var getPieceValue = function (piece) {
  if (piece === null) {
    return 0
  }

  // get value for every piece on the board
  var getAbsoluteValue = function (piece) {
    if (piece.type === 'pawn') {
      return 10
    } else if (piece.type === 'rook') {
      return 50
    } else if (piece.type === 'knight') {
      return 30
    } else if (piece.type === 'bishop') {
      return 30
    } else if (piece.type === 'queen') {
      return 90
    } else if (piece.type === 'king') {
      return 900
    }
  }

  // calculate the absolute value and return it
  var absoluteValue = getAbsoluteValue(piece, piece.color === 'W')
  return piece.color === 'W' ? absoluteValue : -absoluteValue
}

// export the algorithm
export default ChessAI

// Written by Radi Cho
// RSG Chess - by RSG Group
