//
// RSG Chess
// Licensed under Apache 2.0 LICENSE

const ChessAI = function (game) {
  var board = game.board
  var bestMove = null
  var bestValue = -9999
  game.allMoves().forEach(function (ev) {
    // Simulate the move
    var undo = game.simpleMove(ev)
    var boardValue = -evaluateBoard(board)
    if (boardValue > bestValue && board[ev.to.y][ev.to.x].color === 'B') {
      bestValue = boardValue
      bestMove = { from: ev.from, to: ev.to }
    }

    // Undo the simulated move
    undo()
  })
  // return the best move
  return bestMove
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
