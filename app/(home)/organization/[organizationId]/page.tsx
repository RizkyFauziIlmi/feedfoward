import { getOrganizationById } from "@/data/organization";
import { OrganizationMenu } from "./_components/organization-menu";
import { useCurrentUser } from "@/hooks/use-current-user";
import { OrganizationIdNavbar } from "./_components/organization-id-navbar";
import { EventCard } from "./_components/event-card";
import { redirect } from "next/navigation";
import { EventNotFound } from "./_components/event-not-found";
import { sortingEvents } from "@/lib/date";

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

  const sortedEvents = sortingEvents(organization.events)

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
      {isOwner && <OrganizationMenu organizationId={organization.id} events={organization.events} />}
    </div>
  );
}
