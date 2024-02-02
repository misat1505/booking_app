"use client";
import { useUserContext } from "@/app/contexts/userContext";
import { Dispatch, SetStateAction } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import SidebarGuest from "./SidebarGuest";
import SidebarSalesman from "./SidebarSalesman";
import SidebarCustomer from "./SidebarCustomer";

export default function NavbarSidebar({
  openSidebar,
  setOpenSidebar,
}: {
  openSidebar: boolean;
  setOpenSidebar: Dispatch<SetStateAction<boolean>>;
}) {
  const { user } = useUserContext();

  const greeting = (date: Date): string => {
    const currentHour = date.getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return "Good morning";
    } else if (currentHour >= 12 && currentHour < 17) {
      return "Good afternoon";
    } else if (currentHour >= 17 && currentHour < 21) {
      return "Good evening";
    }
    return "Good night";
  };

  return (
    <Offcanvas
      show={openSidebar}
      onHide={() => setOpenSidebar(false)}
      placement="end"
    >
      <Offcanvas.Header>
        <Offcanvas.Title>
          {greeting(new Date())}, {user ? user.displayName : "guest"}!
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {!user && <SidebarGuest />}
        {user?.role === "SALESMAN" && <SidebarSalesman />}
        {user?.role === "CUSTOMER" && <SidebarCustomer />}
      </Offcanvas.Body>
    </Offcanvas>
  );
}
