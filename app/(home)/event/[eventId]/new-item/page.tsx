import { HeaderForm } from "@/components/header/header-form";
import { getEventById } from "@/data/event";
import { useCurrentUser } from "@/hooks/use-current-user";
import { redirect } from "next/navigation";
import { NewItemForm } from "./_components/new-item-form";
import { checkEventDate } from "@/lib/date";
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
    title: `Add Item - ${event?.name}`,
    description: event?.description,
  };
}

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

  const isOwner = event.organization.userId === user?.id;

  if (!isOwner) {
    return redirect(`/event/${eventId}`);
  }

  if ((notComeYet || isOver || event.isOver) && !isOwner) {
    return redirect(`/organization/${event?.organizationId}`);
  }  

  return (
    <div>
      <HeaderForm
        title="Add Item"
        routeParentName={event.name}
        routeName="new item"
        backLink={`/event/${eventId}`}
      />
      <NewItemForm eventId={eventId} />
    </div>
  );
}
