import React from "react";
import Rx from "rx";
import {extend, range} from "lodash";

import Minefield from "minesweeper/components/minefield";
import minesweeper from "minesweeper/store";
import createActions from "minesweeper/actions";

import rxProps from "decorators/rx-props";
import bindProps from "decorators/bind-props";
import computedProps from "decorators/computed-props";

const games = range(5).map((id) => {
  const actions = createActions();
  const store = minesweeper(actions);
  return {id, store, actions};
});

@rxProps("game")
class Game extends React.Component {
  render() {
    const {game, actions} = this.props;

    if(game) {
      return (
        <div>
          <Minefield
            {...actions}
            cellTable={game.cellTable}
            cellWidth={20}
            cellHeight={20}
            xCount={game.xCount}
            yCount={game.yCount}
            />
        </div>
      );
    } else {
      return (<div/>);
    }
  }
}

export default class MinesweeperApp extends React.Component {
  constructor(props) {
    super(props);
    this.nextGame = this.nextGame.bind(this);
    this.prevGame = this.prevGame.bind(this);
    this.showAll = this.showAll.bind(this);
    this.state = {
      gameIndex: 0,
      showingAll: false
    };
  }

  showAll() {
    this.setState({
      gameIndex: this.state.gameIndex,
      showingAll: !this.state.showingAll
    })
  }

  nextGame() {
    this.setState({
      gameIndex: clamp(0, games.length - 1, this.state.gameIndex + 1)
    });
  }

  prevGame() {
    this.setState({
      gameIndex: clamp(0, games.length - 1, this.state.gameIndex - 1)
    });
  }

  render() {
    const {gameIndex, showingAll} = this.state;
    const game = games[gameIndex];
    return (
      <div>
        <button onClick={this.showAll}>Show all</button>
        <button onClick={this.prevGame}>Previous</button>
        <div>{gameIndex + 1} / {games.length}</div>
        <button onClick={this.nextGame}>Next</button>
        {showingAll ?
          games.map((game) => 
            <div>
              <Game key={`game-${game.id}`} actions={game.actions} game={game.store}/>
              <hr/>
            </div>
          ) :
          <Game key={`game-${game.id}`} actions={game.actions} game={game.store}/>
        }
      </div>
    );
  }
}

function clamp(min, max, n) {
  return (n > min) ? (n < max ? n : max) : min;
}