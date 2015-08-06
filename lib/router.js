import React from "react";
import Rx from "rx";
import hasher from "hasher";
import rxProps from "decorators/rx-props";

import MinesweeperApp from "minesweeper/minesweeper-app";
import TodoApp from "todo/todo-app";

@rxProps("hash")
export default class Router extends React.Component {
  render() {
    switch(this.props.hash) {
      case "minesweeper": return <MinesweeperApp/>;
      case "todo": return <TodoApp/>;
      default: return <TodoApp/>;
    }
  }
}
