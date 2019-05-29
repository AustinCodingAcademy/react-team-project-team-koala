import React, { Component } from 'react'

import classNames from 'classnames'

export const COLORS = {
  // bootstrap colors
  blue: '#007bff',
  indigo: '#6610f2',
  purple: '#6f42c1',
  pink: '#e83e8c',
  red: '#dc3545',
  orange: '#fd7e14',
  yellow: '#ffc107',
  green: '#28a745',
  teal: '#20c997',
  cyan: '#17a2b8',
  white: '#fff',
  gray: '#6c757d',
  grayDark: '#343a40',
  primary: '#007bff',
  secondary: '#6c757d',
  success: '#28a745',
  info: '#17a2b8',
  warning: '#ffc107',
  danger: '#dc3545',
  light: '#f8f9fa',
  dark: '#343a40',
  // tailwind
  gray600: '#718096',
  gray200: '#EDF2F7',
  gray100: '#F7FAFC'
}

class Icon extends Component {
  render() {
    const { icon, text, textAfter, label, textStyle, color, classList } = this.props

    var cx = classNames.bind()
    var className = cx('p-button', 'px-1')
    return (
      <span className={icon} style={{ color: COLORS[color] }}>
        {this.props.children}
      </span>
    )
  }
}
export default Icon
