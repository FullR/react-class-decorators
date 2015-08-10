import React from "react";
import Rx from "rx";
import hasher from "hasher";
import rxProps from "decorators/rx-props";

import MinesweeperApp from "minesweeper/minesweeper-app";
import TodoApp from "todo/todo-app";
import Counter from "counter";

export default class Router extends React.Component {
  render() {
    switch(this.props.hash) {
      case "minesweeper": return <MinesweeperApp/>;
      case "todo": return <TodoApp/>;
      case "counter": return <Counter/>;
      default: return <TodoApp/>;
    }
  }
}
