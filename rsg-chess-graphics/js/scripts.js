//
// RSG Chess
// Licensed under Apache 2.0 LICENSE

import React from "react";
import PropTypes from "prop-types";
import { omit, find } from "lodash";
import classNames from "classnames";

const ChessTable = props => {
  // Define needed props and vars
  const { board, selected, rotated, showValidMoves, onClick, self } = props;
  const validMoves = selected && selected.getValidMoves(true);

  // Styles variables
  const omitProps = [
    "style",
    "board",
    "selected",
    "rotated",
    "showValidMoves",
    "onClick",
    "self",
    "validBG",
    "selectedBG",
    "selectedColor",
    "whiteCells",
    "blackCells",
    "boardWidth",
    "boardHeight",
    "pieceSize",
    "tdTransition",
    "whiteColor",
    "blackColor"
  ];

  const mainTable = {
    cursor: "pointer",
    border: "1px solid gray",
    textAlign: "center",
    width: props.boardWidth,
    height: props.boardHeight,
    fontSize: props.pieceSize,
    userSelect: "none",
    WebkitTouchCallout: "none",
    WebkitUserSelect: "none",
    KhtmlUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
    ...props.style
  };

  const mainTd = {
    width: "12.5%",
    height: "12.5%",
    border: "1px solid grey",
    WebkitTransition: props.tdTransition,
    MozTransition: props.tdTransition,
    OTransition: props.tdTransition,
    msTransition: props.tdTransition,
    transition: props.tdTransition
  };

  const rotatedStyles = {
    transform: "rotateX(180deg)"
  };

  const validMoveStyles = {
    background: props.validBG
  };

  const selectedStyles = {
    background: props.selectedBG,
    color: props.selectedColor
  };

  const whiteTds = {
    background: props.whiteCells,
    color: props.whiteColor
  };

  const blackTds = {
    background: props.blackCells,
    color: props.blackColor
  };

  // render graphics
  return (
    <table
      className="rsg-chess-table"
      style={mainTable}
      {...omit(props, omitProps)}
    >
      <tbody>
        {board.map((rank, i) => (
          <tr key={i}>
            {rank.map((piece, j) => (
              <td
                key={j}
                onClick={onClick.bind(self, j, i)}
                className={classNames({
                  selected: selected && selected === piece,
                  validMoves:
                    showValidMoves &&
                    selected &&
                    find(validMoves, { x: j, y: i }),
                  rotated: rotated && piece && piece.color === "B"
                })}
                style={{
                  ...(((i % 2 === 0 && j % 2 !== 0) ||
                    (i % 2 !== 0 && j % 2 === 0)) &&
                    blackTds),
                  ...(((i % 2 === 0 && j % 2 === 0) ||
                    (i % 2 !== 0 && j % 2 !== 0)) &&
                    whiteTds),
                  ...mainTd,
                  ...(showValidMoves &&
                    selected &&
                    find(validMoves, { x: j, y: i }) &&
                    validMoveStyles),
                  ...(selected && selected === piece && selectedStyles)
                }}
              >
                <span
                  style={
                    rotated && piece && piece.color === "B" && rotatedStyles
                  }
                >
                  {piece && piece.char}
                </span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// validate props
ChessTable.propTypes = {
  self: PropTypes.any,
  board: PropTypes.array,
  selected: PropTypes.object,
  rotated: PropTypes.bool,
  showValidMoves: PropTypes.bool,
  onClick: PropTypes.func,
  validBG: PropTypes.string,
  selectedBG: PropTypes.string,
  selectedColor: PropTypes.string,
  whiteCells: PropTypes.string,
  blackCells: PropTypes.string,
  boardWidth: PropTypes.string,
  boardHeight: PropTypes.string,
  pieceSize: PropTypes.string,
  tdTransition: PropTypes.string,
  whiteColor: PropTypes.string,
  blackColor: PropTypes.string
};

// set default props
ChessTable.defaultProps = {
  selected: null,
  rotated: false,
  showValidMoves: false,
  validBG: "red",
  selectedBG: "brown",
  selectedColor: "lightblue",
  whiteCells: "rgb(255, 205, 160)",
  blackCells: "rgb(210, 140, 70)",
  boardWidth: "500px",
  boardHeight: "500px",
  pieceSize: "40px",
  tdTransition: "background-color 355ms linear, color 360ms ease-in",
  whiteColor: "black",
  blackColor: "black"
};

export default ChessTable;
