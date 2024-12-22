import React from "react";
import Form from "next/form";
import SearchFormReset from "./SearchFormReset";
import { Search } from "lucide-react";
const PlayersSearchField = ({ query }: { query: string }) => {
  return (
    <Form
      action={"/dashboard/players-stats"}
      scroll={false}
      className="ml-2 max-w-3xl w-full h-[40px] bg-[#633d2b]  rounded-xl text-[24px] mt-4 px-2 flex flex-row items-center gap-5"
    >
      <input
        name="query"
        defaultValue={""}
        className="flex-1 text-white placeholder:text-white font-bold  w-fit h-auto outline-none rounded-lg m-1 bg-transparent"
        placeholder="Search Players"
      />

      <div className="flex gap-2">{query && <SearchFormReset />}</div>
      <button
        type="submit"
        className="size-[50px] rounded-full bg-black flex  flex-row justify-center items-center !important text-white"
      >
        <Search className="size-6" />
      </button>
    </Form>
  );
};

export default PlayersSearchField;
