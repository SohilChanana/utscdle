import type { Metadata } from "next";
import { AppSidebar } from "@/components/sidebar/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { inter } from "@/components/ui/fonts";
import { SidebarTrigger } from "@/components/ui/sidebar";

import "./globals.css";

export const metadata: Metadata = {
  title: "UTSCdle",
  description: "A combination of Geoguesser and Wordle for UTSC students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`dark ${inter.className} antialiased`}>
        <SidebarProvider>
          <div className="flex h-full w-screen">
            {/* Sidebar */}
            <AppSidebar />
            <div className="relative flex-none w-min bg-zinc-800">
              <SidebarTrigger className="absolute top-0 left-0 p-2 m-1" />
            </div>
            {/* Main Content */}
            <div className="flex-1 flex items-start justify-center bg-zinc-800 w-full">
              {children}
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
