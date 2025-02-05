"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function Auth() {
  const { status, data } = useSession();
  const [showPopup, setShowPopup] = useState(false);

  const handleLoginClick = () => {
    setShowPopup((showPopup) => !showPopup);
  };

  const handleLogoutClick = () => {
    setShowPopup((showPopup) => !showPopup);
  };

  return (
    <div className="text-white text-lg font-bold">
      {status === "authenticated" ? (
        <div className="relative">
          <button
            className="rounded-md hover:underline"
            onClick={handleLogoutClick}
          >
            {data?.user?.name}{" "}
          </button>
          {showPopup && (
            <div className="popup absolute w-40 h-16 right-0 bg-[#0d1117] py-2 rounded-lg flex justify-center items-center">
              <button
                className="rounded-md w-fit hover:bg-[#243041] bg-[#19212c] px-4 py-1 text-white"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="relative">
          <button
            className="rounded-md hover:underline"
            onClick={handleLoginClick}
          >
            Login
          </button>
          {showPopup && (
            <div className="popup absolute w-64 h-20 right-0 bg-[#0d1117] py-2 rounded-lg flex justify-center items-center">
              <button
                className="rounded-md w-fit hover:bg-[#243041] bg-[#19212c] px-4 py-2 text-white flex justify-center items-center gap-2"
                onClick={() => signIn("google")}
              >
                <FcGoogle className="inline" /> <span>Login with Google</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
