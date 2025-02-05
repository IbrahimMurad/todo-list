import React, { useState, useEffect } from "react";
import { ActiveFilter } from "@/app/types/types";
import { useTodos } from "@/app/context/todos";
import { removeCompleted, updateTodoOrder } from "@/app/lib/dbData";
import { setLocalData } from "@/app/lib/localData";
import { reOrderTodos } from "@/app/services";
import { useSession } from "next-auth/react";

export default function ListFooter({
  activeFilter,
  setFilter,
}: {
  activeFilter: ActiveFilter;
  setFilter: React.Dispatch<
    React.SetStateAction<"all" | "active" | "completed">
  >;
}): React.ReactElement {
  const { status } = useSession();
  const { todos, setTodos } = useTodos();
  const [itemsLeft, setItemsLeft] = useState<number>(0);
  const [clearing, setClearing] = useState<boolean>(false);

  useEffect(() => {
    const itemsLeft = todos.filter((todo) => !todo.completed).length;
    setItemsLeft(itemsLeft);
  }, [todos]);

  const clearCompleted = () => {
    setClearing(true);
    if (status === "authenticated") {
      removeCompleted()
        .then(() => {
          const onlyActiveTodos = todos.filter((todo) => !todo.completed);
          const updatedTodos = reOrderTodos(onlyActiveTodos);
          setTodos(updatedTodos);
          updateTodoOrder(updatedTodos);
          setClearing(false);
        })
        .catch((error) => {
          console.log(error);
          alert("An error occurred. Please try again.");
          setClearing(false);
        });
      return;
    }
    const onlyActiveTodos = todos.filter((todo) => !todo.completed);
    const updatedTodos = reOrderTodos(onlyActiveTodos);
    setLocalData(updatedTodos);
    setTodos(updatedTodos);
    setClearing(false);
  };

  return (
    <div className="flex justify-between items-center h-16 w-full relative gap-4 p-6 text-tertiaryText font-bold shadow-lg bg-primaryBackground rounded-lg">
      <small className="">{itemsLeft} items left</small>
      <ul className="text-lg flex align-center p-4 h-16 sm:h-auto gap-8 font-extrabold justify-center absolute sm:relative -bottom-24 left-0 sm:bottom-0 sm:left-0 w-full sm:w-fit shadow-lg bg-primaryBackground rounded-lg sm:bg-inherit sm:shadow-none sm:rounded-none">
        <li>
          <button
            className={`cursor-pointer ${
              activeFilter === "all" ? "text-brightBlue" : "text-secondaryText"
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
        </li>
        <li>
          <button
            className={`cursor-pointer ${
              activeFilter === "active"
                ? "text-brightBlue"
                : "text-secondaryText"
            }`}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
        </li>
        <li>
          <button
            className={`cursor-pointer ${
              activeFilter === "completed"
                ? "text-brightBlue"
                : "text-secondaryText"
            }`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </li>
      </ul>
      {clearing ? (
        <div className="animate-pulse">Clearing...</div>
      ) : (
        <button className="cursor-pointer text-lg" onClick={clearCompleted}>
          Clear Completed
        </button>
      )}
    </div>
  );
}
