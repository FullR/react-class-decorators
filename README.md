# Experimenting with higher order React components using ES7 decorators


### Stream Listener 
`(stream, [propKey]) => (ReactComponent) => WrappedReactComponent`

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
