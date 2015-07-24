# Experimenting with higher order React components using ES7 decorators

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

### streamListener
`(stream, [propKey]) => (Component) => WrappedComponent`

Takes a stream and an optional prop key. When the stream fires an event, the new value is stored in the wrapper components state and then passed to the child component as a property. A couple of uses for this are dealing with window resizes and hash changes:

```javascript
const counter = flyd.stream(0);
setInterval(() => {
  counter(counter() + 1);
}, 1000);

@streamListener(counter, "count")
class CounterBox extends React.Component {
  render() {
        return (
          <div>
            count: {this.props.count}
          </div>
        );
    }
}

```

### hashListener
`(Component) => WrappedComponent`

Provides the current browser hash to Component. When the hash changes, the new value will be passed down to Component. Hash value is passed using the "hash" prop key.

```javascript
@hashListener
class Router extends React.Component {
  render() {
    switch(this.props.hash) {
      case "bar": return <Bar/>;
      case "fizz": return <Fizz/>;
      case "buzz": return <Buzz/>;
      default: return <Foobar/>;
    }
  }
}
```

### resizeListener
`(Component) => WrappedComponent`

Provides the current window width and height to Component. When the window resizes, the new width and height will be passed down to Component.

```javascript
@resizeListener
class Foo extends React.Component {
  render() {
    return (
      <div>
        <div>Window width = {this.props.windowWidth}</div>
        <div>Window height = {this.props.windowHeight}</div>
      </div>
    );
  }
}
```
