import Link from "next/link";
import { CiLogin } from "react-icons/ci";
import { IoHome } from "react-icons/io5";

export default function SidebarGuest() {
  return (
    <div className="flex flex-col justify-between h-full">
      <Link
        href={"/"}
        className="flex items-center gap-2 bg-slate-100 p-3 rounded-md hover:bg-slate-200"
      >
        <IoHome className="text-blue-500" />
        Home
      </Link>
      <Link
        className="flex items-center gap-2 bg-slate-100 p-3 rounded-md hover:bg-slate-200"
        href={`/login/provider?redirect=${window.location.pathname}`}
      >
        <CiLogin color="green" />
        Login
      </Link>
    </div>
  );
}
