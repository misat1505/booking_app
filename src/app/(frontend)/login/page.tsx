"use client";
import { useUserContext } from "@/app/contexts/userContext";
import Loading from "@/components/common/Loading";
import { signInWithGoogle } from "@/firebase/firebase";
import { User } from "@/models/User";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function Login() {
  const { setUser } = useUserContext();
  const searchParams = useSearchParams();
  const router = useRouter();

  const role = searchParams.get("role");
  if (!role || !["SALESMAN", "CUSTOMER"].includes(role.toUpperCase()))
    router.replace("/404");

  const redirect = searchParams.get("redirect");

  const handleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      const id = await user.getIdToken();
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        { idToken: id, role: role?.toUpperCase() },
        { withCredentials: true }
      );
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user`
      );
      const responseUser = response.data.user as User;
      setUser(responseUser);
      if (role?.toUpperCase() === "SALESMAN")
        router.push(redirect ? redirect : "/dashboard");
      else if (role?.toUpperCase() === "CUSTOMER")
        router.push(redirect ? redirect : "/");
    } catch (e) {
      toast.error("An error occured when logging in.");
    }
  };

  if (!role) return <Loading />;

  return (
    <div className="min-h-screen flex items-center justify-center fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="bg-white p-8 rounded shadow-md w-96 text-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png"
          className="w-[200px] h-[200px] m-auto"
        />
        <h2 className="text-2xl mb-4 font-semibold mt-8">
          Use your Google account to log in as{" "}
          <span className="text-green-500">{role && role.toLowerCase()}</span>.
        </h2>
        <div className="flex space-x-4 justify-center">
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 border-none hover:cursor-pointer text-sm"
          >
            Log in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
