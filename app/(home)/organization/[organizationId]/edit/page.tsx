import { getOrganizationById } from "@/data/organization";
import { OrganizationEditForm } from "../_components/organization-edit-form";
import { redirect } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { HeaderForm } from "@/components/header/header-form";
import { Metadata, ResolvingMetadata } from "next";
import { db } from "@/lib/db";

type Props = {
  params: { organizationId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const organizationId = params.organizationId;

  // fetch data
  const organization = await db.organization.findUnique({
    where: {
      id: organizationId,
    },
    select: {
      name: true,
      description: true,
    },
  });

  return {
    title: `Edit - ${organization?.name}`,
    description: organization?.description,
  };
}

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
