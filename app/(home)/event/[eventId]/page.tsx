import { getEventById } from "@/data/event";
import { useCurrentUser } from "@/hooks/use-current-user";
import { redirect } from "next/navigation";
import { EventIdHeader } from "./_components/event-id-header";
import { EventMenu } from "./_components/event-menu";
import { EventDetail } from "./_components/event-detail";
import { ItemNotFound } from "./_components/item-not-found";
import { checkEventDate } from "@/lib/date";
import { EventIdContent } from "./_components/event-id-content";
import { db } from "@/lib/db";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { eventId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const eventId = params.eventId;

  // fetch data
  const event = await db.event.findUnique({
    where: {
      id: eventId,
    },
    select: {
      name: true,
      description: true,
    },
  });

  return {
    title: `Event - ${event?.name}`,
    description: event?.description,
  };
}

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

  const { isOnGoing, isOver, notComeYet } = checkEventDate(
    event.startDate,
    event.endDate
  );
  
  const isOwner = event.organization.userId === user?.id;
  
  if ((notComeYet || isOver || event.isOver) && !isOwner) {
    return redirect(`/organization/${event.organizationId}`);
  }

  return (
    <div className="relative h-full">
      <EventIdHeader
        user={user}
        isOnGoing={isOnGoing}
        isOver={isOver}
        isOverDb={event.isOver}
        isOwner={isOwner}
        notComeYet={notComeYet}
        startDate={event.startDate}
        endDate={event.endDate}
      />
      {isOwner && <EventMenu eventId={eventId} />}
      <EventDetail event={event} />
      {event.items.length === 0 ? (
        <ItemNotFound isOwner={isOwner} />
      ) : (
        <EventIdContent
          items={event.items}
          isOwner={isOwner}
          eventId={event.id}
        />
      )}
    </div>
  );
}
