import { MapPin } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { AuthFooter } from "@/components/sidebar/sidebarFooter";
import SidebarMenuComponent from "@/components/sidebar/sidebarMenuItemComponent";
import { auth } from "@/lib/auth";
import { Suspense } from "react";


export async function AppSidebar() {
  const session = await auth();
  const isAuthenticated = !!session;
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarGroupLabel>
          <MapPin className="h-10 w-10 text-white mr-2" />
          <h1 className="font-bold text-lg">UTSCdle</h1>
        </SidebarGroupLabel>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenuComponent isAuthenticated={isAuthenticated} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <Suspense>
        <AuthFooter />
      </Suspense>
    </Sidebar>
  );
}
