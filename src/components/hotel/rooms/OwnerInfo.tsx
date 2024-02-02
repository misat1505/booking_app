"use client";
import { useRoomPageContext } from "@/app/contexts/public/RoomPageContext";
import StyledLink from "@/components/common/StyledLink";
import { Avatar } from "flowbite-react";
import Link from "next/link";

export default function OwnerInfo() {
  const { hotel } = useRoomPageContext();

  return (
    <div className="bg-slate-100 p-4 rounded-md text-left border-solid border border-slate-300 flex flex-col justify-between flex-grow w-auto h-64">
      <h2 className="text-xl font-bold">Owner</h2>
      <div className="flex items-center gap-2">
        <Avatar img={hotel.owner.photoURL} rounded />
        <div className="text-sm">{hotel.owner.displayName}</div>
      </div>
      <div>
        <div className="font-semibold">Contact</div>
        <Link
          href={`mailto:${hotel.owner.email}`}
          title="send email"
          className="text-sm"
        >
          {hotel.owner.email}
        </Link>
      </div>
      <StyledLink href={"#"}>
        Show {hotel.owner.displayName}&apos;s page
      </StyledLink>
    </div>
  );
}
