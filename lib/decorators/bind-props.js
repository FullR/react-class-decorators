import React from "react";
import {extend} from "lodash";

export default function bindProps(...sourcePropObjects) {
  const sourceObject = extend({}, ...sourcePropObjects);
  return (WrappedComponent) => class BindPropsWrapper extends React.Component {
    render() {
      const newProps = extend({}, this.props, sourceObject);
      return <WrappedComponent {...newProps}>{newProps.children}</WrappedComponent>
    }
  }
}
