import React from "react";
import {extend, transform} from "lodash";

export default (...computedPropObjects) => (Component) => {
  const computedPropObject = extend({}, ...computedPropObjects);
  return class ComputedProps extends React.Component {
    render() {
      const computedProps = transform(computedPropObject, (values, computedPropFn, key) => {
        values[key] = computedPropFn(this.props);
      });

      return <Component {...this.props} {...computedProps}>{this.props.children}</Component>
    }
  };
};
