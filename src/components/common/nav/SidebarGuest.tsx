import { FaBasketShopping } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { MdSell } from "react-icons/md";
import StyledLink from "../StyledLink";

export default function SidebarGuest() {
  return (
    <div className="flex flex-col justify-between h-full">
      <StyledLink href={"/"} variant="nav">
        <IoHome className="text-blue-500" />
        Home
      </StyledLink>
      <div>
        <StyledLink
          variant="nav"
          href={`/login?role=customer&redirect=${window.location.pathname}`}
        >
          <FaBasketShopping color="green" />
          Login as customer
        </StyledLink>
        <StyledLink
          variant="nav"
          href={`/login?role=salesman&redirect=${window.location.pathname}`}
        >
          <MdSell color="green" />
          Login as salesman
        </StyledLink>
      </div>
    </div>
  );
}
