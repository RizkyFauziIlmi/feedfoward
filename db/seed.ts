import { ItemType, OrganizationType, PrismaClient } from "@prisma/client";
import { addDays } from "date-fns";
import {
  generateRandomCharityEventName,
  generateRandomFoodDescription,
  generateRandomGoogleMapsUrl,
  generateRandomItem,
  generateRandomOrganizationType,
} from "../db/random";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();

const main = async () => {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: "ADMIN"
      }
    });

    for (const user of users) {
      for (let i = 0; i < 5; i++) {
        // Seed Organization
        const organizationType = generateRandomOrganizationType();
        const organization = await prisma.organization.create({
          data: {
            name: faker.company.name(),
            imageUrl: faker.image.urlLoremFlickr({
              category: organizationType.toLowerCase(),
            }),
            userId: user.id,
            type: organizationType as OrganizationType,
            address: faker.location.streetAddress({ useFullAddress: true }),
            description: faker.company.catchPhrase(),
          },
        });

        for (let i = 0; i < 5; i++) {
          // Seed Event
          const event = await prisma.event.create({
            data: {
              name: generateRandomCharityEventName(),
              imageUrl: faker.image.urlLoremFlickr({ category: "event" }),
              address: faker.location.streetAddress({ useFullAddress: true }),
              googleMapsUrl: generateRandomGoogleMapsUrl(),
              description: faker.lorem.paragraph(),
              isOver: faker.datatype.boolean({ probability: 0.5 }),
              startDate: new Date(),
              endDate: addDays(
                new Date(),
                faker.number.int({ min: 1, max: 62 })
              ),
              organizationId: organization.id,
            },
          });

          for (let i = 0; i < 10; i++) {
            const { randomItemName, itemType } = generateRandomItem();
            // Seed Item
            await prisma.item.create({
              data: {
                name: randomItemName,
                stock: faker.number.int({ min: 10, max: 100 }),
                type: itemType as ItemType,
                description: generateRandomFoodDescription(itemType),
                maxBooking: faker.number.int({ min: 1, max: 10 }),
                imageUrl: faker.image.urlLoremFlickr({
                  category: randomItemName.toLowerCase(),
                }),
                isAvailable: faker.datatype.boolean({ probability: 0.5 }),
                eventId: event.id,
              },
            });
          }
        }
      }
    }
  } catch (error) {
    throw error;
  }
};

main().catch((err) => {
  console.warn("Error While generating Seed: \n", err);
});
