"use client";
import { useRoomPageContext } from "@/app/contexts/public/RoomPageContext";
import StyledLink from "@/components/common/StyledLink";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { FaUser } from "react-icons/fa6";

export default function OwnerInfo() {
  const { hotel } = useRoomPageContext();

  return (
    <div className="bg-slate-100 p-4 rounded-md text-left border-solid border border-slate-300 flex flex-col justify-between flex-grow w-auto h-64">
      <h2 className="text-xl font-bold">Owner</h2>
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={hotel.owner.photoURL} />
          <AvatarFallback>
            <FaUser size={30} className="text-slate-600" />
          </AvatarFallback>
        </Avatar>
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
      <StyledLink href={`/profile/${hotel.owner.uid}`}>
        Show {hotel.owner.displayName}&apos;s page
      </StyledLink>
    </div>
  );
}
