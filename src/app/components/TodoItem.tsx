"use client";

import React, { useState } from "react";
import { Todo } from "@/app/types/types";
import CheckCircle from "@/app/components/CheckCircle";
import { BiX } from "react-icons/bi";

export default function TodoItem({
  todo,
  onToggleComplete,
  onDelete,
  newOrder,
}: {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  newOrder: () => void;
}) {
  const [dragging, setDragging] = useState(false);
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("id", todo.id);
    setDragging(true);
  };

  const handleDragEnd = () => {
    setDragging(false);
    newOrder();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();

    // Get the target element which is being dragged over
    const target = e.target as HTMLElement;

    // Get the element which is being dragged
    const dragged = document.querySelector(
      `[data-dragging="true"]`
    ) as HTMLElement;

    const draggedOrder = dragged.dataset.order || "0";
    const targetOrder = target.dataset.order || "0";
    // Get the parent element of the target (the list)
    const parent = target.parentElement as HTMLElement;

    // Get the bounding box of the target
    const offset = target.getBoundingClientRect();

    /* Enusre that the target is a todo item or do nothing
     * Enusre that the user is dragging the todo item over the middle of the target (between top and bottom)
     * If the user is moving up, only move the dragged item when the mouse in the top half of the target
     * This is done by checking which half of the target the mouse is in
     * Then compare the current order of the dragged item and the target item
     * For example, if the user is moving up, the dragged item should be inserted before the target item
     * only if the target item has a higher order and the mouse is in the top half of the target.
     * And vice versa for moving down.
     * This is logical since when moving up, the dragged item is already after the target item and vice versa.
     * Then swap the order of the dragged and target items.
     */

    if (target.dataset.type === "todo") {
      if (e.clientY > offset.top && e.clientY < offset.bottom) {
        if (e.clientY - offset.top > offset.bottom - e.clientY) {
          if (targetOrder < draggedOrder) return;
          parent.insertBefore(dragged, target.nextSibling);
        } else {
          if (targetOrder > draggedOrder) return;
          parent.insertBefore(dragged, target);
        }
        dragged.dataset.order = targetOrder;
        target.dataset.order = draggedOrder;
      }
    }
  };

  return (
    <li
      key={todo.id}
      data-type="todo"
      data-id={todo.id}
      data-order={todo.order}
      data-dragging={dragging}
      className={`w-full h-16 bg-primaryBackground
      flex justify-start items-center px-4 gap-4 border-b
      border-outlinePrimary
      ${
        dragging
          ? "shadow-lg rounded-lg bg-gray-300/50 dark:bg-gray-500/50 transform translate-x-1 transition-transform"
          : ""
      }
      `}
      draggable={true}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
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
  );
}
