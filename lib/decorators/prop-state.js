/*

How I'd like to use it:

@propState({
  username: {
    value: "",
    update(event) {
      return event.target.value;
    }
  }
})
class LoginForm extends React.Component {
  render() {
    const {username} = this.props;
    return (
      <form>
        <input name="username" value={username.value} onChange={username.update}/>
      </form>
    );
  }
}
*/

import React from "react";
import Rx from "rx";
import bindProps from "./bind-props";
import rxProps from "./rx-props";
import {extend, transform, isFunction, identity} from "lodash";

// exported for testing purposes
export function createPropStateObservable(mapObj) {
  return Rx.Observable.create((observer) => {
    let initialState = transform(mapObj, (state, def, key) => {
      const {reduce=identity} = def;
      let {value} = def;

      const update = (...args) => {
        value = reduce(value, ...args);
        observer.onNext({
          [key]: {
            value,
            update: update
          }
        });
      };
      const stateProp = {value, update: update};
      state[key] = stateProp;
    });

    observer.onNext(initialState);
    return () => {
      initialState = null;
    };
  });
}

export default function propState(mapObj) {
  return (Component) => {
    return class PropStateWrapper extends React.Component {
      constructor(props) {
        super(props);
        this.state = transform(mapObj, (state, {value}={}, key) => {
          state[key] = value;
        });
      }

      componentDidMount() {
        this.sub = createPropStateObservable(mapObj).subscribe((sourceStateObj) => {
          this.setState(extend({}, this.state, sourceStateObj));
        });
      }

      componentWillUnmount() {
        this.sub.dispose();
      }

      render() {
        return (
          <Component {...this.props} {...this.state}>{this.props.children || this.state.children}</Component>
        );
      }
    }
  };
};
