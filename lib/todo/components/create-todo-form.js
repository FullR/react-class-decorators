import React from "react";
import defaultProps from "decorators/default-props";

@defaultProps({
  onSubmit() {}
})
export default class CreateTodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.submit = ::this.submit;
    this.updateValue = ::this.updateValue;
    this.state = {value: ""};
  }

  updateValue(event) {
    this.setState({value: event.target.value});
  }

  submit(event) {
    event.preventDefault();
    this.setState({value: ""});
    this.props.onSubmit({text: this.state.value});
  }

  render() {
    const inputStyle = {
      width: "100%"
    };
    return (
      <section>
        <form onSubmit={this.submit}>
          <article>
            <input style={inputStyle} value={this.state.value} onChange={this.updateValue}/>
          </article>
          <aside>
            <button onClick={this.submit}>Add</button>
          </aside>
        </form>
      </section>
    );
  }
}
