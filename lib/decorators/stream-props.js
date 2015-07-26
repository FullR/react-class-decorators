import React from "react";
import flyd from "flyd";
import {extend, reduce, values} from "lodash";

export default function streamProps(...propNames) {
  return (WrappedComponent) => class StreamPropsWrapper extends React.Component {
    constructor(props) {
      super(props);
      this.state = this.getSyncProps();
    }

    getStreams(props=this.props) {
      return this._streams || (this._streams = propNames.reduce((streamValues, propName) => {
        const prop = props[propName];
        if(typeof prop === "function") {
          streamValues[propName] = prop;
        }
        return streamValues;
      }, {}));
    }

    getSyncProps(props=this.props) {
      return reduce(this.getStreams(props), (propObj, stream, key) => {
        propObj[key] = stream();
        return propObj;
      }, {});
    }

    createListenerStream(props=this.props) {
      this.listenerStream = flyd.stream(values(this.getStreams(props)), () => {
        this.setState(this.getSyncProps(props));
      });
    }

    removeListenerStream() {
      if(this.listenerStream) {
        this._streams = null;
        this.listenerStream.end(true);
        this.listenerStream = null;
      }
    }

    componentWillUnmount() {
      this.removeListenerStream();
    }

    componentWillReceiveProps(nextProps) {
      this.removeListenerStream();
      this.createListenerStream(nextProps);
    }

    componentDidMount() {
      this.createListenerStream();
    }

    render() {
      const props = extend({}, this.props, this.getSyncProps());

      return <WrappedComponent {...props}>{props.children}</WrappedComponent>
    }
  };
}
