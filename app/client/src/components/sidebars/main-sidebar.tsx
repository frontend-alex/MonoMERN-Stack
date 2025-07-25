import AppLogo from "../AppLogo";

import {
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { lazy, Suspense } from "react";
import { NavMain } from "./main-nav";
import { NavProjects } from "./secondary-nav";
import { UserDropdownSkeleton } from "@/components/dropdowns/user-dropdown";

const LazyUserDropdown = lazy(() => import("@/components/dropdowns/user-dropdown"))

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
      items: [
        {
          title: "Settings",
          url: "/settings",
          icon: User
        },
        {
          title: "Profile",
          url: "/profile",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div>
                <AppLogo />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        {/* <NavSecondar items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <Suspense fallback={<UserDropdownSkeleton/>}>
          <LazyUserDropdown />
        </Suspense>
      </SidebarFooter>
    </Sidebar>
  );
}
