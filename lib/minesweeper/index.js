import React from "react";
import Rx from "rx";

import Minefield from "minesweeper/components/minefield";
import game from "minesweeper/store";
import rxListener from "decorators/rx-listener";
import computedProps from "decorators/computed-props";

@rxListener({game})
export default class MinesweeperApp extends React.Component {
  render() {
    const {game} = this.props;
    if(game) {
      return (
        <div>
          <Minefield cellTable={game.cellTable} cellWidth={20} cellHeight={20} xCount={game.xCount} yCount={game.yCount}/>
        </div>
      );
    } else {
      return (<div/>);
    }
  }
}
