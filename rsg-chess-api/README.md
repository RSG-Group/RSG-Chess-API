# RSG-Chess-API
Chess APIs based on RSG Chess

# Installation
```
// via NPM
npm install rsg-chess
// via Yarn
yarn add rsg-chess
// via CDN
<script src="https://storage.googleapis.com/rsg-chess-api/cdn/index.min.js">
```

# Usage examples
```
// ES6
import { Game, AI } from '../src/index';
const game = Game.prototype.initializeGame();
game.moveSelected(
  game.board[6][0], { y: 5, x: 0 }, () => {}, () => {}, false, false
)
...

// Node.JS
const RSGChess = require('rsg-chess');
const game = RSGChess.Game.prototype.initializeGame();
game.moveSelected(
  game.board[6][0], { y: 5, x: 0 }, () => {}, () => {}, false, false
)
...

// Standard JS
var game = RSGChess.Game.prototype.initializeGame();
// RSGChess is a global variable
game.moveSelected(
  game.board[6][0], { y: 5, x: 0 }, () => {}, () => {}, false
)
```

### [Releases and changelog](https://github.com/RSG-Group/RSG-Chess-API/releases)

# Supported functions

#### Game logic and controls
- `new Game (promoCallback)`
- `Game.prototype.initializeGame`
- `Game.prototype.piece (type, x, y, color)`
- `Game.prototype.moveSelected (selected, to, promotionCallback, checkmateCallback, simulate)`
- `Game.prototype.promotePawn (pawn, x, y, color, type)`
- `Game.prototype.simulateAndFilter (moves, piece)`
- `Game.prototype.checkmate (color)`
- `Game.prototype.simpleMovePiece (piece, from, to)`
- `Game.prototype.warning (color)`
- `Game.prototype.allMoves`

#### notations and rules
- `Game.prototype.threefoldCheck`
- `Game.prototype.halfmoveClock`
- `Game.prototype.castlingTarget`
- `Game.prototype.enPassantTarget`
- `Game.prototype.fullmoveCount`
- `Game.prototype.pieceToAN (x, y)`
- `Game.prototype.boardToFEN`
- `Game.prototype.activeColour`
- `Game.prototype.gameToFEN`

#### `Game.prototype` variables
- `game.board`
- `game.turn`
- `game.threefold`
- `game.FEN` and `game.FENboard`

#### AI
- The `ChessAI` method.

### Links
- [API CDNs](https://github.com/RSG-Group/RSG-Chess-API/tree/master/cdn)
- [RSG Chess API in NPM](https://www.npmjs.com/package/rsg-chess)
- [RSG Chess Graphics API in NPM](https://www.npmjs.com/package/rsg-chess-graphics)
- [RSG Chess' website](https://rsg-chess.now.sh/)
