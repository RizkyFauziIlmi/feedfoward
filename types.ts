import { Event, Item, Organization } from "@prisma/client";

export type OrganizationWithUserInfoAndEvents = ({
    user: {
        name: string | null;
        image: string | null;
    };
    events: Event[];
} & Organization);

type eventCount = {
    _count: {
        items: number;
        organization: number;
    }
}

export type OrganizationWithUserInfoAndEventsCount = ({
    user: {
        name: string | null;
        image: string | null;
    },
    events: eventCount[];
} & Organization);

export type EventWithOrgIdAndItems = ({
    organization: {
        userId: string
    };
    items: Item[];
} & Event)