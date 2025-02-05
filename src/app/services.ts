import { Todo } from "@/app/types/types";

export const applyFilter = (
  todos: Array<Todo>,
  filter: "all" | "active" | "completed"
) => {
  if (filter === "all") return todos;
  if (filter === "active") return todos.filter((todo) => !todo.completed);
  if (filter === "completed") return todos.filter((todo) => todo.completed);
  return todos;
};

export function reOrderTodos(
  todos: Array<Todo>,
  parent: HTMLElement | null = null
): Array<Todo> {
  if (parent) {
    const children = Array.from(parent.children);
    const newTodos = todos.map((todo) => {
      const element = children.find(
        (child) => child.getAttribute("data-id") === todo.id
      );
      if (element) {
        todo.sort_order = parseInt(
          element.getAttribute("data-order") as string
        );
      }
      return todo;
    });
    return newTodos;
  }
  return todos.map((todo, index) => {
    todo.sort_order = index;
    return todo;
  });
}
