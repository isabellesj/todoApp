export class TodoItem {
  todo;
  done;

  constructor(todo) {
    (this.todo = todo), (this.done = false);
  }
}
