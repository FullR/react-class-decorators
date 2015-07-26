import React from "react";

export default function hoverListener(WrappedComponent) {
  return class HoverListener extends React.Component {
    constructor(props) {
      super(props);
      this.onMouseEnter = this.onMouseEnter.bind(this);
      this.onMouseLeave = this.onMouseLeave.bind(this);
      this.state = {hovering: false};
    }
    
    onMouseEnter() {
      this.setState({
        hovering: true
      });
    }

    onMouseLeave() {
      this.setState({
        hovering: false
      });
    }

    render() {
      return (
        <WrappedComponent 
          {...this.props}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          hovering={this.state.hovering}
        >
        {this.props.children}
        </WrappedComponent>
      );
    }
  };
};
