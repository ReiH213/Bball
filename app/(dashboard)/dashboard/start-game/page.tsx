import SelectTeam from "@/components/SelectTeam";
import { deleteAllPlayers } from "@/sanity/lib/queries";
import React from "react";
import Timer from "@/components/Timer";

const page = () => {
  return (
    <section className="flex overflow-hidden flex-col w-full h-full justify-start items-center ">
      <h1 className="text-4xl mt-4 text-white font-extrabold p-4 border-2 rounded-xl">
        New Match Registration
      </h1>
      <form
        action={async () => {
          "use server";
          await deleteAllPlayers();
        }}
      >
        <button
          type="submit"
          className="p-2 bg-black text-white rounded-xl hover:shadow-md hover:shadow-black hover:bg-white hover:text-black transition-all ease-in-out delay-100"
        >
          Delete
        </button>
      </form>
      <div className="flex flex-col mt-10 gap-32  items-center justify-center">
        <SelectTeam />
      </div>
    </section>
  );
};

export default page;
