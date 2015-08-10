import React from "react";
import {extend, defaults} from "lodash";

export default (...defaultPropObjects) => (Component) => {
  const defaultPropObject = extend({}, ...defaultPropObjects);
  return class DefaultPropWrapper extends React.Component {
    render() {
      return (
        <Component {...defaults({}, this.props, defaultPropObject)}>
          {this.props.children || defaultPropObject.children}
        </Component>
      );
    }
  }
};
