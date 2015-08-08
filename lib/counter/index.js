import React from "react";
import propState from "decorators/prop-state";

@propState({
  count: {
    value: 0,
    reduce(current, change) {
      return current + change;
    }
  }
})
export default class CounterExample extends React.Component {
  render() {
    const {count} = this.props;
    return (
      <section>
        <button onClick={() => count.update(-1)}>-</button>
        <span>{count.value}</span>
        <button onClick={() => count.update(1)}>+</button>
      </section>
    );
  }
}
