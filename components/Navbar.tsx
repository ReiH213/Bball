import { auth, signOut, signIn } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = async () => {
  const session = await auth();
  console.log(session);

  return (
    <div className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href={"/"}>
          <Image
            src={"icons/basketballIcon.svg"}
            alt="Logo"
            width={120}
            height={30}
          />
        </Link>
        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="p-2 bg-black-1 text-white rounded-lg hover:shadow-md hover:shadow-black-1 hover:bg-white hover:text-black-1 transition-all ease-in-out delay-100"
                >
                  Logout
                </button>
              </form>
              <Link href={`/dashboard`}>
                <span className="p-3 bg-black-0 text-white rounded-lg hover:shadow-md hover:shadow-black-0 hover:text-black-0 hover:bg-transparent  transition-all ease-in-out delay-100">
                  Go to Dashboard
                </span>
              </Link>
              <Link href={`/user/${session?.user?.id}`}>
                <span className="p-3  rounded-lg hover:shadow-md hover:shadow-black  transition-all ease-in-out delay-100">
                  {session?.user?.name}
                </span>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("google", { redirectTo: "/dashboard" });
              }}
            >
              <button
                type="submit"
                className="p-2 bg-black-1 text-white rounded-lg hover:shadow-md hover:shadow-black-1 hover:bg-white hover:text-black-1 transition-all ease-in-out delay-100"
              >
                Login
              </button>
            </form>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
