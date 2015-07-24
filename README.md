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
// get window dimensions
function getWindowDims() {
  return {
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight
  };
}

// Currently streamListener only support flyd streams (https://github.com/paldepind/flyd)
const dimensionStream = flyd.stream(getWindowDims());

// when the window resizes, push the new dimensions into the stream
window.addEventListener("resize", () => dimensionStream(getWindowDims()));

@streamListener(dimensionStream)
class ResizingBox extends React.Component {
  render() {
      // these props are provided by the wrapping component created by streamListener
      const {windowWidth, windowHeight} = this.props;
        const style = {
          width: windowWidth * 0.5, 
          height: windowHeight * 0.5
        };
        return (
          <div style={style}>
            {this.props.children}
          </div>
        );
    }
}

```
