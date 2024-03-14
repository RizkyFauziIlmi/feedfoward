import { OrganizatonsWithEventsAndUserInfo } from "@/types";
import { OrganizationExploreCard } from "./organization-explore-card";
import { EventExploreCard } from "./event-explore-card";
import { useCurrentUser } from "@/hooks/use-current-user";
import { redirect } from "next/navigation";
import { FilterNotFound } from "./filter-not-found";

interface ExploreContentProps {
  organizations: OrganizatonsWithEventsAndUserInfo;
}

export const ExploreContent = async ({
  organizations,
}: ExploreContentProps) => {
  const user = await useCurrentUser();

  if (organizations.length === 0) {
    return <FilterNotFound />
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
      {organizations.map((organization) => {
        const isOwner = organization.userId === user?.id;
        return (
          <div key={organization.id} className="flex flex-col gap-2">
            <OrganizationExploreCard
              organization={organization}
              isOwner={isOwner}
            />
            <EventExploreCard events={organization.events} isOwner={isOwner} />
          </div>
        );
      })}
    </div>
  );
};
