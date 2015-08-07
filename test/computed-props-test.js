import React from "react";
import computedProps from "../lib/decorators/computed-props";
import {resolveComputedProps} from "../lib/decorators/computed-props";

describe("computedProps", () => {
  it("should compute a property given prop dependencies and a compute function", (done) => {
    @computedProps({
      fullname: {
        deps: ["firstname", "lastname"],
        compute(firstname, lastname) {
          return `${firstname} ${lastname}`
        }
      }
    })
    class Person extends React.Component {
      render() {
        if(this.props.fullname === "joe schmoe") {
          done();
        } else {
          done("Computed value didn't match expected value");;
        }
        return null;
      }
    }

    React.renderToString(<Person firstname="joe" lastname="schmoe"/>)
  });

  it("should recompute values only when their dependency props change", (done) => {
    let computedCount = 0;
    const cache = new Map();
    const props1 = {
      firstname: "foo",
      lastname: "bar"
    };

    const props2 = {
      firstname: "foo",
      lastname: "bar"
    };

    const props3 = {
      firstname: "foo",
      lastname: "fizz"
    };

    const descMap = {
      fullname: {
        deps: ["firstname", "lastname"],
        compute(fname, lname) {
          computedCount++;
          return `${fname} ${lname}`;
        }
      }
    };

    resolveComputedProps(cache, props1, descMap);
    resolveComputedProps(cache, props2, descMap);
    resolveComputedProps(cache, props3, descMap);

    if(computedCount > 2) {
      done("Value was computed too many times");
    } else if(computedProps < 2) {
      done("Value wasn't computed enough times");
    } else {
      done();
    }
  });

  it("should be able to resolve props with dependencies on other computed props", (done) => {
    const cache = new Map();
    const expected = "joe schmoe eomhcs eoj";
    const props = {
      firstname: "joe",
      lastname: "schmoe"
    };
    const descMap = {
      reversedFullname: {
        deps: ["fullname"],
        compute(fullname) {
          return fullname.split("").reverse().join("");
        }
      },
      fullname: {
        deps: ["firstname", "lastname"],
        compute(firstname, lastname) {
          return `${firstname} ${lastname}`;
        }
      },
      both: {
        deps: ["fullname", "reversedFullname"],
        compute(fullname, reversedFullname) {
          return `${fullname} ${reversedFullname}`;
        }
      }
    };
    const computedProps = resolveComputedProps(cache, props, descMap);
    if(computedProps.both === expected) {
      done();
    } else {
      done(`Unexpected computed value: ${computedProps.both}`);
    }
  });
});
