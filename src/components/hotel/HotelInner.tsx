"use client";
import { Hotel } from "@/models/Hotel";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import RoomsDisplayer from "./RoomsDisplayer";
import Link from "next/link";
import StyledLink from "../common/StyledLink";
import { FaUser } from "react-icons/fa6";

export default function HotelInner({ hotel }: { hotel: Hotel }) {
  return (
    <div className="text-center">
      <h2
        className="font-bold text-6xl text-white drop-shadow-xl [text-shadow:_1px_1px_1px_rgb(0_0_0_/_60%)]"
        style={{ margin: "50vh 0", transform: "translateY(-50%)" }}
      >
        {hotel.name}
      </h2>
      <div className="flex flex-wrap justify-between overflow-x-hidden w-3/4 m-auto">
        <div className="bg-slate-100 p-4 rounded-md w-3/4 text-left my-4 border-solid border border-slate-300">
          <h2 className="text-xl font-bold">About</h2>
          <p className="whitespace-pre-wrap text-sm">{hotel.description}</p>
        </div>
        <div className="bg-slate-100 p-4 rounded-md w-1/5 text-left my-4 ml-4 border-solid border border-slate-300 flex flex-col justify-between flex-grow">
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
