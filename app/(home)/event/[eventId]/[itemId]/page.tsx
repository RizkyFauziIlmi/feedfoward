import { redirect } from "next/navigation";

export default async function ItemIdPage({
  params,
}: {
  params: { eventId: string };
}) {
  return redirect(`/event/${params.eventId}`);
}
