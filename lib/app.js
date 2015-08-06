import "babel-core/polyfill";
import React from "react";
import Rx from "rx";
import hasher from "hasher";
import Router from "router";
import rxProps from "decorators/rx-props";

const count = new Rx.BehaviorSubject(0);

function increment() {
  count.onNext(count.getValue() + 1);
}

function decrement() {
  count.onNext(count.getValue() - 1);
}

const hashStream = Rx.Observable.create((observer) => {
  hasher.init();
  observer.onNext(hasher.getHash());
  hasher.changed.add(() => observer.onNext(hasher.getHash()));
});

@rxProps("count")
class Application extends React.Component {
  render() {
    return (
      <main>
        <button onClick={decrement}>-</button>
        <span>{this.props.count}</span>
        <button onClick={increment}>+</button>
        <section style={{margin: "30px 0 30px 0"}}>
          <ul>
            <li><a href="#todo">Todo</a></li>
            <li><a href="#minesweeper">Minesweeper</a></li>
          </ul>
        </section>
        <Router hash={hashStream}/>
      </main>
    );
  }
}

console.log("---- Starting Application ----");
React.render(<Application count={count}/>, document.body);
