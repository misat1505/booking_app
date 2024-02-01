import Link from "next/link";

export default function Dashboard() {
  return (
    <Link
      href={"/dashboard/hotels"}
      className="px-3 py-2 border-none bg-blue-500 hover:bg-blue-600 hover:cursor-pointer rounded-md text-white mt-4"
    >
      Show my hotels
    </Link>
  );
}
