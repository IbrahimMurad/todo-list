"use client";

import React from "react";
import { Todo } from "@/app/types/types";
import TodoItem from "@/app/components/TodoItem";

export default function TodoList({
  todos,
  allTodos,
  setAllTodos,
}: {
  todos: Array<Todo>;
  allTodos: Array<Todo>;
  setAllTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}) {
  const handleToggleComplete = (id: string) => {
    const updatedTodos = allTodos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setAllTodos(updatedTodos);
  };

  const handleDelete = (id: string) => {
    const updatedTodos = allTodos.filter((todo) => todo.id !== id);
    setAllTodos(updatedTodos);
  }; //

  const updateOrder = () => {
    // update the order of the todos based on the order in the dataset of the todo elements
    const todoElements = Array.from(
      document.querySelectorAll("[data-type='todo']")
    );
    const updatedTodos = [...allTodos];
    todoElements.forEach((el) => {
      const id = el.getAttribute("data-id");
      updatedTodos.forEach((todo) => {
        if (todo.id === id) {
          todo.order = Number(el.getAttribute("data-order"));
        }
      });
    });
    setAllTodos(updatedTodos);
  };

  // Only show empty state when we have confirmed there are no todos
  if (todos.length === 0) {
    return (
      <p className="w-full h-16 bg-primaryBackground flex justify-center shadow-lg rounded-lg items-center">
        No todos yet!
      </p>
    );
  }

  return (
    <ul className="w-full flex flex-col rounded-lg shadow-lg overflow-hidden">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDelete}
          newOrder={updateOrder}
        />
      ))}
    </ul>
  );
}
