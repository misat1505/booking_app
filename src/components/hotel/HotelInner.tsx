"use client";
import { Hotel } from "@/models/Hotel";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import RoomsDisplayer from "./RoomsDisplayer";
import Link from "next/link";
import StyledLink from "../common/StyledLink";
import { FaUser } from "react-icons/fa6";

export default function HotelInner({ hotel }: { hotel: Hotel }) {
  return (
    <div className="text-center p-4 lg:p-0">
      <h2
        className="font-bold text-6xl text-white drop-shadow-xl [text-shadow:_1px_1px_1px_rgb(0_0_0_/_60%)]"
        style={{ margin: "50vh 0", transform: "translateY(-50%)" }}
      >
        {hotel.name}
      </h2>
      <div className="grid grid-cols-4 gap-4 overflow-x-hidden w-full lg:w-3/4 m-auto">
        <div className="bg-slate-100 p-4 rounded-md col-span-4 lg:col-span-3 text-left my-4 border-solid border border-slate-300">
          <h2 className="text-xl font-bold">About</h2>
          <p className="whitespace-pre-wrap text-sm">{hotel.description}</p>
        </div>
        <div className="bg-slate-100 p-4 rounded-md col-span-4 lg:col-span-1 text-left my-4 border-solid border border-slate-300 flex flex-col justify-between flex-grow gap-8 lg:gap-2">
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
          <StyledLink href={"#"}>
            Show {hotel.owner.displayName}&apos;s page
          </StyledLink>
        </div>
        <RoomsDisplayer hotel={hotel} />
      </div>
    </div>
  );
}
