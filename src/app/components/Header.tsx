import React from "react";
import ThemeSwitcher from "@/app/components/ThemeSwitcher";

export default function Header(): React.ReactElement {
  return (
    <header className="flex justify-between w-full">
      <h1 className="text-4xl font-bold text-headerColor tracking-[0.5rem]">
        TODO
      </h1>
      <ThemeSwitcher />
    </header>
  );
}
