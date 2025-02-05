"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getDbData } from "@/app/lib/dbData";
import { getLocalData } from "@/app/lib/localData";
import { Todo } from "@/app/types/types";

interface TodosContextType {
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  loading: boolean;
}

const todosContext = createContext<TodosContextType>({
  todos: [],
  setTodos: () => {},
  loading: false,
});

export function useTodos() {
  return useContext(todosContext);
}

export function TodosProvider({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;

    if (status === "authenticated") {
      getDbData().then((dbTodos) => {
        setTodos(dbTodos);
        setLoading(false);
      });
    } else {
      const localData = getLocalData();
      setTodos(localData);
      setLoading(false);
    }
  }, [status]);

  return (
    <todosContext.Provider value={{ todos, setTodos, loading }}>
      {children}
    </todosContext.Provider>
  );
}
