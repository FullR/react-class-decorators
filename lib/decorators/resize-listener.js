import React from "react";
import flyd from "flyd";
import {once} from "lodash";

import streamProps from "decorators/stream-props";
import bindProps from "decorators/bind-props";

const getResizeStreams = once(() => {
  const windowWidth = flyd.stream(window.innerWidth);
  const windowHeight = flyd.stream(window.innerHeight);

  window.addEventListener("resize", () => {
    windowWidth(window.innerWidth);
    windowHeight(window.innerHeight);
  });

  return {windowWidth, windowHeight};
});

export default (WrappedComponent) => {
  return (
    @bindProps(getResizeStreams())
    @streamProps("windowWidth", "windowHeight")
    class extends WrappedComponent {}
  );
};
