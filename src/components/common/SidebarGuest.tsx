import Link from "next/link";
import { FaBasketShopping } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { MdSell } from "react-icons/md";

export default function SidebarGuest() {
  return (
    <div className="flex flex-col justify-between h-full">
      <Link
        href={"/"}
        className="flex items-center gap-2 bg-slate-100 p-3 rounded-md hover:bg-slate-200 font-semibold"
      >
        <IoHome className="text-blue-500" />
        Home
      </Link>
      <div>
        <Link
          className="flex items-center gap-2 bg-slate-100 p-3 rounded-md hover:bg-slate-200 mt-3 font-semibold"
          href={`/login/buyer?redirect=${window.location.pathname}`}
        >
          <FaBasketShopping color="green" />
          Login as buyer
        </Link>
        <Link
          className="flex items-center gap-2 bg-slate-100 p-3 rounded-md hover:bg-slate-200 mt-3 font-semibold"
          href={`/login/provider?redirect=${window.location.pathname}`}
        >
          <MdSell color="green" />
          Login as provider
        </Link>
      </div>
    </div>
  );
}
