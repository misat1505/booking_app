"use client";
import { useUserContext } from "@/app/contexts/userContext";
import axios from "axios";
import { Avatar, Modal } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NavbarLogoutModal from "./NavbarLogoutModal";
import NavbarSidebar from "./NavbarSidebar";

export default function Navbar() {
  const { user } = useUserContext();
  const [openSidebar, setOpenSidebar] = useState(false);
  const router = useRouter();

  return (
    <header className="fixed w-full top-0 flex justify-between items-center p-6 bg-slate-200 z-50">
      <Avatar
        img={"/logo.avif"}
        rounded
        className="hover:cursor-pointer"
        onClick={() => router.push("/")}
      />
      <div className="flex gap-4 items-center">
        <div>{user?.displayName}</div>
        <Avatar
          img={user?.photoURL}
          rounded
          title={user ? "logout" : "login"}
          className="hover:cursor-pointer"
          onClick={() => setOpenSidebar((prev) => !prev)}
        />
      </div>
      <NavbarSidebar
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
      />
      {/* <NavbarLogoutModal openModal={openModal} setOpenModal={setOpenModal} /> */}
    </header>
  );
}
