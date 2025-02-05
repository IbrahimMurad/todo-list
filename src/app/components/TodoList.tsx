"use client";

import React from "react";
import { Todo } from "@/app/types/types";
import TodoItem from "@/app/components/TodoItem";

export default function TodoList({ todoSet }: { todoSet: Array<Todo> }) {
  // Only show empty state when we have confirmed there are no todos
  if (todoSet.length === 0) {
    return (
      <p className="w-full h-16 bg-primaryBackground flex justify-center shadow-lg rounded-lg items-center">
        No todos yet!
      </p>
    );
  }

  return (
    <ul className="w-full flex flex-col rounded-lg shadow-lg overflow-hidden">
      {todoSet.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
