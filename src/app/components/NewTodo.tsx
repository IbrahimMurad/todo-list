"use client";

import { BiPlus } from "react-icons/bi";
import React, { useState, FormEvent } from "react";
import CheckCircle from "./CheckCircle";

export default function NewTodo(): React.ReactElement {
  const [newTodo, setNewTodo] = useState<string>("");
  const [active, setActive] = useState<boolean>(false);

  const handleNewTodoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setNewTodo(e.target.value);
    if (e.target.value) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-primaryBackground rounded-lg flex items-center gap-4 p-0 h-16 justify-self-start overflow-hidden ps-6  shadow-lg"
    >
      <CheckCircle completed={false} />
      <label htmlFor="new-todo" className="sr-only">
        New todo
      </label>
      <input
        type="text"
        id="new-todo"
        placeholder="Create new todo..."
        className="h-full w-full border-none text-2xl bg-inherit text-primaryText caret-brightBlue focus:outline-none placeholder:text-secondaryText placeholder:text-xl"
        value={newTodo}
        onChange={handleNewTodoChange}
      />
      <button
        type="button"
        id="submit-new"
        className={`h-full w-16 bg-inherit border-none flex justify-center items-center cursor-not-allowed ${
          active ? "cursor-pointer hover:bg-backgroundHover" : ""
        }`}
      >
        <BiPlus
          className={`font-black text-4xl ${
            active ? "text-brightBlue" : "text-secondaryText"
          }`}
        />
      </button>
    </form>
  );
}
