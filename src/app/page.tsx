"use client";

import NewTodo from "@/app/components/NewTodo";
import ListFooter from "@/app/components/ListFooter";
import React, { useState, useEffect } from "react";
import { Todo } from "@/app/types/types";
import TodoList from "./components/TodoList";
import { getData, setData } from "@/app/utils/data";
import TodoSkeleton from "./components/TodoSkeleton";
import { reOrderTodos } from "@/app/utils/utils";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  // allTodos is the master list of todos, set is the list that is displayed (filter is considered)
  const [allTodos, setAllTodos] = useState<Array<Todo>>([]);
  const [set, setSet] = useState<Array<Todo>>([]);
  const [itemsLeft, setItemsLeft] = useState<number>(allTodos.length);

  // Load data from local storage on first render and set it to allTodos
  useEffect(() => {
    try {
      const storedData = getData();
      setAllTodos(storedData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Update the set of todos when the filter or allTodos change
  useEffect(() => {
    // Apply filter to todos
    const applyFilter = (todos: Array<Todo>) => {
      if (filter === "all") return todos;
      if (filter === "active") return todos.filter((todo) => !todo.completed);
      if (filter === "completed") return todos.filter((todo) => todo.completed);
      return todos;
    };

    const filteredTodos = applyFilter(allTodos).sort(
      (a, b) => a.order - b.order
    );
    setSet([...filteredTodos]);
    setItemsLeft(allTodos.filter((todo) => !todo.completed).length);

    // Update local storage with the new set of todos whenever allTodos changes
    setData(reOrderTodos(allTodos));
  }, [filter, allTodos]); // Run when filter or todos change

  const clearCompleted = () => {
    const onlyActiveTodos = allTodos.filter((todo) => !todo.completed);
    const updatedTodos = reOrderTodos(onlyActiveTodos);
    setData(updatedTodos);
    setAllTodos(updatedTodos);
  };

  return (
    <section className="w-full flex flex-col items-center justify-between gap-8">
      <NewTodo allTodos={allTodos} setAllTodos={setAllTodos} />
      {loading ? (
        <TodoSkeleton />
      ) : (
        <TodoList todos={set} allTodos={allTodos} setAllTodos={setAllTodos} />
      )}
      <ListFooter
        activeFilter={filter}
        setFilter={setFilter}
        itemsLeft={itemsLeft}
        onClearCompleted={clearCompleted}
      />
    </section>
  );
}
