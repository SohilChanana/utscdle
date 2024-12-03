import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SignUpForm } from "@/components/auth/signUpForm";
import { SignUpProps } from "@/components/auth/props";

export function SignUpContent({ setOpen }: SignUpProps) {
  return (
    <DialogContent>
      <DialogHeader className="items-center">
        <DialogTitle>Sign Up</DialogTitle>
      </DialogHeader>
      <SignUpForm setOpen={setOpen}/>
    </DialogContent>
  );
}
