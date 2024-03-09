import { getOrganizationById } from "@/data/organization";
import { useCurrentUser } from "@/hooks/use-current-user";
import { redirect } from "next/navigation";
import { NewEventForm } from "./_components/new-event-form";
import { Metadata, ResolvingMetadata } from "next";
import { HeaderForm } from "@/components/header/header-form";
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
    title: `Create Event - ${organization?.name}`,
    description: organization?.description,
  };
}

export default async function NewEventPage({
  params,
}: {
  params: { organizationId: string };
}) {
  const user = await useCurrentUser();
  const organizationId = params.organizationId;
  const organization = await getOrganizationById(organizationId);

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
        title="Create Event"
        routeParentName={organization?.name}
        routeName="new event"
        backLink={`/organization/${organizationId}`}
      />
      <NewEventForm organizationId={organizationId} />
    </div>
  );
}
