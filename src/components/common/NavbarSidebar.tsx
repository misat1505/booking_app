import { useUserContext } from "@/app/contexts/userContext";
import { Dispatch, SetStateAction } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import SidebarGuest from "./SidebarGuest";
import SidebarProvider from "./SidebarProvider";

export default function NavbarSidebar({
  openSidebar,
  setOpenSidebar,
}: {
  openSidebar: boolean;
  setOpenSidebar: Dispatch<SetStateAction<boolean>>;
}) {
  const { user } = useUserContext();

  return (
    <Offcanvas
      show={openSidebar}
      onHide={() => setOpenSidebar(false)}
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          Hello, {user ? user.displayName : "guest"}!
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {!user && <SidebarGuest />}
        {user?.role === "provider" && <SidebarProvider />}
      </Offcanvas.Body>
    </Offcanvas>
  );
}
