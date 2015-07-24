import React from "react";
import hasher from "hasher";
import resizeListener from "components/resize-listener";
import hashListener from "components/hash-listener";
import hoverListener from "components/hover-listener";
import bindProps from "components/bind-props";

import "babel/polyfill";

@bindProps({windowWidth: 100})
@resizeListener
@hashListener
@hoverListener
class Application extends React.Component {
  render() {
    const {windowWidth, windowHeight, hash, hovering} = this.props;
    console.log(this.props);
    return (
      <div {...this.props} style={{border: "1px solid #444", width: windowWidth*0.5, height: windowHeight * 0.5}}>
        <div>width: {windowWidth}</div>
        <div>height: {windowHeight}</div>
        <div>hash: <input value={hash} onChange={(event) => hasher.setHash(event.target.value)}/></div>
        <div>hovering: {hovering ? "true" : "false"}</div>
      </div>
    );
  }
}

export default Application;
