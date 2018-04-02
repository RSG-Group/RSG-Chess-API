//
// RSG Chess
// Licensed under Apache 2.0 LICENSE

import React from 'react'
import PropTypes from 'prop-types'
import { omit, find } from 'lodash'
import classNames from 'classnames'

const ChessTable = (props) => {
  const { board, selected, rotated, showValidMoves, onClick, self } = props
  const validMoves = selected && selected.getValidMoves(true)
  return (
    <div>
      <table className="rsg-chess-table" {...omit(props, ['board', 'selected', 'rotated', 'showValidMoves', 'onClick', 'self'])}>
        <tbody>
          {
            board.map((rank, i) => (
              <tr key={i}>
                {
                  rank.map((piece, j) => (
                    <td key={j}
                      onClick={onClick.bind(self, j, i)}
                      className={classNames({
                        selected: selected && selected === piece,
                        validMoves: showValidMoves && selected && find(validMoves, { x: j, y: i }),
                        rotated: rotated && piece && piece.color === 'B'
                      })}
                    >
                      {piece && piece.char}
                    </td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

ChessTable.propTypes = {
  board: PropTypes.array,
  selected: PropTypes.object,
  rotated: PropTypes.bool,
  showValidMoves: PropTypes.bool,
  onClick: PropTypes.func,
  self: PropTypes.any
}

ChessTable.defaultProps = {
  selected: null,
  rotated: false,
  showValidMoves: false
}

export default ChessTable
