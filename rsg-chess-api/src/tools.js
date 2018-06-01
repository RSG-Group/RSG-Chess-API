export const uncycleBoard = boardObject => {
  const board = []

  for (let i = 0; i < boardObject.length; i++) {
    let row = []
    for (let j = 0; j < boardObject[i].length; j++) {
      if (boardObject[i][j]) {
        row.push({
          char: boardObject[i][j].char,
          color: boardObject[i][j].color,
          x: boardObject[i][j].x,
          y: boardObject[i][j].y,
          type: boardObject[i][j].type,
          FENname: boardObject[i][j].FENname
        })
      } else {
        row.push(null)
      }
    }
    board.push(row)
  }

  return board
}

export const uncycleTurns = turnObject => {
  const turns = []

  turnObject.map(ev => {
    let move = {}
    move.from = ev.from
    move.to = ev.to
    move.color = ev.color
    move.type = ev.type
    move.piece = null
    move.movePiece = null
    if (ev.piece) {
      move.piece = {
        char: ev.piece.char,
        color: ev.piece.color,
        x: ev.piece.x,
        y: ev.piece.y,
        type: ev.piece.type,
        FENname: ev.piece.FENname
      }
    }
    if (ev.movePiece) {
      move.movePiece = {
        from: ev.movePiece.from,
        to: ev.movePiece.to,
        piece: {
          char: ev.movePiece.piece.char,
          color: ev.movePiece.piece.color,
          x: ev.movePiece.piece.x,
          y: ev.movePiece.piece.y,
          type: ev.movePiece.piece.type,
          FENname: ev.movePiece.piece.FENname
        }
      }
    }

    turns.push(move)
  })

  return turns
}

export const stringifyBoard = board => {
  var uncycled = uncycleBoard(board)
  var stringified = JSON.stringify(uncycled)
  return stringified
}

export const stringifyTurns = turn => {
  var uncycled = uncycleTurns(turn)
  var stringified = JSON.stringify(uncycled)
  return stringified
}
