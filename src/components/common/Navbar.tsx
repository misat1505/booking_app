import { User } from "@/models/User";

export default function Navbar({ user }: { user: Omit<User, "role"> }) {
  return (
    <header className="sticky flex justify-between items-center p-6 bg-slate-200">
      <div>{user.displayName}</div>
      <img
        src={user.photoURL}
        className="w-12 h-12 rounded-3xl hover:cursor-pointer"
      />
    </header>
  );
}
