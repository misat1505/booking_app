"use client";
import Loading from "@/components/common/Loading";
import Navbar from "@/components/common/Navbar";
import useFetch from "@/hooks/useFetch";
import { User } from "@/models/User";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const { data: user, isLoading } = useFetch<{ user: Omit<User, "role"> }>(
    `${process.env.NEXT_PUBLIC_API_URL}/user`
  );
  const router = useRouter();

  useEffect(() => {
    const refreshToken = async () => {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
      } catch (e) {
        router.push("/login/provider");
      }
    };

    setInterval(refreshToken, 3 * 60 * 1000);

    refreshToken();
  }, []);

  if (isLoading || !user) return <Loading />;

  return (
    <>
      <Navbar user={user.user} />
      {children}
    </>
  );
}
