"use client";
import { useUserContext } from "@/app/contexts/userContext";
import { Dispatch, SetStateAction } from "react";
// import Offcanvas from "react-bootstrap/Offcanvas";
import SidebarGuest from "./SidebarGuest";
import SidebarSalesman from "./SidebarSalesman";
import SidebarCustomer from "./SidebarCustomer";
import { SheetHeader } from "@/components/ui/sheet";

export default function NavbarSidebar() {
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
    <>
      <SheetHeader className="font-semibold text-lg pb-3">
        {greeting(new Date())}, {user ? user.displayName : "guest"}!
      </SheetHeader>
      <div className="h-[calc(100%-0.75rem)]">
        {!user && <SidebarGuest />}
        {user?.role === "SALESMAN" && <SidebarSalesman />}
        {user?.role === "CUSTOMER" && <SidebarCustomer />}
      </div>
    </>
  );
}
