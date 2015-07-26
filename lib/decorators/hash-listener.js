import hasher from "hasher";
import flyd from "flyd";
import {once} from "lodash";

import streamProps from "decorators/stream-props";
import bindProps from "decorators/bind-props";

const getHashStream = once(() => {
  hasher.init();
  const hashStream = flyd.stream(hasher.getHash());
  hasher.changed.add(() => hashStream(hasher.getHash()));
  return hashStream;
});

export default (WrappedComponent) => {
  const hash = getHashStream();
  // ugly composition of decorators on classes after declaration
  // alternative: 
  //   return @bindProps({hash}) @streamProps("hash") class extends WrappedComponent {};
  return bindProps({hash})(streamProps("hash")(WrappedComponent));
};
