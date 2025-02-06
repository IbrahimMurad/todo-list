"use client";

import desktopBackground from "@/app/images/background-large.svg";
import mobileBackground from "@/app/images/background-small.svg";

export default function Background() {
  return (
    <picture className="block w-full absolute top-0 left-0 z-[-1] opacity-60">
      <source media="(max-width: 1027px)" srcSet={mobileBackground.src} />
      <source media="(min-width: 1028px)" srcSet={desktopBackground.src} />
      <img
        itemType="SVG"
        className="w-full"
        alt="Background"
        src={desktopBackground.src}
        style={{ height: "auto", width: "auto" }}
      />
    </picture>
  );
}
