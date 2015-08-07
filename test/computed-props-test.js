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
    const propComputer = PropComputer(computedProps);
    const expected = 15;
    propComputer(source);
    propComputer(source);
    propComputer(source);
    propComputer(source);
    propComputer(source);
    if(computeCount > 1) {
      throw new Error("failed to resolve cached values");
    }
  });
});
