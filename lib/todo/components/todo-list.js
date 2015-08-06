import React from "react";
import rxProps from "decorators/rx-props";
import defaultProps from "decorators/default-props";
import TodoItem from "todo/components/todo-item";
const noop = () => {};

@rxProps("todos")
@defaultProps({
  todos: [],
  toggleTodo: noop,
  removeTodo: noop
})
export default class TodoList extends React.Component {
  render() {
    const {todos, toggleTodo, removeTodo} = this.props;
    return (
      <div>
        {todos.map((todo) => 
          <TodoItem
            key={`todo-${todo.id}`}
            todo={todo}
            onClick={() => toggleTodo(todo)}
            onRemoveClick={() => removeTodo(todo)}
          />
        )}
      </div>
    );
  }
}
