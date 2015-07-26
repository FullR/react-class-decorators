# Experimenting with higher order React components using ES7 decorators

## Syntax
These examples use the proposed [ES7 decorator syntax](https://github.com/wycats/javascript-decorators) and are compiled using [Babel](https://github.com/babel/babel).

## Build and Run

```bash
git clone https://github.com/FullR/react-class-decorators.git
cd react-class-decorators
sudo npm install gulp --global # Ignore if you already have gulp installed
npm install
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

### computedProps
`(...[computedPropsObject]) => (Component) => WrappedComponent`

Takes object's who's values are functions that take the wrapped components props and produce new props that will be passed to the wrapped component.

```javascript
@computedProps({
  fullname({firstname, lastname}) {
    return `${firstname} ${lastname}`;
  }
})
class Person extends React.Component {
  render() {
    return <div>{this.props.fullname}</div>
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

### streamProps
`(...propNames) => (Component) => WrappedComponent`

Watches the passed props (if they're streams) and passes their streamed values to the wrapped component.

```javascript
const requests = flyd.stream();
const responses = flyd.stream([requests], (self) => {
  get("/api/things").then((things) => {
    self(things); // causes responses to emit things
  });
});

@bindProps({things: responses})
@streamProps("things")
class ThingViewer extends React.Component {
  componentDidMount() {
    requests(true);
  }

  render() {
    ...render this.props.things
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

