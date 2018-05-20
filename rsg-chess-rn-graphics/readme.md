# RSG Chess Graphics API for React Native

### [React Native](https://facebook.github.io/react-native/) based Chess graphics

## Installation

```
npm install rsg-chess-rn-graphics
// or
yarn add rsg-chess-rn-graphics
```

## Usage

> Check out the [`RSG Chess graphics API for ReactJS`](https://www.npmjs.com/package/rsg-chess-graphics)

```js
// Usage example:

import React, { Component } from "react";
import { Platform, Text, View} from "react-native";

import { Game } from "rsg-chess";
import ChessBoard from "rsg-chess-rn-graphics";

type Props = {};
const game = Game.prototype.initializeGame();

export default class App extends Component<Props> {
  render() {
    return (
      <View>
        <ChessBoard
          board={game.board}
          boardWidth={...}
          boardHeight={...}
          pieceSize={...}
          showValidMoves={true}
          selected={game.board[1][1]}
          self={this}
          onPress={(x, y) => {
            alert(x, y);
          }}
        />
      </View>
    );
  }
}
```

### This project is created by [Radi Cho](https://github.com/radi-cho), published by [RSG Group](https://github.com/RSG-Group) and licensed under [Apache 2.0 LICENSE](https://github.com/RSG-Group/Chess/blob/master/LICENSE)
