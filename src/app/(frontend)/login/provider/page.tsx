"use client";
import { useUserContext } from "@/app/contexts/userContext";
import { signInWithGoogle } from "@/firebase/firebase";
import { User } from "@/models/User";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const { setUser } = useUserContext();
  const router = useRouter();
  let redirect: string | null = null;

  useEffect(() => {
    const url = new URLSearchParams(window.location.search);
    redirect = url.get("redirect");
  }, []);

  const handleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      const id = await user.getIdToken();
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        { idToken: id, role: "provider" },
        { withCredentials: true }
      );
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user`
      );
      const responseUser = response.data.user as User;
      setUser(responseUser);
      router.push(redirect ? redirect : "/dashboard");
    } catch (e) {}
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96 text-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png"
          className="w-[200px] h-[200px] m-auto"
        />
        <h2 className="text-2xl mb-4 font-bold mt-8">
          Use your Google account to log in as provider.
        </h2>
        <div className="flex space-x-4 justify-center">
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 border-none hover:cursor-pointer"
          >
            Log in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
