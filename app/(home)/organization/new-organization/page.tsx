import { Metadata } from "next";
import { NewOrganizationForm } from "./_components/new-organization-form";
import { HeaderForm } from "@/components/header/header-form";

export const metadata: Metadata = {
  title: "FeedFoward - New Organization",
  description: "Create a new organization",
}

export default function NewOrganization() {
  return (
    <div>
      <HeaderForm
        title="Create Organization"
        routeParentName="organization"
        routeName="new organization"
        backLink="/organization"
      />
      <NewOrganizationForm />
    </div>
  );
}
