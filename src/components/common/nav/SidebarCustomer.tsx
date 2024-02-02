import { useUserContext } from "@/app/contexts/userContext";
import Link from "next/link";
import { useState } from "react";
import { CiLogout } from "react-icons/ci";
import { FaHotel } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import NavbarLogoutModal from "./NavbarLogoutModal";
import StyledLink from "../StyledLink";
import StyledButton from "../StyledButton";

export default function SidebarCustomer() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <StyledLink href={"/"} variant="nav">
          <IoHome className="text-blue-500" />
          Home
        </StyledLink>
        <StyledLink href={"/bookings"} variant="nav">
          <FaHotel className="text-blue-500" />
          My bookings
        </StyledLink>
      </div>
      <StyledButton onClick={() => setOpenModal(true)} variant="nav">
        <CiLogout color="red" />
        Logout
      </StyledButton>
      <NavbarLogoutModal openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
}
