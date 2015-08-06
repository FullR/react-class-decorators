import React from "react";

export default class TodoItem extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.todo !== nextProps.todo;
  }

  render() {
    const {todo, onClick, onRemoveClick} = this.props;
    const {id, selected, text} = todo;

    const style = {
      height: "auto",
      boxSizing: "border-box"
    };

    const textStyle = {
      fontSize: 22,
      cursor: "pointer",
      textDecoration: selected ? "line-through" : null,
      color: selected ? "#BBB" : "#333"
    };

    return (
      <section {...this.props} style={style} onClick={null}>
        <article onClick={onClick} style={textStyle}>
          {text}
        </article>
        <aside>
          <button onClick={onRemoveClick}>Remove</button>
        </aside>
      </section>
    );
  }
}
