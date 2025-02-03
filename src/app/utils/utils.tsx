import { Todo } from "@/app/types/types";

export function reOrderTodos(todos: Array<Todo>): Array<Todo> {
  return todos.map((todo, index) => {
    return { ...todo, order: index };
  });
}
