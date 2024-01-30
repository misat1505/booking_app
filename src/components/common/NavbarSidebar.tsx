import { Dispatch, SetStateAction } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";

export default function NavbarSidebar({
  openSidebar,
  setOpenSidebar,
}: {
  openSidebar: boolean;
  setOpenSidebar: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Offcanvas
      show={openSidebar}
      onHide={() => setOpenSidebar(false)}
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Responsive offcanvas</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <p className="mb-0">
          This is content within an <code>.offcanvas-lg</code>.
        </p>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
