import { User2, ChevronUp } from "lucide-react";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth, signOut } from "@/lib/auth";
import { AuthPopup } from "@/components/auth/authPopup";
import Link from "next/link";

export async function AuthFooter() {
  const session = await auth();
  if (!session?.user) {
    return (
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <AuthPopup />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    );
  }
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <User2 /> {session.user.name}
                <ChevronUp className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              className="w-[--radix-popper-anchor-width]"
            >
              <DropdownMenuItem asChild>
                <Link href="/account-info">
                  <span>Account</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  "use server";
                  await signOut({ redirectTo: "/daily-challenge" });
                }}
              >
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
