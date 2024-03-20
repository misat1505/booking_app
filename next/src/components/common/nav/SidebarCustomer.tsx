import { FaHotel } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import NavbarLogoutModal from "./NavbarLogoutModal";
import StyledLink from "../StyledLink";

export default function SidebarCustomer() {
  return (
    <div className="flex flex-col justify-between h-[calc(100%-2rem)] mt-4">
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
      <NavbarLogoutModal />
    </div>
  );
}
