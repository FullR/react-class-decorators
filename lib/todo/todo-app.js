import React from "react";
import createTodoActions from "todo/create-todo-actions";
import TodoStore from "todo/todo-store";
import TodoList from "todo/components/todo-list";
import CreateTodoForm from "todo/components/create-todo-form";

const filters = {
  all: null,
  complete: (todos) => todos.filter((todo) => !!todo.selected),
  incomplete: (todos) => todos.filter((todo) => !todo.selected)
};

export default class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.actions = createTodoActions();
    this.store = new TodoStore("todo-app", this.actions);
    this.todos = this.store.stream.map((todoData) => todoData.todos);

    this.state = {
      filter: null
    };
  }

  setFilter(filterKey="all") {
    return () => this.setState({
      filter: filters[filterKey] || null
    });
  }

  render() {
    const {store, actions} = this;
    const {create, toggle, remove, clearComplete} = actions;
    const {filter} = this.state;

    return (
      <div>
        <section>
          <button onClick={this.setFilter("all")}>All</button>
          <button onClick={this.setFilter("complete")}>Complete</button>
          <button onClick={this.setFilter("incomplete")}>Incomplete</button>
        </section>
        <TodoList 
          todos={filter ? this.todos.map(filter) : this.todos} 
          toggleTodo={toggle} 
          removeTodo={remove}
        />
        
        <button onClick={clearComplete}>Clear Completed</button>
        <CreateTodoForm onSubmit={create}/>
      </div>
    );
  }
}
