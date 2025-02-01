"use client";

import NewTodo from "@/app/components/NewTodo";
import ListFooter from "@/app/components/ListFooter";
import React, { useState, useEffect } from "react";
import { Todo } from "@/app/types/types";
import TodoList from "./components/TodoList";
import { getData, setData } from "@/app/utils/data";
import TodoSkeleton from "./components/TodoSkeleton";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [set, setSet] = useState<Array<Todo>>([]);
  const [allTodos, setAllTodos] = useState<Array<Todo>>([]);
  const [itemsLeft, setItemsLeft] = useState<number>(allTodos.length);

  useEffect(() => {
    try {
      const storedData = getData();
      setAllTodos(storedData);
      setItemsLeft(storedData.filter((todo) => !todo.completed).length);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []); // Run once on mount

  useEffect(() => {
    const applyFilter = (todos: Array<Todo>) => {
      if (filter === "all") return todos;
      if (filter === "active") return todos.filter((todo) => !todo.completed);
      if (filter === "completed") return todos.filter((todo) => todo.completed);
      return todos;
    };

    setSet(applyFilter(allTodos));
    setItemsLeft(allTodos.filter((todo) => !todo.completed).length);
  }, [filter, allTodos]); // Run when filter or todos change

  const handleToggleComplete = (id: string) => {
    const updatedTodos = allTodos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setAllTodos(updatedTodos);
    setItemsLeft(updatedTodos.filter((todo) => !todo.completed).length);
  };

  const handleDelete = (id: string) => {
    const updatedTodos = allTodos.filter((todo) => todo.id !== id);
    setData(updatedTodos);
    setAllTodos(updatedTodos);
    setItemsLeft(updatedTodos.filter((todo) => !todo.completed).length);
  };

  const clearCompleted = () => {
    const onlyActiveTodos = allTodos.filter((todo) => !todo.completed);
    setData(onlyActiveTodos);
    setAllTodos(onlyActiveTodos);
  };

  return (
    <section className="w-full flex flex-col items-center justify-between gap-8">
      <NewTodo setAllTodos={setAllTodos} />
      {loading ? (
        <TodoSkeleton />
      ) : (
        <TodoList
          todos={set}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDelete}
        />
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
