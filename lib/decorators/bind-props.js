import React from "react";
import {extend} from "lodash";

export default function bindProps(...sourcePropObjects) {
  return (WrappedComponent) => class BindPropsWrapper extends React.Component {
    render() {
      const newProps = extend({}, this.props, ...sourcePropObjects);
      return <WrappedComponent {...newProps}>{newProps.children}</WrappedComponent>
    }
  }
}
