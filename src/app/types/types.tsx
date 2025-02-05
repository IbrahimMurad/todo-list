export type ActiveFilter = "all" | "active" | "completed";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  sort_order: number;
}

export type User = {
  id: number;
  email: string;
};
