import { Piece }    from './pieces.js';
import Chess_AI from './AI.js';

function Game(promoCallback) {
  // the game board
  this.board = [];
  // fill the board
  for (var i = 0; i < 8; i++) {
    var arrayIn = [];
    for (var j = 0; j < 8; j++) {
      arrayIn.push(null);
    }
    this.board.push(arrayIn);
  }

  // the history of all turns
  this.turn = [];
  // the current FEN status
  this.FEN = [];
  // the current game configuration as FEN
  this.FENboard = [];
  // the history of all game configurations displayed using FEN
  this.threefold = [];
}

Game.prototype.piece = function (type, x, y, color) {
  var piece = Piece[type](x, y, color, this);
  this.board[y][x] = piece;

  this.FEN = this.gameToFEN();
  this.FENboard = this.boardToFEN();
};

Game.prototype.moveSelected = function (
  selected, to, promotionCallback, checkmateCallback, playAgainstAI, simulate
) {
  var x = to.x;
  var y = to.y;

  if (selected) {
    var from = { x: selected.x, y: selected.y };

    if (this.board[y][x] != selected) {
      var validMoves = selected.getValidMoves(!simulate);
      var validMove = null;
      for (var i = 0; i < validMoves.length; i++) {
        var vm = validMoves[i];
        if (vm.x === x && vm.y === y ) {
          validMove = vm;
          break;
        }
      }

      if (!validMove) return false;
      
      var movePiece = validMove.movePiece;
      var take, paste, rook;
      if (movePiece) {
        take = movePiece.from;
        paste = movePiece.to;
        if (paste === null){
          this.board[take.y][take.x] = null;
        }else{
          rook = this.board[take.y][take.x];
          this.board[paste.y][paste.x] = rook;
          rook.x = paste.x;
          rook.y = paste.y;
          this.board[take.y][take.x] = null;
        }
      }
      
      var piece = this.board[y][x] ? this.board[y][x] : null;
      var movePiece = (movePiece ? validMove.movePiece : null);
      this.turn.push({
        from: from, to: to,
        color: selected.color, type: selected.type,
        piece: piece, movePiece: movePiece
      });
      
      this.board[y][x] = selected;
      this.board[selected.y][selected.x] = null;
      this.board[y][x].x = x;
      this.board[y][x].y = y;

      this.FEN = this.gameToFEN();
      this.FENboard = this.boardToFEN();
      
      // check for threefold repetition
      this.threefold.push(this.FENboard);
      if (selected.type === 'pawn' || piece) this.threefold = [];
      if(this.threefoldCheck()) checkmateCallback('D');

      // check for the fifty-move rule
      if (this.halfmoveClock() >= 50) checkmateCallback('D');

      // check for pawn promotion
      if (selected.type === "pawn") {
        if ((selected.color === "W" && y === 0) || (selected.color === "B" && y === 7)) {
          if(promotionCallback) {
            !playAgainstAI && selected.color === "B" ?
              this.promotePawn(selected, x, y, selected.color, "queen"):
              promotionCallback(selected, x, y, selected.color);
          }
        }
      };
      
      var checkmateColor = selected.color === 'W' ? 'B' : 'W';
      var checkmateValue = this.checkmate(checkmateColor);
      if(checkmateValue) checkmateCallback(checkmateValue);

      // Play AI
      if (playAgainstAI) {
        var bestMove = Chess_AI(this);
        this.moveSelected(
          this.board[bestMove.from.y][bestMove.from.x],
          bestMove.to,
          promotionCallback,
          checkmateCallback,
          false,
          simulate
        )
      }
      // end
    }
    selected = null;
    return true;
  }
};

Game.prototype.promotePawn = function (pawn, x, y, color, type) {
  this.piece(type, x, y, color);
};

Game.prototype.simulateAndFilter = function (moves, piece) {
  var validMoves = [], self = this, turn = self.turn, board = this.board;
  moves.forEach(function (move, i) {
    var y = move.y;
    var x = move.x;
    var from = { x: piece.x, y: piece.y };
    var movePiece = board[y][x] ? {
      piece: board[y][x],
      from: { x: x, y: y },
      to: null
    } : null;
    if(move.movePiece) movePiece = move.movePiece;

    if(movePiece) self.simpleMovePiece(movePiece.piece, movePiece.from, movePiece.to);

    self.simpleMovePiece(piece, from, { x: x, y: y });

    var warning = self.warning(piece.color);

    // Return king
    self.simpleMovePiece(piece, { x: x, y: y }, from);

    // return the movePiece with simpleMovePiece() method
    if(movePiece) self.simpleMovePiece(movePiece.piece, movePiece.to, movePiece.from);
    
    if (!warning) validMoves.push(move);
  });
  return validMoves;
}

Game.prototype.checkmate = function(color){
  // using let will allow us to make the code a bit simpler
  for(let i = 0; i < 8; i++){
		for(let j = 0; j < 8; j++){
			if (
        this.board[i][j] &&
        this.board[i][j].color === color &&
        this.board[i][j].getValidMoves(true).length
      ) return false;
		}
  }
  
  if (this.warning(color)) return color;
	return 'D';
}

Game.prototype.simpleMovePiece = function(piece, from, to){
  var board = this.board;
  if(to) {
    board[to.y][to.x] = piece;
    piece.x = to.x;
    piece.y = to.y;
  }
  if(from) board[from.y][from.x] = null;
}

