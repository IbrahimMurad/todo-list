"use client";
import { useTheme } from "next-themes";
import { getImageProps } from "next/image";
import desktopLight from "@/app/images/bg-desktop-light.jpg";
import desktopDark from "@/app/images/bg-desktop-dark.jpg";
import mobileLight from "@/app/images/bg-mobile-light.jpg";
import mobileDark from "@/app/images/bg-mobile-dark.jpg";

export default function Background() {
  const { theme } = useTheme();

  const common = {
    alt: "Background",
    objectFit: "cover",
    objectPosition: "center",
  };

  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    src: theme === "dark" ? desktopDark : desktopLight,
    width: "1440",
    height: "400",
    quality: 100,
  });

  const {
    props: { srcSet: mobile },
  } = getImageProps({
    ...common,
    src: theme === "dark" ? mobileDark : mobileLight,
    width: "375",
    height: "200",
    quality: 100,
  });

  return (
    <picture className="block w-full absolute top-0 left-0 z-[-1]">
      <source media="(max-width: 640px)" srcSet={mobile} />
      <source media="(min-width: 641px)" srcSet={desktop} />
      <img className="w-full" />
    </picture>
  );
}
