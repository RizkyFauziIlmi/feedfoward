import {
  getAllOrganizations,
  getOrganizationsOrderByCreatedAt,
} from "@/data/organization";
import { OrganizationCard } from "./organization-card";
import { Suspense } from "react";
import { redirect } from "next/navigation";

export const OrganizationContent = async () => {
  const organizations = await getAllOrganizations(8);
  const newerOrganizations = await getOrganizationsOrderByCreatedAt("desc", 8);

  if (!organizations || !newerOrganizations) { 
    redirect("/organization");
  }

  return (
    <div className="p-6">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-2">
        Discover
      </h3>
      <Suspense fallback={<p>loading...</p>}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {organizations?.map((organization) => (
            <OrganizationCard
              key={organization.id}
              organization={organization}
            />
          ))}
        </div>
      </Suspense>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-2 mt-6">
        What's New?
      </h3>
      <Suspense fallback={<p>loading 2...</p>}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {newerOrganizations?.map((organization) => (
            <OrganizationCard
              key={organization.id}
              organization={organization}
            />
          ))}
        </div>
      </Suspense>
    </div>
  );
};
