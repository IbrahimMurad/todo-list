import React from "react";
import { ActiveFilter } from "@/app/types/types";

export default function ListFooter({
  activeFilter,
  setActiveFilter,
}: {
  activeFilter: ActiveFilter;
  setActiveFilter: React.Dispatch<
    React.SetStateAction<"all" | "active" | "completed">
  >;
}): React.ReactElement {
  return (
    <div className="flex justify-between items-center h-16 w-full relative gap-4 p-6 text-tertiaryText font-bold shadow-lg bg-primaryBackground rounded-lg">
      <small className="">5 items left</small>
      <ul className="flex align-center p-4 h-16 sm:h-auto gap-8 font-extrabold justify-center absolute sm:relative -bottom-24 left-0 sm:bottom-0 sm:left-0 w-full sm:w-fit shadow-lg bg-primaryBackground rounded-lg sm:bg-inherit sm:shadow-none sm:rounded-none">
        <li
          className={`cursor-pointer text-xl sm:text-base ${
            activeFilter === "all" ? "text-brightBlue" : "text-secondaryText"
          }`}
          onClick={() => setActiveFilter("all")}
        >
          All
        </li>
        <li
          className={`cursor-pointer text-xl sm:text-base ${
            activeFilter === "active" ? "text-brightBlue" : "text-secondaryText"
          }`}
          onClick={() => setActiveFilter("active")}
        >
          Active
        </li>
        <li
          className={`cursor-pointer text-xl sm:text-base ${
            activeFilter === "completed"
              ? "text-brightBlue"
              : "text-secondaryText"
          }`}
          onClick={() => setActiveFilter("completed")}
        >
          Completed
        </li>
      </ul>
      <button className="text-secondaryText cursor-pointer hover:text-primaryText">
        Clear completed
      </button>
    </div>
  );
}
