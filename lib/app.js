import "babel-core/polyfill";
import React from "react";
import Rx from "rx";
import hasher from "hasher";
import Router from "router";
import rxProps from "decorators/rx-props";
import computedProps from "decorators/computed-props";

const hashStream = Rx.Observable.create((observer) => {
  hasher.init();
  observer.onNext(hasher.getHash());
  hasher.changed.add(() => observer.onNext(hasher.getHash()));
});

@rxProps("hash")
class Application extends React.Component {
  render() {
    return (
      <main>
        <section style={{margin: "30px 0 30px 0"}}>
          <ul>
            <li><a href="#todo">Todo</a></li>
            <li><a href="#minesweeper">Minesweeper</a></li>
            <li><a href="#counter">Counter</a></li>
          </ul>
        </section>
        <Router hash={this.props.hash}/>
      </main>
    );
  }
}

console.log("---- Starting Application ----");
React.render(<Application hash={hashStream}/>, document.body);
