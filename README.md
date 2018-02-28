# RSG-Chess-API
Chess APIs based on RSG Chess

# Supported functions

### Game logic and controls
- `new Game (promoCallback)`
- `Game.prototype.initializeGame`
- `Game.prototype.piece (type, x, y, color)`
- `Game.prototype.moveSelected (selected, to, promotionCallback, checkmateCallback, playAgainstAI, simulate)`
- `Game.prototype.promotePawn (pawn, x, y, color, type)`
- `Game.prototype.simulateAndFilter (moves, piece)`
- `Game.prototype.checkmate (color)`
- `Game.prototype.simpleMovePiece (piece, from, to)`
- `Game.prototype.warning (color)`
- `Game.prototype.allMoves`

### notations and rules
- `Game.prototype.threefoldCheck`
- `Game.prototype.halfmoveClock`
- `Game.prototype.castlingTarget`
- `Game.prototype.enPassantTarget`
- `Game.prototype.fullmoveCount`
- `Game.prototype.pieceToAN (x, y)`
- `Game.prototype.boardToFEN`
- `Game.prototype.activeColour`
- `Game.prototype.gameToFEN`

### `Game.prototype` variables
- `game.board`
- `game.turn`
- `game.threefold`
- `game.FEN` and `game.FENboard`

### Usage
```
import { Game } from '../src/index'

// set up game on your own
const game = new Game();
game.piece(...)
...

// initialize standard game configuration
const game = Game.prototype.initializeGame()
game.moveSelected(...)
...
```

### Detailed docs, CDNs and official support coming soon!
