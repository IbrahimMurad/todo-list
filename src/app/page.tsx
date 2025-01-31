"use client";

import NewTodo from "@/app/components/NewTodo";
import ListFooter from "@/app/components/ListFooter";
import React, { useState } from "react";

export default function Home() {
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  return (
    <section className="w-full flex flex-col items-center justify-between gap-8">
      <NewTodo />
      <ul></ul>
      <ListFooter activeFilter={filter} setActiveFilter={setFilter} />
    </section>
  );
}
