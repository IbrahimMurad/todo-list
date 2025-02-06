import React from "react";
import ThemeSwitcher from "@/app/components/ThemeSwitcher";
import Auth from "@/app/components/Auth";

export default function Header(): React.ReactElement {
  return (
    <header className="w-full h-16 bg-neutral-800/50 flex justify-center">
      <div className="h-full flex gap-2 items-center justify-end min-w-[22rem] max-w-[50rem] flex-1 px-8">
        <h1 className="text-3xl font-bold text-headerColor tracking-[0.5rem] me-auto sm:text-4xl">
          TODO
        </h1>
        <Auth />
        <ThemeSwitcher />
      </div>
    </header>
  );
}
