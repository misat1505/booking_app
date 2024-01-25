"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function Layout({ children }: { children: ReactNode }) {
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

  return <>{children}</>;
}
