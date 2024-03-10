import { MobileSidebar } from "@/components/sidebar/mobile-sidebar";
import { Sidebar } from "@/components/sidebar/sidebar";
import { Separator } from "@/components/ui/separator";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex md:flex-row flex-col md:h-screen md:w-screen">
      <div className="md:block hidden">
        <Sidebar />
      </div>
      <div className="block md:hidden">
        <MobileSidebar />
      </div>
      <Separator orientation="vertical" className="md:block hidden" />
      <Separator className="block md:hidden" />
      <div className="w-full h-full overflow-y-auto">{children}</div>
    </div>
  );
}
