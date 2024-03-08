import { getOrganizationById } from "@/data/organization";
import { OrganizationEditForm } from "../_components/organization-edit-form";
import { redirect } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { HeaderForm } from "@/components/header/header-form";

export default async function OrganizationIdEditPage({
  params,
}: {
  params: { organizationId: string };
}) {
  const organizationId = params.organizationId;
  const organization = await getOrganizationById(organizationId);
  const user = await useCurrentUser();

  if (!organization) {
    return redirect("/organization");
  }

  const isOwner = organization.userId === user?.id;

  if (!isOwner) {
    return redirect(`/organization/${organizationId}`);
  }

  return (
    <div>
      <HeaderForm
        title="Edit Organization"
        routeParentName={organization.name}
        backLink={`/organization/${organization.id}`}
        routeName="edit"
      />
      <OrganizationEditForm organization={organization} />
    </div>
  );
}
