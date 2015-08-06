import React from "react";
import {extend, compact, invoke} from "lodash";

function isStream(value) {
  return value && value.subscribe;
}

export default function rxProps(...propKeys) {
  return (Component) => class RxProps extends React.Component {
    constructor(props) {
      super(props);
      this.state = propKeys
        .filter((key) => isStream(props[key]) && props[key].getValue)
        .reduce((streamValues, key) => {
          streamValues[key] = props[key].getValue();
          return streamValues;
        }, {});
    }

    buildListenerStreams(props=this.props) {
      const listenerStreams = propKeys
      .filter((key) => isStream(props[key])) // ignore non-observable props
      .map((key) => { //  subscribe 
        return props[key].subscribe((data) => {
          this.setState(extend({}, this.state, {[key]: data}));
        });
      });

      this.disposeListenerStreams();
      this.listenerStreams = listenerStreams;
    }

    disposeListenerStreams() {
      const {listenerStreams} = this;
      if(listenerStreams) {
        invoke(listenerStreams, "dispose");
        this.listenerStreams = null;
      }
    }
    
    componentDidMount() {
      this.buildListenerStreams();
    }

    componentWillReceiveProps(nextProps) {
      this.buildListenerStreams(nextProps);
    }

    componentWillUnmount() {
      this.disposeListenerStreams();
    }

    render() {
      return <Component {...this.props} {...this.state}>{this.props.children}</Component>
    }
  };
};
