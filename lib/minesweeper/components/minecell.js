import React from "react";

export default class Minecell extends React.Component {
  constructor(props) {
    super(props);
    this.reveal = this.reveal.bind(this);
    this.flag = this.flag.bind(this);
  }

  reveal() {
    this.props.revealCell.onNext({
      id: this.props.id
    })
  }

  flag(event) {
    event.preventDefault();
    this.props.flagCell.onNext({
      id: this.props.id
    })
  }

  render() {
    const {id, x, y, width, height, revealed, flagged, mine, adjacent, revealCell, flagCell} = this.props;
    const style = {
      width, height,
      lineHeight: `${height * 0.8}px`,
      position: "absolute",
      left: x * width,
      top: y * height,
      margin: 0,
      padding: 0,
      display: "inline-block",
      boxSizing: "border-box",
      textAlign: "center",
      border: flagged && !revealed ? "2px solid #F00" : "2px solid #888",
      background: revealed ? (mine ? "#D00" : "#FFF") : "#222"
    };
    let adjacentMineCount;

    if(revealed && !mine) {
      adjacentMineCount = adjacent ? adjacent.filter((other) => other.mine).length : null;
    }

    return (<div style={style} onClick={this.reveal} onContextMenu={this.flag}>{adjacentMineCount || ""}</div>);
  }
}
