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

# Usage

### Import the modules

```js
// ES6
import { Game, AI, Pieces, tools } from "rsg-chess";

// NodeJS
const { Game, AI, Pieces, tools } = require("rsg-chess");

// CDN
// The `RSGChess` global variable can be used once, after all scripts have loaded successfully
var Game = RSGChess.game;
var AI = RSGChess.AI;
// ect.
```

### Use the functions

To use our API take a look at the [docs](#docs) and the [supported functions](#supported-functions)!

### Example:

```js
// ES6
const game = Game.prototype.initializeGame();
game.moveSelected(
  game.board[6][0], { y: 5, x: 0 }, () => {}, () => {}, false, false
)
...

// Node.JS
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

# Docs

Documentations, Get Started guides and tutorials are available on http://rsg-chess.now.sh/docs/api/

> Note that the docs are not completed yet and may contain wrong links and broken demos.

## Supported functions

#### Game logic and controls

* `new Game (promoCallback)`
* `Game.prototype.initializeGame`
* `Game.prototype.piece (type, x, y, color)`
* `Game.prototype.moveSelected (selected, to, promotionCallback, checkmateCallback, simulate)`
* `Game.prototype.promotePawn (pawn, x, y, color, type)`
* `Game.prototype.simulateAndFilter (moves, piece)`
* `Game.prototype.checkmate (color)`
* `Game.prototype.simpleMovePiece (piece, from, to)`
* `Game.prototype.warning (color)`
* `Game.prototype.allMoves`

#### notations and rules

* `Game.prototype.threefoldCheck`
* `Game.prototype.halfmoveClock`
* `Game.prototype.castlingTarget`
* `Game.prototype.enPassantTarget`
* `Game.prototype.fullmoveCount`
* `Game.prototype.pieceToAN (x, y)`
* `Game.prototype.boardToFEN`
* `Game.prototype.activeColour`
* `Game.prototype.gameToFEN`

#### `Game.prototype` variables

* `game.board`
* `game.turn`
* `game.threefold`
* `game.FEN` and `game.FENboard`

#### AI

* The `AI` method.
* * syntax and input: `AI(depth, gameState, isMaximisingPlayer)`
* * output: `bestmove { from, to }`

#### Tools

Sometimes you need to manage a lot of different indications such as app performance, AI speed, bundle file size, battery life and more. That's why we've added `tools` to `RSG Chess API` as built-in methods or external plugins. With them you can run more complex tasks (transfer data from/to servers/back-ends, using workers and threads or databases), manage the performance and improve the speed of the app.

* `uncycleBoard(boardObject)`
* `uncycleTurns(turnObject)`

These two methods remove the cyclic game references from the board and turn objects so you can stringify them, send via HTTP requests or even save as cookies for later usage.

## This API is officially powering the [`RSG Chess mobile`](https://play.google.com/store/apps/details?id=com.rsg.chess) app and the rest of the ["RSG Chess family"](http://rsg-chess.now.sh)

* Gitub: https://github.com/RSG-Group/RSG-Chess-mobile
* Google Play Store: https://play.google.com/store/apps/details?id=com.rsg.chess
* Amazon AppStore: https://www.amazon.com/RSG-Group-Chess/dp/B07D1KWTK7

### Additional links

* [API CDNs](https://github.com/RSG-Group/RSG-Chess-API/tree/master/cdn)
* [RSG Chess API in NPM](https://www.npmjs.com/package/rsg-chess)
* [RSG Chess Graphics API in NPM](https://www.npmjs.com/package/rsg-chess-graphics)
* [RSG Chess' website](https://rsg-chess.now.sh/)
