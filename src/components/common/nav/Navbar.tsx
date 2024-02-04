"use client";
import { useUserContext } from "@/app/contexts/userContext";
import { useState } from "react";
import NavbarSidebar from "./NavbarSidebar";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa6";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
          <Sheet>
            <SheetTrigger>
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
            </SheetTrigger>
            <SheetContent>
              <NavbarSidebar />
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <div style={{ height: "88px" }} aria-label="false" />
    </>
  );
}
