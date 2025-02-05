"use server";

import { Todo } from "@/app/types/types";
import postgres from "postgres";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { User } from "@/app/types/types";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function getCurrentUser(): Promise<User | null> {
  const session = await getServerSession(options);
  const email = session?.user?.email;
  if (!email) {
    return null;
  }
  const user = (
    await sql<User[]>`SELECT * FROM users WHERE email = ${email}`
  )[0];
  if (user) return user;
  const newUser = await sql<
    User[]
  >`INSERT INTO users (email) VALUES (${email}) RETURNING *`;
  return newUser[0];
}

export async function getDbData(): Promise<Array<Todo>> {
  const user = await getCurrentUser();
  if (!user) return [];
  return sql<Todo[]>`SELECT * FROM todos WHERE user_id = ${user.id}`;
}

export async function addTodo(todo: Todo): Promise<void> {
  const user = await getCurrentUser();
  console.log("user", user);
  if (!user) return;
  await sql`INSERT INTO todos (id, user_id, text, completed, sort_order) VALUES (${todo.id}, ${user.id}, ${todo.text}, ${todo.completed}, ${todo.sort_order})`;
}

export async function removeTodo(id: string): Promise<void> {
  await sql`DELETE FROM todos WHERE id = ${id}`;
  console.log("Deleted todo with id", id);
}

export async function removeCompleted(): Promise<Array<Todo> | void> {
  const user = await getCurrentUser();
  if (user) {
    return await sql<
      Array<Todo>
    >`DELETE FROM todos WHERE user_id = ${user.id} AND completed = true`;
  }
}

export async function updateTodoStatus(
  id: string,
  status: boolean
): Promise<void> {
  await sql`UPDATE todos SET completed = ${status} WHERE id = ${id}`;
}

export async function updateTodoOrder(todos: Array<Todo>): Promise<void> {
  todos.forEach(async (todo) => {
    await sql`UPDATE todos SET sort_order = ${todo.sort_order} WHERE id = ${todo.id}`;
  });
}
