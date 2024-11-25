"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Footer from "./Footer";
import { sidebarLinks } from "@/constants";

const Sidebar = () => {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="mb-12 cursor-pointer flex gap-2 items-center">
          <Image
            src={sidebarLinks[1].imgURL}
            width={34}
            height={34}
            alt="profile"
            className="size-[60px] max-xl:size-14 brightness-[10]"
          />
          <h1 className="sidebar-logo">Watch&Track</h1>
        </Link>
        {sidebarLinks.map((link) => {
          const isActive =
            pathname === link.route ||
            pathname.startsWith(`/dashboard/${link.route}/`);
          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn("sidebar-link", {
                "bg-white": isActive,
              })}
            >
              <div className="relative size-6">
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  fill
                  className={cn("brightness-[6]", {
                    "brightness-[3] invert-0": isActive,
                    "brightness-[1]": isActive && link.route === "/dashboard",
                  })}
                />
              </div>
              <p
                className={cn("sidebar-label", {
                  "!text-black-0": isActive,
                })}
              >
                {link.label}
              </p>
            </Link>
          );
        })}
      </nav>
      <Footer type="desktop" />
    </section>
  );
};

export default Sidebar;
