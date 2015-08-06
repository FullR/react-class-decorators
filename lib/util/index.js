import {now} from "lodash";

export const propEq = (key, value) => (obj) => (obj && obj[key] === value);

export const uid = (function() {
  let counter = 0;
  return function uid() {
    return `${now()}-${counter++}`;
  };
}());
