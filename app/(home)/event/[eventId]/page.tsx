import { getEventById } from "@/data/event";
import { useCurrentUser } from "@/hooks/use-current-user";
import { redirect } from "next/navigation";
import { EventIdHeader } from "./_components/event-id-header";
import { EventMenu } from "./_components/event-menu";
import { EventDetail } from "./_components/event-detail";
import { ItemNotFound } from "./_components/item-not-found";

export default async function EventIdPage({
  params,
}: {
  params: { eventId: string };
}) {
  const eventId = params.eventId;
  const event = await getEventById(eventId);
  const user = await useCurrentUser();

  if (!user) {
    return redirect("/");
  }

  if (!event) {
    return redirect(`/event`);
  }

  const isOnGoing =
    event.endDate > new Date() && event.startDate < new Date();

  if (!isOnGoing || event.isOver) {
    return redirect(`/organization/${event.organizationId}`);
  }

  const isOwner = event.organization.userId === user?.id;

  return (
    <div className="relative h-full">
      <EventIdHeader
        user={user}
        isOnGoing={isOnGoing}
        endDate={event.endDate}
      />
      {isOwner && <EventMenu eventId={eventId} />}
      <EventDetail event={event} />
      {event.items.length === 0 ? <ItemNotFound isOwner={isOwner} /> : null}
    </div>
  );
}
