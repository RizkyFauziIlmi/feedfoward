import { Sidebar } from "@/components/sidebar/sidebar";
import { Separator } from "@/components/ui/separator";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <Separator orientation="vertical" />
      <div className="w-full h-full overflow-y-auto">{children}</div>
    </div>
  );
}
