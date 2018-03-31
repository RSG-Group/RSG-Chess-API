# RSG-Chess API CDN scripts
Our API now provides CDN scripts for in-browser usage without third party modules required.

## Script loading
To load RSG Chess API in your web JS app you need to use the following script:
```
<script src="https://storage.googleapis.com/rsg-chess-api/cdn/index.min.js">
```
We provide two scripts, minified and non-minified. There isn't difference in their functions and methods but we recommend using the minified script, because of its smaller size. More details:
```
https://storage.googleapis.com/rsg-chess-api/cdn/index.js - 24KB
https://storage.googleapis.com/rsg-chess-api/cdn/index.min.js - 11KB
```
*New CDNs for the Graphics API are coming soon.

## Usage
When RSG Chess API is loaded in your web app you can use the global object variable `RSGChess` or clone it to your custom variable, like this:
```
var $ = RSGChess; // or
window._ = RSGChess; // or
const chessAPI = RSGChess // or whatever you want
```
The `RSGChess` object has the following structure: 
```
{
  Game: Game, // defined in game.js
  AI: ChessAI, // defined in AI.js
  Pieces: { // defined in pieces.js
    PIECE_CHARS: PIECE_CHARS,
    pawn: Piece.pawn,
    rook: Piece.rook,
    knight: Piece.knight,
    bishop: Piece.bishop,
    queen: Piece.queen,
    king: Piece.king
  }
} // Check out the files listed above in our repository: https://github.com/RSG-Group/RSG-Chess-API/tree/master/src
```
### Usage Example
```
var Game = RSGChess.Game;
var game = Game.prototype.initializeGame();
game.moveSelected(/* ... */)
// ...
var AI = RSGChess.AI;
var bestMove = AI(1, game, true);
// ...
var Pieces = RSGChess.Pieces;
var chars = Pieces.PIECE.CHARS
var pawn = Pieces.pawn;
```
#### [Check out our documentation to learn more about RSG Chess API](https://rsg-chess.now.sh/docs/api)
