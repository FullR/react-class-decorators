import Rx from "rx";
import {extend, pairs, isFunction, isString} from "lodash";

export default class Store {
  constructor(data={}) {
    this.data = data;
    this.subject = new Rx.BehaviorSubject(data);
    this.stream = this.subject;
    this.subscriptions = [];
  }

  listenTo(actionMap={}) {
    const subscriptions = pairs(actionMap)
    .filter(([fnName, action]) => action && action.stream)
    .map(([fnName, action]) => {
      return action.stream.subscribe((payload) => {
        this.modify(this[fnName].bind(this), payload);
      });
    });

    this.subscriptions.push(...subscriptions);

    return this;
  }

  modify(fn, ...args) {
    const newData = extend({}, fn(this.stream.getValue(), ...args));
    if(newData != null) { // non-strict inequality is intentional
      this.subject.onNext(newData);
    }
  }
};
