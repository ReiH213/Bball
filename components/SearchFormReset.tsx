"use client";
import { X } from "lucide-react";
import Link from "next/link";
import React from "react";

const reset = () => {
  const form = document.querySelector(".search-form") as HTMLFormElement;
  if (form) form.reset();
};

const SearchFormReset = () => {
  return (
    <button type="reset" onClick={reset}>
      <Link
        href={"/dashboard/players-stats"}
        className="size-[50px] rounded-full bg-black flex justify-center items-center !important text-white"
      >
        <X className="size-6" />
      </Link>
    </button>
  );
};

export default SearchFormReset;
