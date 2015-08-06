import React from "react";
import Rx from "rx";
import rxProps from "../lib/decorators/rx-props";

describe("rxProps", () => {
  it("should be pass the latest value from a stream to the wrapped component", (done) => {
    const data = "test value";
    const dataStream = new Rx.BehaviorSubject(data);//Rx.Observable.of(data)

    @rxProps("data")
    class Wrapped extends React.Component {
      render() {
        if(this.props.data !== data) {
          done(`Invalid data prop: ${this.props.data}`);
        } else {
          done();
        }
        return null;
      }
    }

    React.renderToString(<Wrapped data={dataStream}/>);
  });
});
