"use client";
import { TopCustomer } from "@/app/api/dashboard/types";
import useFetch from "@/hooks/useFetch";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { MdMoneyOff } from "react-icons/md";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { FaUser } from "react-icons/fa6";

export default function TopCustomers({
  topCustomers,
}: {
  topCustomers: TopCustomer[];
}) {
  const chartHeight = 300;

  if (topCustomers.length === 0)
    return (
      <div
        className="flex flex-col justify-center items-center gap-4 bg-slate-100 rounded-md"
        style={{ height: `${chartHeight}px` }}
      >
        <div>
          <MdMoneyOff size={100} className="text-red-500" />
        </div>
        No one has ever booked any of your rooms.
      </div>
    );

  return (
    <div
      style={{ height: `${chartHeight}px` }}
      className="bg-slate-50 rounded-md p-4 overflow-auto"
    >
      <h2 className="font-bold text-lg">Top Customers</h2>
      <div>
        {topCustomers.map((topCustomer, id) => (
          <div
            key={id}
            className="flex justify-between items-center bg-slate-100 border border-1 border-slate-300 p-4 my-4 rounded-md"
          >
            <div className="flex gap-4 items-center">
              <Avatar className="flex justify-center items-center">
                <AvatarImage src={topCustomer.user.photoURL} />
                <AvatarFallback className="w-full h-full bg-white">
                  <FaUser className="flex-grow w-full h-full pt-2 text-slate-600" />
                </AvatarFallback>
              </Avatar>
              <span className="font-semibold">
                {topCustomer.user.displayName}
              </span>
            </div>
            <div>
              <span className="font-semibold">{topCustomer.totalBookings}</span>{" "}
              bookings
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
