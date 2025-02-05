"use client";

import NewTodo from "@/app/components/NewTodo";
import ListFooter from "@/app/components/ListFooter";
import React, { useState, useEffect } from "react";
import { Todo } from "@/app/types/types";
import TodoList from "@/app/components/TodoList";
import TodoSkeleton from "@/app/components/TodoSkeleton";
import { applyFilter } from "@/app/services";
import { useTodos } from "@/app/context/todos";

export default function Home() {
  const { todos, loading } = useTodos();

  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [todoSet, setTodoSet] = useState<Array<Todo>>([]);

  useEffect(() => {
    const filteredTodos = applyFilter(todos, filter).sort(
      (a, b) => a.sort_order - b.sort_order
    );
    setTodoSet([...filteredTodos]);
  }, [filter, todos]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="w-full flex flex-col items-center justify-between gap-8">
      <NewTodo />
      {loading ? <TodoSkeleton /> : <TodoList todoSet={todoSet} />}
      <ListFooter activeFilter={filter} setFilter={setFilter} />
    </section>
  );
}
