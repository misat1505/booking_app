"use client";
import { login } from "@/actions/login";
import { useUserContext } from "@/app/contexts/userContext";
import Loading from "@/components/common/Loading";
import StyledButton from "@/components/common/StyledButton";
import { signInWithGoogle } from "@/firebase/firebase";
import { User } from "@/models/User";
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
      const responseUser = await login(id, role?.toUpperCase() as User["role"]);
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
      <div className="p-8 rounded shadow-md w-96 text-center bg-slate-50">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png"
          className="w-[200px] h-[200px] m-auto"
        />
        <h2 className="text-2xl mb-4 font-semibold mt-8">
          Use your Google account to log in as{" "}
          <span className="text-green-500">{role && role.toLowerCase()}</span>.
        </h2>
        <div className="flex space-x-4 justify-center">
          <StyledButton onClick={handleLogin}>Log in with Google</StyledButton>
        </div>
      </div>
    </div>
  );
}
