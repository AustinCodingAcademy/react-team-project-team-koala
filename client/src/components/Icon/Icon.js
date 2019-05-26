import React, { Component } from 'react'
import './Icon.css'
import { COLORS } from '../Styler'

class Icon extends Component {
  render() {
    const { type, textBefore, textAfter, text, textStyle, color, classList } = this.props
    const classPalette = [type, classList || ''].join(' ')
    return (
      <>
        <span style={textStyle}>{textBefore}</span>
        <span className={classPalette} style={{ color: COLORS[color] || '#3755BE' }}>
          {this.props.children}
        </span>
        <span style={textStyle}>{textAfter || text}</span>
      </>
    )
  }
}
export default Icon
