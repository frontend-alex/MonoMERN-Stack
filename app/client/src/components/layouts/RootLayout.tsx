import Loading from "@/components/Loading";

import { useAuth } from "@/contexts/AuthContext";
import { AppSidebar } from "../sidebars/main-sidebar";
import { Separator } from "@radix-ui/react-separator";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";

const RootLayout = () => {
  const location = useLocation();

  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <Loading />;

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div>
      <SidebarProvider> 
        <AppSidebar />
        <SidebarInset className="p-5">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default RootLayout;
