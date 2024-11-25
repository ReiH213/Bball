// import { logoutAccount } from "@/lib/actions/user.action";

import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Footer = ({ type = "desktop" }: FooterProps) => {
  const router = useRouter();
  const handleLogOut = async () => {
    // const loggedout = await logoutAccount();
    // if (loggedout) {
    //   router.push("/sign-in");
    // }
    router.push("/sign-in");
  };
  return (
    <footer className="footer">
      <div className={type === "mobile" ? "footer_name-mobile" : "footer_name"}>
        {/* <p className="text-xl font-bold text-gray-700">{user?.firstName[0]}</p> */}
      </div>
      <div
        className={type === "mobile" ? "footer_email-mobile" : "footer_email"}
      >
        <h1 className="text-14 truncate font-semibold text-gray-700">
          {/* {user?.firstName} */}
        </h1>
        <p className="text-14 truncate font-normal text-gray-600">
          {/* {user?.email} */}
        </p>
      </div>

      <button
        type="submit"
        className="p-2 bg-white text-black-0 rounded-lg hover:shadow-md hover:shadow-white hover:bg-transparent hover:text-white transition-all ease-in-out delay-100"
        onClick={() => signOut({ redirectTo: "/" })}
      >
        Logout
      </button>
    </footer>
  );
};

export default Footer;
