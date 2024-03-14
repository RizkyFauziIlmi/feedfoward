import { db } from "@/lib/db";
import { ExploreNavbar } from "./_components/explore-navbar";
import { OrganizationType } from "@prisma/client";
import { format } from "date-fns";
import { Metadata } from "next";
import { ExploreContent } from "./_components/explore-content";
import { ExplorePagination } from "./_components/explore-pagination";

export const metadata: Metadata = {
  title: "Explore",
  description: "Explore events and organizations",
};

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const search = (searchParams["search"] as string) || "";
  const organizationType =
    (searchParams["organizationType"] as string) || "all";
  const sortingMethod = (searchParams["sort"] as string) || "";
  const fromDateString = searchParams["from"] as string;
  const toDateString = searchParams["to"] as string;
  const page = parseInt(searchParams["page"] as string) || 1;

  const pageSize = 9;
  const skip = (page - 1) * pageSize;

  const organizations = await db.organization.findMany({
    skip,
    take: pageSize,
    where: {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          events: {
            some: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
        },
      ],
      events: {
        some: {
          startDate: {
            gte: fromDateString
              ? new Date(fromDateString)
              : new Date("1-01-01"),
          },
          endDate: {
            lte: toDateString ? new Date(toDateString) : new Date("9999-01-01"),
          },
        },
      },
      type:
        organizationType.toUpperCase() === "ALL"
          ? undefined
          : (organizationType.toUpperCase() as OrganizationType),
    },
    orderBy: {
      createdAt: sortingMethod === "newest" ? "desc" : undefined,
      updatedAt: sortingMethod === "last-updated" ? "desc" : undefined,
      name: sortingMethod === "alphabetical" ? "asc" : undefined,
    },
    include: {
      events: {
        take: 5,
      },
      user: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });

  const organizationCount = await db.organization.count({
    where: {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          events: {
            some: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
        },
      ],
      events: {
        some: {
          startDate: {
            gte: fromDateString
              ? new Date(fromDateString)
              : new Date("1-01-01"),
          },
          endDate: {
            lte: toDateString ? new Date(toDateString) : new Date("9999-01-01"),
          },
        },
      },
      type:
        organizationType.toUpperCase() === "ALL"
          ? undefined
          : (organizationType.toUpperCase() as OrganizationType),
    },
  });

  const totalPages = Math.ceil(organizationCount / pageSize);

  return (
    <div className="p-6">
      <ExploreNavbar />
      <ExploreContent organizations={organizations} />
      <ExplorePagination totalPages={totalPages} />
    </div>
  );
}
