import { HeaderForm } from "@/components/header/header-form";
import { getEventById } from "@/data/event";
import { getItemById } from "@/data/item";
import { useCurrentUser } from "@/hooks/use-current-user";
import { checkEventDate } from "@/lib/date";
import { redirect } from "next/navigation";
import { EditItemForm } from "../_components/edit-item-form";

export default async function EditItemPage({
  params,
}: {
  params: { eventId: string; itemId: string };
}) {
  const user = await useCurrentUser();
  const eventId = params.eventId;
  const itemId = params.itemId;
  const event = await getEventById(eventId);

  if (!event) {
    return redirect(`/event`);
  }

  const item = event.items.find((item) => item.id === itemId);

  if (!item) {
    return redirect(`/event/${event.id}`);
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
            backLink={`/event/${event.id}`}
            title="Edit Item"
            routeName="edit"
            routeParentName={item.name}
        />
        <EditItemForm item={item} />
    </div>
  );
}
