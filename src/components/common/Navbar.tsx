"use client";
import { User } from "@/models/User";
import axios from "axios";
import { Avatar, Modal } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar({ user }: { user: Omit<User, "role"> }) {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
    router.push("/");
  };

  return (
    <header className="fixed w-full top-0 flex justify-between items-center p-6 bg-slate-200 z-50">
      <div>{user.displayName}</div>
      <Avatar
        img={user.photoURL}
        rounded
        className="hover:cursor-pointer"
        onClick={() => setOpenModal(true)}
      />
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white text-center">
              Are you sure you want to log out?
            </h3>
            <div className="flex justify-evenly">
              <button
                className="px-3 py-2 rounded-md border-solid border-slate-500 border-2 bg-slate-200 hover:bg-slate-300"
                onClick={() => setOpenModal(false)}
              >
                No, cancel
              </button>
              <button
                className="px-3 py-2 rounded-md border-solid border-2 border-red-900 bg-red-600 hover:bg-red-700 text-white"
                onClick={handleLogout}
              >
                Yes, continue
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </header>
  );
}