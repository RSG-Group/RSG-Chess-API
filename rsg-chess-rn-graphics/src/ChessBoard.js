import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { find } from "lodash";

import { Game } from "rsg-chess";

type Props = {
  showValidMoves?: boolean,
  rotated?: boolean,
  selected?: object,
  board: object,
  selected: object,
  validBG?: string,
  whiteCells?: string,
  blackCells?: string,
  selectedBG?: string,
  selectedColor?: string,
  boardHeight?: number,
  boardWidth?: number,
  pieceSize?: number,
  self: any,
  onPress: any
};

export default class ChessBoard extends Component<Props> {
  render() {
    const props = this.props;
    const { showValidMoves, rotated, board, selected, onPress, self } = props;
    const validMoves = selected && selected.getValidMoves(true);

    return (
      <View style={styles.container}>
        {board &&
          board.map((row, i) => (
            <View key={i} style={[styles.row, i !== 0 && styles.spaceOnTheTop]}>
              {row.map((cell, j) => (
                <TouchableOpacity key={j} onPress={onPress.bind(self, j, i)}>
                  <View
                    style={[
                      styles.cell,
                      {
                        width: props.boardWidth,
                        height: props.boardHeight
                      },
                      i === 7 && styles.bottomBorder,
                      j === 7 && styles.rightBorder,
                      ((i % 2 === 0 && j % 2 !== 0) ||
                        (i % 2 !== 0 && j % 2 === 0)) && {
                        backgroundColor: props.blackCells
                      },
                      ((i % 2 === 0 && j % 2 === 0) ||
                        (i % 2 !== 0 && j % 2 !== 0)) && {
                        backgroundColor: props.whiteCells
                      },
                      showValidMoves &&
                        selected &&
                        find(validMoves, { x: j, y: i }) && {
                          backgroundColor: props.validBG
                        },
                      selected &&
                        selected === cell && {
                          backgroundColor: props.selectedBG
                        }
                    ]}
                  >
                    <Text
                      style={[
                        {
                          fontSize: props.pieceSize,
                          color: "black"
                        },
                        rotated &&
                          cell &&
                          cell.color === "B" &&
                          styles.rotatedStyles,
                        selected &&
                          selected === cell && {
                            color: props.selectedColor
                          }
                      ]}
                    >
                      {cell && cell.char}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  row: {
    flexDirection: "row"
  },
  cell: {
    borderColor: "grey",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  bottomBorder: {
    borderBottomWidth: 1
  },
  rightBorder: {
    borderRightWidth: 1
  },
  rotatedStyles: {
    transform: [{ rotateX: "180deg" }]
  }
});

ChessBoard.defaultProps = {
  showValidMoves: true,
  rotated: false,
  selected: null,
  validBG: "red",
  whiteCells: "rgb(255, 205, 160)",
  blackCells: "rgb(210, 140, 70)",
  selectedBG: "brown",
  selectedColor: "lightblue",
  boardHeight: 50,
  boardWidth: 50,
  pieceSize: 38,
  selected: null,
  board: null,
  slef: null,
  onPress: () => {}
};
