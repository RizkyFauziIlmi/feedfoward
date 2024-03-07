import { OrganizationContent } from "@/components/organization/organization-content";
import { OrganizationNavbar } from "@/components/organization/organization-navbar";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Organization",
};

export default function OrganizationPage() {
  return (
    <div>
      <OrganizationNavbar />
      <Separator />
      <OrganizationContent />
    </div>
  );
}
