import { HeaderForm } from "@/components/header/header-form";
import { getEventById } from "@/data/event";
import { useCurrentUser } from "@/hooks/use-current-user";
import { checkEventDate } from "@/lib/date";
import { redirect } from "next/navigation";
import { EditEventForm } from "../_components/edit-event-form";

import { Metadata, ResolvingMetadata } from "next";
import { db } from "@/lib/db";

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
    title: `Edit Event - ${event?.name}`,
    description: event?.description,
  };
}

export default async function EventIdEditPage({
  params,
}: {
  params: { eventId: string };
}) {
  const user = await useCurrentUser();
  const eventId = params.eventId;
  const event = await getEventById(eventId);

  if (!event) {
    return redirect(`/event`);
  }

  const { isOver, notComeYet } = checkEventDate(event.startDate, event.endDate);

  const isOwner = event.organization.userId === user?.id;

  if (!isOwner) {
    return redirect(`/event/${event.id}`);
  }

  if (notComeYet || isOver || event.isOver) {
    return redirect(`/organization/${event.organizationId}`);
  }

  return (
    <div>
      <HeaderForm
        title="Edit Event"
        backLink={`/event/${event.id}`}
        routeName="edit"
        routeParentName={event.name}
      />
      <EditEventForm event={event} />
    </div>
  );
}
