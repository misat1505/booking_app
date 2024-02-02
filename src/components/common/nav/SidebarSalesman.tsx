import { useState } from "react";
import { AiFillDashboard } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import { FaHotel } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import NavbarLogoutModal from "./NavbarLogoutModal";
import StyledLink from "../StyledLink";
import StyledButton from "../StyledButton";

export default function SidebarSalesman() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <StyledLink href={"/"} variant="nav">
          <IoHome className="text-blue-500" />
          Home
        </StyledLink>
        <StyledLink href={"/dashboard"} variant="nav">
          <AiFillDashboard className="text-blue-500" />
          Dashboard
        </StyledLink>
        <StyledLink href={"/dashboard/hotels"} variant="nav">
          <FaHotel className="text-blue-500" />
          My Hotels
        </StyledLink>
      </div>
      <StyledButton variant="nav" onClick={() => setOpenModal(true)}>
        <CiLogout color="red" />
        Logout
      </StyledButton>
      <NavbarLogoutModal openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
}
