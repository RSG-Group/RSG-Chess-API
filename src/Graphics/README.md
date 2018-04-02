# RSG Chess Graphics API
### ReactJS based Chess graphics

## Installation
```
npm install rsg-chess-graphics
// or
yarn add rsg-chess-graphics
```
*Expect new RSG Chess Graphics API CDN for browser-level JavaScript

## Usage example
```
// ES6
import React from "react";
import { Game } from "rsg-chess";
import ChessBoard from "rsg-chess-graphics";

const App = () => {
  const game = Game.prototype.initializeGame();
  return (
    <ChessBoard
      self={this}
      board={game.board}
      rotated={false}
      selected={game.board[7][1]}
      showValidMoves={true}
      onClick={() => {}}
    />
  );
};
```

## Props
```
  board: array, // game.board array (generated with rsg-chess-api) - required
  selected: object, // selected piece from the board (for example game.board[0][0])
  rotated: bool, // are the black pieces rotated for real chess board experience
  showValidMoves: bool, // highlight the valid moves
  onClick: func, // onClick callback for every cell
  self: any, // `this` statement used in the onClick function (used in es6 classes, for example)
  validBG: string, // the background which highlights the valid move cells
  selectedBG: string, // the background which highlights the selected cells
  selectedColor: string, // the text color for the selected cells
  whiteCells: string, // the background for all white chess cells (rgb, hex and standard colors)
  blackCells: string, // the background for all black chess cells (rgb, hex and standard colors)
  boardWidth: string, // the board width (in px, %, em, inches, cm, ect.)
  boardHeight: string, // the board height (in px, %, em, inches, cm, ect.)
  pieceSize: string, // font-size for all pieces on the board
  tdTransition: string // specific transition for all td elements (default: 'background-color 355ms linear, color 360ms ease-in')
```

### This project is created by [Radi Cho](https://github.com/radi-cho), published by [RSG Group](https://github.com/RSG-Group) and licensed under [Apache 2.0 LICENSE](https://github.com/RSG-Group/Chess/blob/master/LICENSE)
