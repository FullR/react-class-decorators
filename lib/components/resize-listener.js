import React from "react";
import flyd from "flyd";
import streamListener from "components/stream-listener";

function getWindowDims() {
  return {
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight
  };
}

const dimensionStream = flyd.stream(getWindowDims());

window.addEventListener("resize", () => dimensionStream(getWindowDims()));

export default streamListener(dimensionStream);
