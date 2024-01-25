"use client";
import { User } from "@/models/User";
import axios from "axios";
import { Avatar } from "flowbite-react";
import { useRouter } from "next/navigation";

export default function Navbar({ user }: { user: Omit<User, "role"> }) {
  const router = useRouter();

  const handleLogout = async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
    router.push("/");
  };

  return (
    <header className="sticky top-0 flex justify-between items-center p-6 bg-slate-200 z-10">
      <div>{user.displayName}</div>
      <Avatar
        img={user.photoURL}
        rounded
        className="hover:cursor-pointer"
        onClick={handleLogout}
      />
    </header>
  );
}
