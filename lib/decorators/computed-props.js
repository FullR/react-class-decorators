/*
  This module needs to be refactored. It's very messy and probably slow and overly complicated
*/

import React from "react";
import {transform} from "lodash";

// function arraysMatch(arr1, arr2) {
//   return arr1 === arr2 || (
//       arr1.length === arr2.length && 
//       arr1.every((v, i) => v === arr2[i])
//     );
// }

// function resolveKeyValues(cache, props, desc, descMap) {
//   return desc.deps.map((key) => {
//     if(descMap[key]) {
//       return resolveComputedProp(cache, props, descMap[key], descMap);
//     } else {
//       return props[key];
//     }
//   });
// }

// function computeProp(cache, desc, depValues) {
//   const result = desc.compute(...depValues);
//   cache.set(desc, {result, deps: depValues});
//   return result;
// }

// function resolveComputedProp(cache, props, desc, descMap) {
//   const currentDeps = resolveKeyValues(cache, props, desc, descMap);

//   if(cache.has(desc)) {
//     const {deps, result} = cache.get(desc);
//     if(arraysMatch(deps, currentDeps)) {
//       return result;
//     } else {
//       return computeProp(cache, desc, currentDeps);
//     }
//   } else {
//     return computeProp(cache, desc, currentDeps);
//   }
// }

// // exported for testing purposes
// export function resolveComputedProps(cache, props, descMap) {
//   return transform(descMap, (computedProps, desc, key) => {
//     computedProps[key] = resolveComputedProp(cache, props, desc, descMap);
//   });
// }

function noop() {}

function arraysMatch(arr1, arr2) {
  return arr1 === arr2 || (arr1.length === arr2.length && arr1.every((v, i) => v === arr2[i]));
}

// exported for testing purposes
export function PropComputer(computedProps={}, cache=new Map()) {
  return (source={}) => {
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
      if(cache.has(computedProp)) {
        const {depValues, result} = cache.get(computedProp);
        if(arraysMatch(depValues, currentDepValues)) {
          return result;
        }
      }
      currentResult = computedProp.compute(...currentDepValues);
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
