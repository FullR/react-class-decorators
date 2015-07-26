import React from "react";
import {get} from "superagent";
import flyd from "flyd";

import defaultProps from "decorators/default-props";
import streamProps from "decorators/stream-props";
import bindProps from "decorators/bind-props";

const request = flyd.stream();
const response = flyd.stream([request], (self) => {
  return new Promise((resolve, reject) => {
    get("/api/things")
      .end((err, res) => {
        if(err) reject(err);
        else {
          resolve(res.body);
        }
      });

  });
});

@bindProps({things: response})
@streamProps("things")
class ThingViewer extends React.Component {
  componentDidMount() {
    request(true);
  }

  render() {
    const things = this.props.things;
    return (
      <div>
        {things ?
          things.map((thing) => <div key={thing}>{thing}</div>) :
          "loading..."
        }
      </div>
    );
  }
}

export default ThingViewer;
