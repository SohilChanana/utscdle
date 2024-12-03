"use client";

import { LogIn } from "lucide-react";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { SignInContent } from "@/components/auth/signInContent";
import { SignUpContent } from "@/components/auth/signUpContent";

export function AuthPopup() {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("sign-in");
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SidebarMenuButton
          className="bg-zinc-700"
          onClick={() => setContent("sign-in")}
        >
          <LogIn strokeWidth={2} />{" "}
          <span className="text-nowrap text-md bg">Sign In</span>
        </SidebarMenuButton>
      </DialogTrigger>
      {content === "sign-in" && (
        <SignInContent setOpen={setOpen} setContent={setContent} />
      )}
      {content === "sign-up" && <SignUpContent setOpen={setOpen}/>}
    </Dialog>
  );
}
