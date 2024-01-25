import { User } from "@/models/User";
import { Avatar } from "flowbite-react";

export default function Navbar({ user }: { user: Omit<User, "role"> }) {
  return (
    <header className="sticky flex justify-between items-center p-6 bg-slate-200">
      <div>{user.displayName}</div>
      <Avatar img={user.photoURL} rounded />
    </header>
  );
}
