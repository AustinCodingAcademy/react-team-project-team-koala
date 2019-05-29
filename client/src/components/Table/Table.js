import React, { Component } from 'react'

export class Thead extends Component {
  render() {
    const { arr } = this.props

    return (
      <>
        <thead className="table-header">
          <tr style={{ borderBottom: '2px solid #ddd' }}>
            {arr.length > 0 ? arr.map((e, i) => <th key={i}>{e}</th>) : ''}
            {this.props.children}
          </tr>
        </thead>
      </>
    )
  }
}

export class Caption extends Component {
  render() {
    const { title, body, side, display, justify } = this.props

    return (
      <>
        <caption style={{ captionSide: side || 'top' }}>
          <h3 className="table-caption-title p-0 m-0">{title}</h3>
          {body}
        </caption>
      </>
    )
  }
}