Game.prototype.warning = function (color) {
  var result = false;
  var king;

  this.board.forEach(function(yyy){
    yyy.forEach(function(xxx){
      if(xxx && xxx.color === color && xxx.type === "king") {
        king = xxx;
      }
    })
  })

  this.board.forEach(function(yyy){
    yyy.forEach(function(xxx){
      if(xxx && xxx.color !== color) {
        xxx.getValidMoves().forEach(function(mmm){
          if(mmm.x === king.x && mmm.y === king.y) result = true;
        })
      }
    })
  })
  return result;
};

Game.prototype.threefoldCheck = function () {
  var threefold = this.threefold;
  var length = threefold.length;

  for(var i = 0; i < length; i++){
    // using let will allow us to make the code simpler
    let count = 0;
    for (var j = i + 1; j < length; j++) {
      if(threefold[i] === threefold[j]) count += 1;
    }
    if(count >= 2) return true;
  }
  
  return false;
}

Game.prototype.pieceToAN = function(x, y) {
  var xChars = 'abcdefgh';
  return xChars.charAt(x) + (8 - y);
}

// Support FEN functions in the API
Game.prototype.boardToFEN = function () {
  var board = this.board;
 
  // Convert the board configuration into FEN
  var FENboard = '';
  var missingPieces = 0;
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      if(board[i][j]) {
        if (missingPieces) FENboard += missingPieces;
        missingPieces = 0;
        FENboard += board[i][j].FENname;
      } else {
        missingPieces++;
      }
    }
    if (missingPieces) FENboard += missingPieces;
    missingPieces = 0;    
    FENboard += i < 7 ? '/' : '';
  }
 
  return FENboard;
};

Game.prototype.halfmoveClock = function () {
  var turn = this.turn;
  var length = turn.length;
  var count = 0;
  if (turn.length === 0) return count;

  var ev = turn[(length - 1) - count];
  while(count <= length - 1 && ev.type !== 'pawn' && !ev.piece){
    count++;
    ev = turn[(length - 1) - count]; 
  }

  return count;
}

Game.prototype.activeColour = function () {
  var activeColor =
    turn.length &&
    turn[turn.length - 1].color === 'W' ? 'b' : 'w';

  return activeColor;
}

Game.prototype.castlingTarget = function () {
  var possibleCastling = '';
 
  var whiteKingMoved;
  var blackKingMoved;
  turn.some(function (turn) {
    whiteKingMoved = turn.type === 'king' && turn.color === 'W';
    blackKingMoved = turn.type === 'king' && turn.color === 'B';
  });
 
  [[7, 0], [0, 0], [7, 7], [0, 7]].forEach(function (props) {
    var rookX = props[0];
    var rookY = props[1];
    var rook = board[rookY][rookX];
 
    // Check rook on position
    if (!rook || !rook.type === 'rook') return;
    // Check rook hasn't moved
    if (turn.some(function (ev) {
      return ev.from.x === rookX && ev.from.y === rookY;
    })) return;
 
    var castlingSide = rookX === 0 ? 'q' : 'k';
    possibleCastling += rookY === 0 ? castlingSide.toUpperCase() : castlingSide;
  });
 
  if (!possibleCastling) possibleCastling = '-';
  return possibleCastling;
}

Game.prototype.enPassantTarget = function () {
  var enPassantTarget = '';

  if (turn.length) {
    var ev = turn[turn.length - 1];
    if (ev.color === 'W' && ev.to.y === 4){
      enPassantTarget = this.pieceToAN(ev.to.x, ev.to.y + 1)
    }
    
    if (ev.color === 'B' && ev.to.y === 3){
      enPassantTarget = this.pieceToAN(ev.to.x, ev.to.y - 1)
    }
  }

  if (!enPassantTarget) enPassantTarget = '-';
  return enPassantTarget;
}

Game.prototype.gameToFEN = function () {
  // Check the board configuration
  FEN += this.boardToFEN();
 
  // Find the active colour
  FEN += ' ' + this.activeColour();
  
  // Check castling availability
  FEN += ' ' + this.castlingTarget();
 
  // Check the En-passant target
  FEN += ' ' + this.enPassantTarget();

  // Add the halfmove clock
  FEN += ' ' + this.halfmoveClock();

  /*
    More information about the FEN notation:
    https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation
    https://chessprogramming.wikispaces.com/Forsyth-Edwards+Notation
  */
 
  return FEN;
};

// Set up default game configuration
Game.prototype.initializeGame = function() {
  var defaultGame = new Game();

  // Pawns:
  for (var i = 0; i < 8; i++) {
    defaultGame.piece('pawn', i, 6, 'W');
    defaultGame.piece('pawn', i, 1, 'B');
  }
  
  // Black figs:
  defaultGame.piece('rook', 0, 0, 'B');
  defaultGame.piece('knight', 1, 0, 'B');
  defaultGame.piece('bishop', 2, 0, 'B');
  defaultGame.piece('queen', 3, 0, 'B');
  defaultGame.piece('king', 4, 0, 'B');
  defaultGame.piece('bishop', 5, 0, 'B');
  defaultGame.piece('knight', 6, 0, 'B');
  defaultGame.piece('rook', 7, 0, 'B');
  
  // White figs:
  defaultGame.piece('rook', 0, 7, 'W');
  defaultGame.piece('knight', 1, 7, 'W');
  defaultGame.piece('bishop', 2, 7, 'W');
  defaultGame.piece('queen', 3, 7, 'W');
  defaultGame.piece('king', 4, 7, 'W');
  defaultGame.piece('bishop', 5, 7, 'W');
  defaultGame.piece('knight', 6, 7, 'W');
  defaultGame.piece('rook', 7, 7, 'W');

  return defaultGame;
}

export default Game;