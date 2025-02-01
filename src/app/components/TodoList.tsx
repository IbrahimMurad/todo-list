"use client";

import React from "react";
import CheckCircle from "@/app/components/CheckCircle";
import { Todo } from "@/app/types/types";
import { BiX } from "react-icons/bi";

export default function TodoList({
  todos,
  onToggleComplete,
  onDelete,
}: {
  todos: Array<Todo>;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}) {
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
        <li
          key={todo.id}
          className="w-full h-16 bg-primaryBackground flex justify-start items-center px-4 gap-4 border-b border-outlinePrimary"
        >
          <CheckCircle
            completed={todo.completed}
            onClick={() => onToggleComplete(todo.id)}
          />
          <p
            onClick={() => onToggleComplete(todo.id)}
            className={`cursor-pointer ${
              todo.completed ? "line-through text-secondaryText" : ""
            }`}
          >
            {todo.text}
          </p>
          <button className="ml-auto" onClick={() => onDelete(todo.id)}>
            <BiX className="text-3xl text-secondaryText" />
          </button>
        </li>
      ))}
    </ul>
  );
}
