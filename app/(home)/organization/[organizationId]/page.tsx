import { getOrganizationById } from "@/data/organization";
import { OrganizationMenu } from "./_components/organization-menu";
import { useCurrentUser } from "@/hooks/use-current-user";
import { OrganizationIdNavbar } from "./_components/organization-id-navbar";
import { EventCard } from "./_components/event-card";
import { redirect } from "next/navigation";
import { EventNotFound } from "./_components/event-not-found";
import { sortingEvents } from "@/lib/date";
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
    }
  });

  return {
    title: `Organization - ${organization?.name}`,
    description: organization?.description,
  };
}

export default async function OrganizationIdPage({
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

  const sortedEvents = sortingEvents(organization.events);

  return (
    <div>
      <OrganizationIdNavbar isOwner={isOwner} organization={organization} />
      {organization.events.length === 0 ? (
        <EventNotFound isOwner={isOwner} />
      ) : (
        <div className="p-24 flex flex-col gap-4">
          {sortedEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
      {isOwner && (
        <OrganizationMenu
          organizationId={organization.id}
          events={organization.events}
        />
      )}
    </div>
  );
}
