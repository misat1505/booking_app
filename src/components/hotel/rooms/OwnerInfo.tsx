"use client";
import { useRoomPageContext } from "@/app/contexts/public/RoomPageContext";
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
      <Link
        href={"/"}
        className="text-center px-3 py-2 rounded-md bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-white text-sm"
      >
        Show {hotel.owner.displayName}&apos;s page
      </Link>
    </div>
  );
}
