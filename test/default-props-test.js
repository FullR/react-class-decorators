import React from "react";
import defaultProps from "../lib/decorators/default-props";

describe("defaultProps", () => {
  it("should pass default properties if they're not present in props object", (done) => {
    @defaultProps({foo: "bar"})
    class TestComponent extends React.Component {
      render() {
        if(this.props.foo === "bar") {
          done();
        } else {
          done("prop value does not match expected value");
        }
        return null;
      }
    }

    React.renderToString(<TestComponent/>); // pass some values to make sure they don't overwrite bound props
  });

  it("should not overwrite defined properties", (done) => {
    @defaultProps({foo: "bar"})
    class TestComponent extends React.Component {
      render() {
        if(this.props.foo === "fizzbuzz") {
          done();
        } else {
          done("prop value does not match expected value");
        }
        return null;
      }
    }

    React.renderToString(<TestComponent foo="fizzbuzz"/>);
  });
});
