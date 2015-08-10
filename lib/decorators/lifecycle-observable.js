import React from "react";
import Rx from "rx";
import {extend, invoke, filter, isFunction} from "lodash";

function onNextLifecycle(value) {
  if(this.lifecycle) {
    this.lifecycle.onNext(value);
  }
}

function maybeCall(fn, context, args) {
  return isFunction(fn) ? fn.apply(context, args) : null;
}

export default (Component) => class extends Component {
  getLifecycle() {
    return this.lifecycle || (this.lifecycle = new Rx.Subject());
  }

  componentDidMount() {
    this::onNextLifecycle({
      method: "componentDidMount",
      args: []
    });
    maybeCall(super.componentDidMount, this);
  }

  componentWillReceiveProps(nextProps) {
    this::onNextLifecycle({
      method: "componentWillReceiveProps",
      args: [nextProps]
    });
    maybeCall(super.componentWillReceiveProps, this, [nextProps]);
  }

  componentWillUpdate(nextProps, nextState) {
    this::onNextLifecycle({
      method: "componentWillUpdate",
      args: [nextProps, nextState]
    });
    maybeCall(super.componentWillUpdate, this, [nextProps, nextState]);
  }

  componentDidUpdate(nextProps, nextState) {
    this::onNextLifecycle({
      method: "componentDidUpdate",
      args: [nextProps, nextState]
    });
    maybeCall(super.componentDidUpdate, this, [nextProps, nextState]);
  }

  componentWillUnmount() {
    this::onNextLifecycle({
      method: "componentWillUnmount",
      args: []
    });
    if(this.lifecycle) {
      this.lifecycle.dispose();
    }
    super.componentWillUnmount();
  }
};
