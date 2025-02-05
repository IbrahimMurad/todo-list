"use client";

import { BiPlus } from "react-icons/bi";
import React, { useState, FormEvent } from "react";
import CheckCircle from "./CheckCircle";
import styled, { css } from "styled-components";
import { useTodos } from "@/app/context/todos";
import { useSession } from "next-auth/react";
import { addTodo } from "@/app/lib/dbData";

const StyledForm = styled.form`
  width: 100%;
  background-color: var(--primary-background);
  border-radius: 0.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  padding: 0;
  height: 4rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding-inline-start: 1.5rem;
`;

const StyledInput = styled.input`
  height: 100%;
  width: 100%;
  border-radius: 0.5rem;
  border: none;
  font-size: 1.5rem;
  background-color: inherit;
  color: var(--primary-text);
  caret-color: var(--bright-blue);

  &::placeholder {
    color: var(--secondary-text);
    font-size: 1.25rem;
  }

  &:focus {
    outline: none;
  }
`;

const StyledButton = styled.button<{ $active: boolean }>`
  width: 5rem;
  height: 100%;
  background-color: inherit;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props.$active ? "pointer" : "not-allowed")};

  ${(props) =>
    props.$active &&
    css`
      &:hover {
        background-color: var(--background-hover);
      }
    `}
`;

export default function NewTodo(): React.ReactElement {
  const { status } = useSession();
  const { todos, setTodos } = useTodos();
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
    if (newTodo) {
      const newTodoItem = {
        id: crypto.randomUUID(),
        text: newTodo,
        completed: false,
        sort_order: todos.length,
      };
      if (status === "loading") {
        alert("Please wait until the list is loaded.");
        return;
      }
      if (status === "authenticated") {
        addTodo(newTodoItem).then(() => {
          setTodos([...todos, newTodoItem]);
        });
      }
      if (status === "unauthenticated") {
        setTodos([...todos, newTodoItem]);
      }
      setNewTodo("");
      setActive(false);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <CheckCircle completed={false} />
      <label htmlFor="new-todo" className="sr-only">
        New todo
      </label>
      <StyledInput
        type="text"
        id="new-todo"
        placeholder="Create new todo..."
        value={newTodo}
        onChange={handleNewTodoChange}
      />
      <StyledButton type="submit" id="submit-new" $active={active}>
        <BiPlus
          className={`font-black text-4xl ${
            active ? "text-brightBlue" : "text-secondaryText"
          }`}
        />
      </StyledButton>
    </StyledForm>
  );
}
