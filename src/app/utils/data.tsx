import { Todo } from "@/app/types/types";

export function getData(): Array<Todo> {
  // Get data from local storage and parse it as JSON
  // or return an empty array
  try {
    const storedData = localStorage.getItem("todoAppData");
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

/**
 * Saves data to local storage
 * @param {Array<Todo>} data - The data to save
 */
export function setData(data: Array<Todo>): void {
  // Save data to local storage as a JSON string
  const stringifiedData = JSON.stringify(data);
  localStorage.setItem("todoAppData", stringifiedData);
}
