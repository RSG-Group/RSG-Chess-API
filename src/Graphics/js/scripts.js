//
// RSG Chess
// Licensed under Apache 2.0 LICENSE

import React from 'react'
import _ from 'lodash'
import classNames from 'classnames'

export default class MainComponent extends React.Component {
  constructor () {
    super()

    this.state = {
      selected: null,
      promotionParams: null,
      checkmate: null,
      welcomeDialog: true,
      settingsDialog: false,
      playAgainstAI: false,
      rotated: false,
      showValidMoves: true
    }
  }

  __handleReplay () {
    // Set state to null and false, to reset all params
    this.setState({
      selected: null,
      promotionParams: null,
      welcomeDialog: true,
      checkmate: null,
      settingsDialog: false,
      playAgainstAI: false
    })
    // Initialize new game
    this.props.initializeGame()
  }

  __handleClick (x, y) {
    const { game } = this.props

    var selected = this.state.selected
    if (selected) {
      game.moveSelected(
        selected, {x: x, y: y}, this.__handlePromotion, this.__handleCheckmate, this.state.playAgainstAI
      )
      this.setState({ selected: null })
    } else {
      var last = game.turn.length - 1
      if (
        game.board[y][x] &&
        (last >= 0 ? game.board[y][x].color !== game.turn[last].color
          : game.board[y][x].color === 'W')
      ) {
        this.setState({ selected: game.board[y][x] })
      } else {
        game.board[y][x] && alert('Invalid Move!')
      }
    }
  }

  __handlePromotion (pawn, x, y, color) {
    this.setState({
      promotionParams: {
        x: x,
        y: y,
        color: color,
        pawn: pawn
      }
    })
  }

  __handleCheckmate (color) {
    this.setState({ checkmate: color })
  }

  __handleGamePromotion (piece) {
    if (piece) {
      const { x, y, color, pawn } = this.state.promotionParams
      this.props.game.promotePawn(pawn, x, y, color, piece)
    }
    this.setState({ promotionParams: null })
  }

  __renderTable () {
    const { selected, rotated, showValidMoves } = this.state
    const validMoves = selected && selected.getValidMoves(true)
    return this.props.game.board.map((rank, i) => (
      <tr key={i}>
        {
          rank.map((piece, j) => (
            <td key={j}
              onClick={this.__handleClick.bind(this, j, i)}
              className={classNames({
                selected: selected && selected === piece,
                validMoves: showValidMoves && selected && _.find(validMoves, { x: j, y: i }),
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

  render () {
    return (
      <div>
        <table id={'table'} >
          <tbody>
            {this.__renderTable()}
          </tbody>
        </table>

        { this.state.promotionParams && this.props.promotion() }
        { this.state.settingsDialog && this.props.settings() }
        { this.state.checkmate && this.props.checkmate() }
        { this.props.welcome() }
      </div>
    )
  }
}
