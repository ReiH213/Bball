import SelectTeam from "@/components/SelectTeam";
import { deleteAllPlayers } from "@/sanity/lib/queries";
import React from "react";
import Timer from "@/components/Timer";

const page = () => {
  return (
    <section className="flex  overflow-hidden flex-col w-full h-full justify-start items-center ">
      <div>
        <h1 className="font-extrabold italic p-3 text-center text-4xl rounded-2xl bg-[#492e21] text-white hover:bg-[#9b6347] hover:text-white hover:shadow-md hover:shadow-black-0 ease-in-out transition-all delay-150 hover:cursor-default mt-4">
          New Match Registration
        </h1>
        {/* <form
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
          </form> */}
        <div className="flex flex-col mt-10 gap-32  items-center justify-center">
          <SelectTeam />
        </div>
      </div>
    </section>
  );
};

export default page;
