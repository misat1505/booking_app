import { useUserContext } from "@/app/contexts/userContext";
import Link from "next/link";
import { useState } from "react";
import { CiLogout } from "react-icons/ci";
import { FaHotel } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import NavbarLogoutModal from "./NavbarLogoutModal";

export default function SidebarCustomer() {
  const [openModal, setOpenModal] = useState(false);
  const { user } = useUserContext();

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <Link
          href={"/"}
          className="flex items-center gap-2 bg-slate-100 p-3 rounded-md hover:bg-slate-200 mb-3 font-semibold"
        >
          <IoHome className="text-blue-500" />
          Home
        </Link>
        <Link
          href={"/bookings"}
          className="flex items-center gap-2 bg-slate-100 p-3 rounded-md hover:bg-slate-200 mb-3 font-semibold"
        >
          <FaHotel className="text-blue-500" />
          My bookings
        </Link>
      </div>
      <div
        className="flex items-center gap-2 bg-slate-100 p-3 rounded-md hover:bg-slate-200 hover:cursor-pointer font-semibold"
        onClick={() => setOpenModal(true)}
      >
        <CiLogout color="red" />
        Logout
      </div>
      <NavbarLogoutModal openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
}
