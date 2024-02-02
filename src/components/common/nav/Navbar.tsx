"use client";
import { useUserContext } from "@/app/contexts/userContext";
import { Avatar } from "flowbite-react";
import { useState } from "react";
import NavbarSidebar from "./NavbarSidebar";
import Link from "next/link";

export default function Navbar() {
  const { user } = useUserContext();
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <>
      <header className="fixed w-full top-0 flex justify-between items-center p-6 bg-slate-200 z-50">
        <Link href={"/"}>
          <Avatar img={"/logo.avif"} rounded className="hover:cursor-pointer" />
        </Link>
        <div className="flex gap-4 items-center">
          <div>{user?.displayName}</div>
          <Avatar
            img={user?.photoURL}
            rounded
            title={openSidebar ? "close sidebar" : "open sidebar"}
            className="hover:cursor-pointer"
            onClick={() => setOpenSidebar((prev) => !prev)}
          />
        </div>
        <NavbarSidebar
          openSidebar={openSidebar}
          setOpenSidebar={setOpenSidebar}
        />
      </header>
      <div style={{ height: "88px" }} aria-label="false" />
    </>
  );
}
