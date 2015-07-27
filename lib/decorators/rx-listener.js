import React from "react";
import {extend, map} from "lodash";

export default (streamMap) => (Component) => class RxListener extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.subs = map(streamMap, (stream, key) => {
      return stream.subscribe((value) => {
        this.setState(extend({}, this.state, {
          [key]: value
        }));
      });
    });
  }

  componentWillUnmount() {
    const {subs} = this;
    if(subs) {
      invoke(subs, "dispose");
      this.subs = null;
    }
  }

  render() {
    return (<Component {...this.props} {...this.state}>{this.props.children}</Component>);
  }
};
