"use client";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Image from "next/image";
import iconSun from "@/app/images/icon-sun.svg";
import iconMoon from "@/app/images/icon-moon.svg";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      className="flex justify-center items-center w-8 h-8 cursor-pointer hover:bg- rounded-full hover:bg-slate-500"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Image
        src={theme === "dark" ? iconSun : iconMoon}
        alt="Theme switcher"
        width={24}
        height={24}
      />
    </button>
  );
}
