import {merge} from "lodash";

export function mergeWhere(predicateFn, mergeFn) {
  return this.map((v) => predicateFn(v) ? merge({}, mergeFn(v) || {}) : v);
}
