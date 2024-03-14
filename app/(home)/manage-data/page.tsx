import { db } from "@/lib/db";
import { OrganizationTable } from "./_components/organization-table";
import { useCurrentUser } from "@/hooks/use-current-user";
import { organizationColumns } from "./_components/organization-columns";
import { EventTable } from "./_components/event-table";
import { eventColums } from "./_components/event-columns";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { MdAddHomeWork } from "react-icons/md";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Manage Data",
  description: "Manage your organizations and events",
};

export default async function ManageDataPage() {
  const user = await useCurrentUser();
  const organizations = await db.organization.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      events: true,
    },
  });

  const events = organizations
    .map((organization) => organization.events)
    .flat();

  return (
    <div className="p-7">
      <div className="flex items-center justify-between">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Organizations
        </h3>
        <Button asChild>
          <Link href="/organization/new-organization">
            <MdAddHomeWork className="w-4 h-4 mr-2" /> Create Organization
          </Link>
        </Button>
      </div>
      <OrganizationTable columns={organizationColumns} data={organizations} />
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Events
      </h3>
      <EventTable columns={eventColums} data={events} />
    </div>
  );
}
