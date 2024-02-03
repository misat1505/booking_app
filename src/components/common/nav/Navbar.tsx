"use client";
import { useUserContext } from "@/app/contexts/userContext";
import { useState } from "react";
import NavbarSidebar from "./NavbarSidebar";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa6";

export default function Navbar() {
  const { user } = useUserContext();
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <>
      <header className="fixed w-full top-0 flex justify-between items-center p-6 bg-slate-200 z-50">
        <Link href={"/"}>
          <Avatar>
            <AvatarImage src="/logo.avif" />
            <AvatarFallback>logo</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex gap-4 items-center">
          <div>{user?.displayName}</div>
          <Avatar
            onClick={() => setOpenSidebar((prev) => !prev)}
            className="hover:cursor-pointer"
            title={openSidebar ? "close sidebar" : "open sidebar"}
          >
            <AvatarImage src={user?.photoURL} />
            <AvatarFallback>
              <FaUser size={30} className="text-slate-600" />
            </AvatarFallback>
          </Avatar>
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
