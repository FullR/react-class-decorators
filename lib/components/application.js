import React from "react";
//import {Stage, Sprite} from "react-pixi";
import resizeListener from "components/resize-listener";
import hashListener from "components/hash-listener";
import hoverListener from "components/hover-listener";

@resizeListener
@hashListener
@hoverListener
class Application extends React.Component {
  render() {
    const {windowWidth, windowHeight, hash, hovering} = this.props;
    return (
      <div {...this.props} style={{border: "1px solid #444"}}>
        <div>width: {windowWidth}</div>
        <div>height: {windowHeight}</div>
        <div>hash: {hash}</div>
        <div>hovering: {hovering ? "true" : "false"}</div>
      </div>
    );
  }
}

export default Application;
