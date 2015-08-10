import {createPropStateObservable} from "../lib/decorators/prop-state";

describe("createPropStateObservable", () => {
  it("should create an observable that emits the changes made to its variable descriptors", (done) => {
    const expected = "data";
    const propStateObservable = createPropStateObservable({
      testValue: {
        value: 1,
        reduce(value, input) {
          return input;
        }
      }
    });

    let changed = false;
    propStateObservable.subscribe((propState) => {
      if(changed) {
        if(propState.testValue.value !== expected) {
          done("Got unexpected value from propStateObservable");
        } else {
          done();
        }
      } else {
        changed = true;
        propState.testValue.update(expected);
      }
    });
  });
});
