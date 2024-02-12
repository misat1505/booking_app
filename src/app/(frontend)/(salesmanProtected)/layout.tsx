"use client";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { refreshToken as refresh } from "@/actions/refreshToken";

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const refreshToken = async () => {
      try {
        await refresh();
      } catch (e) {
        router.push(
          `/login/?role=salesman&redirect=${window.location.pathname}`
        );
      }
    };

    setInterval(refreshToken, 60 * 60 * 1000);

    refreshToken();
  }, []);

  return <>{children}</>;
}
