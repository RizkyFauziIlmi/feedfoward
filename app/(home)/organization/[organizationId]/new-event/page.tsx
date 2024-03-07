import { getOrganizationById } from "@/data/organization";
import { useCurrentUser } from "@/hooks/use-current-user";
import { redirect } from "next/navigation";
import { NewEventForm } from "./_components/new-event-form";
import { Metadata } from "next";
import { HeaderForm } from "@/components/header/header-form";

export const metadata: Metadata = {
  title: "Create Event",
};

export default async function NewEventPage({
  params,
}: {
  params: { organizationId: string };
}) {
  const user = await useCurrentUser();
  const organizationId = params.organizationId;
  const organization = await getOrganizationById(organizationId);

  const isOwner = organization?.userId === user?.id;

  if (!organization) {
    return redirect("/organization");
  }

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
