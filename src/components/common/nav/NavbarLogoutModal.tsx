import { useUserContext } from "@/app/contexts/userContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import StyledButton from "../StyledButton";
import { CiLogout } from "react-icons/ci";

export default function NavbarLogoutModal() {
  const { setUser } = useUserContext();
  const router = useRouter();

  const handleLogout = async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
    setUser(null);
    if (window.location.pathname.startsWith("/dashboard")) router.push("/");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <StyledButton variant="nav">
          <CiLogout color="red" />
          Logout
        </StyledButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want to log out?</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center items-center space-x-4">
          <DialogClose asChild>
            <StyledButton
              variant="nav"
              className="text-sm font-normal px-4 py-2"
            >
              No, cancel
            </StyledButton>
          </DialogClose>
          <DialogClose asChild>
            <StyledButton variant="primary" onClick={handleLogout}>
              Yes, continue
            </StyledButton>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
