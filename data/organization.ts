import { db } from "@/lib/db";

export const getAllOrganizations = async (limit?: number) => {
  try {
    const organizations = await db.organization.findMany({
      take: limit,
      include: {
        user: {
          select: {
            image: true,
            name: true,
          },
        },
        events: {
          select: {
            _count: true,
          },
        },
      },
    });

    return organizations;
  } catch (error) {
    return null;
  }
};

export const getOrganizationsOrderByCreatedAt = async (
  method: "desc" | "asc",
  limit?: number
) => {
  try {
    const organizations = await db.organization.findMany({
      orderBy: {
        createdAt: method,
      },
      include: {
        user: {
          select: {
            image: true,
            name: true,
          },
        },
        events: {
          select: {
            _count: true,
          }
        },
      },
      take: limit,
    });

    return organizations;
  } catch (error) {
    return null;
  }
};

export const getOrganizationById = async (id: string) => {
  try {
    const organization = await db.organization.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            image: true,
            name: true,
          },
        },
        events: {
          orderBy: {
            startDate: "asc",
          },
        },
      },
    });

    return organization;
  } catch (error) {
    return null;
  }
};