import "babel-core/polyfill";
import React from "react";
import Rx from "rx";
import hasher from "hasher";
import Router from "router";
import rxProps from "decorators/rx-props";
import computedProps from "decorators/computed-props";

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

@computedProps({
  fullname: {
    deps: ["firstname", "lastname"],
    compute(fname, lname) {
      console.log("Computing fullname");
      return `${fname} ${lname}`;
    }
  },
  capitalized: {
    deps: ["fullname"],
    compute(fullname) {
      return fullname.split(" ").map((name) => {
        return name.slice(0, 1).toUpperCase() + name.slice(1);
      }).join(" ");
    }
  }
})
class Person extends React.Component {
  render() {
    return (<span>{this.props.fullname} {this.props.capitalized}</span>);
  }
}

@rxProps("count")
class Application extends React.Component {
  render() {
    console.log("rendering");
    return (
      <main>
        <Person firstname={"joe"+this.props.count} lastname="schmoe"/>
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
React.render(<Application count={count} firstname="joe" lastname="schmoe"/>, document.body);
