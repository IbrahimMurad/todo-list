export type ActiveFilter = "all" | "active" | "completed";

export interface Todo {
  id: string;
  order: number;
  text: string;
  completed: boolean;
}
