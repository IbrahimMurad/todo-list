"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Auth() {
  const { status, data } = useSession();
  return (
    <div className="absolute top-4 right-2 px-4 py-2 text-primaryText text-lg font-bold">
      {status === "authenticated" ? (
        <div className="">
          {data?.user?.name}{" "}
          <button
            className="rounded-md hover:border"
            onClick={() => redirect("/api/auth/signout/google")}
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          className="rounded-md hover:border"
          onClick={() => redirect("/api/auth/signin/google")}
        >
          Login
        </button>
      )}
    </div>
  );
}
