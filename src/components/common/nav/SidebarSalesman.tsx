import { AiFillDashboard } from "react-icons/ai";
import { FaHotel } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import NavbarLogoutModal from "./NavbarLogoutModal";
import StyledLink from "../StyledLink";

export default function SidebarSalesman() {
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

      <NavbarLogoutModal />
    </div>
  );
}
