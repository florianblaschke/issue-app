"use client";

import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { status, data: session } = useSession();

  return (
    <div className="flex bg-slate-200 p-3 space-x-3">
      <Link href="/" className="mr-5">
        Home
      </Link>
      <Link href="/users" className="mr-5">
        Users
      </Link>
      {status === "loading" && (
        <span className="loading loading-spinner loading-sm"></span>
      )}
      {status === "authenticated" && (
        <div>
          {session.user!.name}
          <Link className="ml-3" href="/api/auth/signout">
            Sign out
          </Link>
        </div>
      )}
      {status === "unauthenticated" && (
        <Link href="/api/auth/signin">Login</Link>
      )}
    </div>
  );
};

export default Navbar;
