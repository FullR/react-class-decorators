import React from "react";
import {extend} from "lodash";

export default function bindProps(...sourceProps) {
  const boundProps = extend({}, ...sourceProps);
  return (WrappedComponent) => class BindPropsWrapper extends React.Component {
    render() {
      return <WrappedComponent {...this.props} {...boundProps}>{boundProps.children || this.props.children}</WrappedComponent>
    }
  }
}
