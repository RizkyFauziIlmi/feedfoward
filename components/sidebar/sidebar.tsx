import { SidebarContent } from "./sidebar-content";
import { SidebarHeader } from "./sidebar-header";
import { SidebarProfile } from "./sidebar-profile";
import { useCurrentUser } from "@/hooks/use-current-user";

export const Sidebar = async () => {
  const user = await useCurrentUser();

  return (
    <div className="p-6 min-w-60 max-w-60 relative">
      <SidebarHeader />
      <SidebarContent />
      <SidebarProfile user={user} />
    </div>
  );
};
