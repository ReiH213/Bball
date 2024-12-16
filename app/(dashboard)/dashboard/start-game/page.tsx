import SelectTeam from "@/components/SelectTeam";
import { deleteAllPlayers } from "@/sanity/lib/queries";
import React from "react";

const page = () => {
  return (
    <section className="m-2 flex flex-col w-full h-full">
      <h1 className="text-4xl text-black-1 font-ibm-plex-serif">
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
          className="p-2 bg-black text-white rounded-lg hover:shadow-md hover:shadow-black hover:bg-white hover:text-black transition-all ease-in-out delay-100"
        >
          Delete
        </button>
      </form>
      <div className="flex flex-col ml-10 mt-10 gap-32  items-start justify-center">
        <h1 className="text-xl bg-black-0 text-white rounded-md p-2">
          Select teams
        </h1>
        <SelectTeam />
      </div>
    </section>
  );
};

export default page;
