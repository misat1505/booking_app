"use client";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/dashboard/hotels")}
      className="px-3 py-2 border-none bg-blue-500 hover:bg-blue-600 hover:cursor-pointer rounded-md text-white mt-3"
    >
      show my hotels
    </button>
  );
}
