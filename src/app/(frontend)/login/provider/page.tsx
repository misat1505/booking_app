"use client";
import { signInWithGoogle } from "@/firebase/firebase";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      const id = await user.getIdToken();
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        { idToken: id },
        { withCredentials: true }
      );
      router.push("/dashboard");
    } catch (e) {}
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96 text-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png"
          className="w-[200px] h-[200px]"
        />
        <h2 className="text-2xl mb-4 font-bold mt-8">Choose action</h2>
        <div className="flex space-x-4 justify-center">
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 border-none hover:cursor-pointer"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}
