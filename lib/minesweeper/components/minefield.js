import React from "react";
import Minecell from "minesweeper/components/minecell";
import defaultProps from "decorators/default-props";

@defaultProps({
  cellTable: [],
  cellWidth: 10,
  cellHeight: 10
})
export default class Minefield extends React.Component {
  render() {
    const {cellTable, cellWidth, cellHeight, xCount, yCount} = this.props;
    const style = {
      position: "relative",
      width: xCount * cellWidth,
      height: yCount * cellHeight
    };

    return (
      <div style={style}>
        {cellTable.map((row) => row.map((cell) =>
          <Minecell {...cell} key={cell.id} width={cellWidth} height={cellHeight}/>
        ))}
      </div>
    );
  }
}
