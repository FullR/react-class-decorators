# Experimenting with higher-order React components using ES7 decorators

## About
Inspired by [this gist](https://gist.github.com/sebmarkbage/ef0bf1f338a7182b6775) by Sebastian Markbåge.
These examples use the proposed [ES7 decorator syntax](https://github.com/wycats/javascript-decorators) and are compiled using [Babel](https://github.com/babel/babel).

## Build, Test and Run

**Setup**
```bash
git clone https://github.com/FullR/react-class-decorators.git
cd react-class-decorators
sudo npm install gulp --global # Ignore if you already have gulp installed
npm install
```

**Test**
```bash
npm run test
```

**Build**
```bash
gulp build
```

**Run**
```bash
gulp
# Navigate to http://127.0.0.1:8080/ to view examples
```

## Examples

### bindProps
`(...[sourceProps]) => (Component) => WrappedComponent`

Takes any number of source objects and merges them with the props passed to Component creating a new props object which is passed to WrappedComponent. This decorator does not mutate the original props object passed into WrappedComponent.

```javascript
@bindProps({foo: "bar"})
class Foo extends React.Component {
  render() { // this.props.foo will always be "bar"
    return <div>{this.props.foo}</div>
  }
}
```

### defaultProps
`(...[defaultPropsObject]) => (Component) => WrappedComponent`

Defaults the values passed to the wrapped component. Unlike React's built-in `defaultProps` values, this decorator does not use a static attribute to store default values.

```javascript
@defaultProps({firstname: "joe", lastname: "schmoe"})
class Person extends React.Component {
  render() {
    return <div>{this.props.firstname} {this.props.lastname}</div>;
  }
}
```

### computedProps
`(computedPropMap) => (Component) => WrappedComponent`

Takes an object that defines computed properties as a list of dependent property keys and a compute function `{deps: ...Keys, compute: Function}`.
When the wrapped component receives new props, computed properties will be lazily recomputed. Computed props can rely on other computed props (circular dependencies are not supported).

```javascript
@computedProps({
  fullname: {
    deps: ["firstname", "lastname"],
    compute(fname, lname) {
      return `${fname} ${lname}`;
    }
  }
})
class Person extends React.Component {
  render() {
    return (<span>{this.props.fullname}</span>);
  }
}
```

### rxProps
`(...propKeys) => (Component) => WrappedComponent`

Takes an array of prop names. When the wrapped component is passed properties, the props passed to rxProps will be subscribed to if they're streams. The wrapped component
will be updated with the streamed values of those props.

```javascript
const count = new Rx.BehaviorSubject(0);

function increment() {
  count.onNext(count.getValue() + 1);
}

function decrement() {
  count.onNext(count.getValue() - 1);
}

@rxProps("count")
class Counter extends React.Component {
  render() {
    return (
      <div>
        <button onClick={decrement}>-</button>
        {this.props.count}
        <button onClick={increment}>+</button>
      </div>
    );
  }
}

React.render(<Counter count={count}/>, document.body);
```

### propState
`(propStateDef) => (Component) => WrappedComponent`

Takes an object thats keys defines propNames and values define variable description objects (shape: `{value, reduce:Function}`) that should be persisted beyond updates. The values will be passed as objects with this shape: `{value, [update]}`. When `update` is called, a new value will be generated using the variable descriptor's `reduce` function.

```javascript
@propState({
  count: {
    value: 0,
    reduce(current, change) {
      return current + change;
    }
  }
})
export default class CounterExample extends React.Component {
  render() {
    const {count} = this.props;
    return (
      <section>
        <button onClick={() => count.update(-1)}>-</button>
        <span>{count.value}</span>
        <button onClick={() => count.update(1)}>+</button>
      </section>
    );
  }
}
```

## About the author
Hello, my name is James, and I'm a full stack web developer currently looking for work.

james.meyers919@gmail.com
