import LocalStorageStore from "flux/localstorage-store";
import {mergeWhere} from "util/array";
import {propEq, uid} from "util/index";
import {extend} from "lodash";

export default class TodoStore extends LocalStorageStore {
  constructor(namespace, actions={}) {
    super(namespace, {
      todos: [
        {text: "take out trash", selected: false},
        {text: "walk dog", selected: false},
        {text: "destroy moon", selected: true}
      ].map((todo, i) => {
        todo.id = uid();
        return todo;
      })
    });

    this.listenTo(actions);
  }

  create(todoData, {text}) {
    if(text && text.length) {
      return extend({}, todoData, {
        todos: todoData.todos.concat({
          text,
          selected: false,
          id: uid()
        })
      });
    }
  }

  toggle(todoData, {id}) {
    return extend({}, todoData, {
      todos: todoData.todos.map((todo) => {
        if(todo.id === id) {
          return extend({}, todo, {selected: !todo.selected});
        }
        return todo;
      })
    });
  }

  remove(todoData, {id}) {
    return extend({}, todoData, {
      todos: todoData.todos.filter((todo) => todo.id !== id)
    });
  }

  clearComplete(todoData) {
    return extend({}, todoData, {
      todos: todoData.todos.filter((todo) => !todo.selected)
    });
  }
};
