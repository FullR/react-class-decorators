import {PropComputer} from "../lib/decorators/computed-props";

describe("computedProps", () => {
  it("Should compute a property given dependencies, a compute function, and a source object", () => {
    const source = {a: 5, b: 10};
    const computedProps = {
      c: {
        deps: ["a", "b"],
        compute(a, b) {
          return a + b;
        }
      }
    };
    const expected = 15;
    const result = PropComputer(computedProps)(source).c;
    if(result !== expected) {
      throw new Error("Incorrect computed value");
    }
  });

  it("Should only compute a property once if the source dependencies don't change", () => {
    let computeCount = 0;
    const source = {a: 5, b: 10};
    const computedProps = {
      c: {
        deps: ["a", "b"],
        compute(a, b) {
          computeCount++;
          return a + b;
        }
      }
    };
    const expected = 3;
    const propComputer = PropComputer(computedProps);

    propComputer(source);
    propComputer(source);
    propComputer(source);
    propComputer({a: 15, b: 25});
    propComputer(source);
    propComputer(source);
    if(computeCount > expected) {
      throw new Error("compute function ran more times than expected");
    } else if(computeCount < expected) {
      throw new Error("compute function ran less times than expected");
    }
  });

  it("Should be able to compute properties that depend on other computed properties", () => {
    const expected = "JOE SCHMOE";
    const computedProps = {
      fullname: {
        deps: ["firstname", "lastname"],
        compute: (f,l) => `${f} ${l}`
      },
      result: {
        deps: ["fullname"],
        compute: (fullname) => fullname.toUpperCase()
      }
    };
    const source = {firstname: "joe", lastname: "schmoe"};
    const passed = PropComputer(computedProps)(source).result === expected;
    if(!passed) {
      throw new Error("Computed value does not match expected value");
    }
  });
});
