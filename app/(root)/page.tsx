import { signIn } from "@/auth";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col min-w-screen items-center w-full min-h-screen bg-[#40291d]">
      <h1 className="text-white mt-5 text-4xl rounded-xl p-4 italic font-extrabold bg-[#9b6347] ">
        Welcome to Watch&Track
      </h1>

      <form
        className="mt-4 sm:mt-60 min-w-40 flex flex-col min-h-80 bg-transparent hover:bg-[#ee9b6e] items-center justify-start gap-y-24 rounded-xl p-2 hover:shadow-md hover:shadow-black-1  transition-all ease-in-out delay-100"
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/dashboard" });
        }}
      >
        <h1 className="text-white text-2xl font-semibold bg-[#a55a32] rounded-xl p-2">
          Login with Google to start keeping track
        </h1>
        <button
          type="submit"
          className="p-4 bg-[#a55a32] hover:bg-[#4e2c19] text-white rounded-xl hover:shadow-md hover:shadow-black-1  transition-all ease-in-out delay-100"
        >
          Login
        </button>
      </form>
    </main>
  );
}
