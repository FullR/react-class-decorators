import React from "react";
import bindProps from "../lib/decorators/bind-props";

describe("bindProps", () => {
  it("should ensure that the bound object overwrites props passed to the wrapped component", (done) => {
    const testProps = {foo: "bar", fizz: "buzz"};

    @bindProps(testProps)
    class TestComponent extends React.Component {
      render() {
        const {foo, fizz} = this.props;
        if(foo === testProps.foo && fizz === testProps.fizz) {
          done();
        } else {
          done("Props do not match bound props");
        }
        return null;
      }
    }

    React.renderToString(<TestComponent foo="qwer" bar={true}/>); // pass some values to make sure they don't overwrite bound props
  });
});
