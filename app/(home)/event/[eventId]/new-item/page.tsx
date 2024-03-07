import { HeaderForm } from "@/components/header/header-form";
import { getEventById } from "@/data/event";
import { getOrganizationById } from "@/data/organization";
import { useCurrentUser } from "@/hooks/use-current-user";
import { redirect } from "next/navigation";
import { NewItemForm } from "./_components/new-item-form";

export default async function NewItemPage({
  params,
}: {
  params: { eventId: string };
}) {
  const eventId = params.eventId;
  const user = await useCurrentUser();
  const event = await getEventById(eventId);

  if (!event) {
    return redirect(`/event`);
  }

  const isOnGoing =
    event.endDate > new Date() && event.startDate < new Date();

  if (!isOnGoing || event.isOver) {
    return redirect(`/organization/${event?.organizationId}`);
  }

  const isOwner = event.organization.userId === user?.id;

  if (!isOwner) {
    return redirect(`/event/${eventId}`);
  }

  return (
    <div>
      <HeaderForm
        title="Create Item"
        routeParentName={event.name}
        routeName="new item"
        backLink={`/event/${eventId}`}
      />
      <NewItemForm />
    </div>
  );
}
