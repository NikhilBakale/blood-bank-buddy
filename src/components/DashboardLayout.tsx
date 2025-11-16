import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Droplet } from "lucide-react";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b bg-card flex items-center px-6 gap-4">
            <SidebarTrigger />
            <div className="flex items-center gap-2">
              <div className="bg-medical-red rounded-full p-2">
                <Droplet className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-primary">Blood Inventory System</span>
            </div>
          </header>
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
