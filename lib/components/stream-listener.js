import React from "react";
import flyd from "flyd";

export default function streamListener(stream=flyd.stream(), propKey) {
  return (WrappedComponent) => class extends React.Component {
    constructor(props) {
      super(props);
      this.state = propKey ? {
        [propKey]: stream()
      } : stream();
    }

    componentDidMount() {
      this.listenerStream = flyd.stream([stream], () => {
        const value = stream();
        this.setState(propKey ? {
          [propKey]: value
        } : value);
      });
    }

    componentWillUnmount() {
      if(this.listenerStream) {
        this.listenerStream.end(true);
      }
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state}>{this.props.children}</WrappedComponent>;
    }
  };
};
