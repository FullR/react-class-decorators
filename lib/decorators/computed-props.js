import React from "react";
import {transform, noop} from "lodash";

function arraysMatch(arr1, arr2) {
  return arr1 === arr2 || (arr1.length === arr2.length && arr1.every((v, i) => v === arr2[i]));
}

// exported for testing purposes
export function PropComputer(computedProps={}, cache=new Map()) {
  return (source={}) => {
    const currentCache = new Map(); // used to avoid rechecking dependency values when resolving computed dependencies
    function resolveDeps(computedProp) {
      return computedProp.deps.map((key) => {
        if(computedProps[key]) {
          return resolveComputedProp(computedProps[key]);
        }
        return source[key];
      });
    }
    
    function resolveComputedProp(computedProp) {
      const currentDepValues = resolveDeps(computedProp);
      let currentResult;
      if(currentCache.has(computedProp)) {
        return currentCache.get(computedProp);
      }

      if(cache.has(computedProp)) {
        const {depValues, result} = cache.get(computedProp);
        if(arraysMatch(depValues, currentDepValues)) {
          currentCache.set(computedProp, result);
          return result;
        }
      }

      currentResult = computedProp.compute(...currentDepValues);
      currentCache.set(computedProp, currentResult);
      cache.set(computedProp, {result: currentResult, depValues: currentDepValues});
      return currentResult;
    }
    
    return transform(computedProps, (computedValues, computedProp, key) => {
      computedValues[key] = resolveComputedProp(computedProp);
    });
  };
}

export default (computedProps) => (Component) => {
  const propComputer = PropComputer(computedProps);
  return class ComputedPropsWrapper extends React.Component {
    render() {
      return (
        <Component 
          {...this.props} 
          {...propComputer(this.props)}
        >
          {this.props.children}
        </Component>
      );
    }
  };
};
