import React from "react";
import {extend, defaults} from "lodash";

export default (...defaultPropObjects) => (Component) => {
  const defaultPropObject = extend({}, ...defaultPropObjects);
  return class extends React.Component {
    render() {
      const props = defaults({}, this.props, defaultPropObject);
      return <Component {...props}>{props.children}</Component>;
    }
  }
};
