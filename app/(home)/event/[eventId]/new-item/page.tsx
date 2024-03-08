import { HeaderForm } from "@/components/header/header-form";
import { getEventById } from "@/data/event";
import { useCurrentUser } from "@/hooks/use-current-user";
import { redirect } from "next/navigation";
import { NewItemForm } from "./_components/new-item-form";
import { checkEventDate } from "@/lib/date";

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

  const { notComeYet, isOver } = checkEventDate(event.startDate, event.endDate);

  if (notComeYet || isOver || event.isOver) {
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
      <NewItemForm eventId={eventId} />
    </div>
  );
}
