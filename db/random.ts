import { OrganizationType } from "@prisma/client";

/**
 * Generates a random number within a specified range.
 * @param {number} min - The minimum value of the range.
 * @param {number} max - The maximum value of the range.
 * @returns {number} The generated random number.
 */
export const generateRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Generates a random organization name by combining a random adjective and noun.
 * @returns {string} The generated organization name.
 */
export const generateRandomOrganizationName = (): string => {
  const adjectives = [
    "Awesome",
    "Fantastic",
    "Innovative",
    "Creative",
    "Dynamic",
  ];
  const nouns = [
    "Solutions",
    "Technologies",
    "Enterprises",
    "Ventures",
    "Group",
  ];

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${randomAdjective} ${randomNoun}`;
};

/**
 * Generates a random organization description by combining a random adjective and noun.
 * @returns {string} The generated organization description.
 */
export const generateRandomOrganizationDescription = (): string => {
  const adjectives = [
    "Innovative",
    "Dynamic",
    "Sustainable",
    "Collaborative",
    "Empowering",
  ];
  const nouns = [
    "Solutions",
    "Technologies",
    "Enterprises",
    "Ventures",
    "Group",
  ];
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  return `We are an ${randomAdjective} ${randomNoun} that aims to make a positive impact on the world.`;
};

/**
 * Generates a random organization type by picking from the OrganizationType enum.
 * @returns {OrganizationType} The generated organization type.
 */
export const generateRandomOrganizationType = (): string => {
  const organizationTypes = ["PERSONAL", "HOTEL", "RESTAURANT"];
  const randomType =
    organizationTypes[Math.floor(Math.random() * organizationTypes.length)];
  return randomType as OrganizationType;
};

/**
 * Generates a random address by combining a random street number, street name, city, and country.
 * @returns {string} The generated address.
 */
export const generateRandomAddress = (): string => {
  const streetNumbers = ["123", "456", "789", "1011", "1213"];
  const streetNames = [
    "Main Street",
    "Park Avenue",
    "Oak Road",
    "Maple Lane",
    "Cedar Street",
  ];
  const cities = ["New York", "Los Angeles", "London", "Paris", "Tokyo"];
  const countries = [
    "United States",
    "United Kingdom",
    "France",
    "Japan",
    "Australia",
  ];

  const randomStreetNumber =
    streetNumbers[Math.floor(Math.random() * streetNumbers.length)];
  const randomStreetName =
    streetNames[Math.floor(Math.random() * streetNames.length)];
  const randomCity = cities[Math.floor(Math.random() * cities.length)];
  const randomCountry = countries[Math.floor(Math.random() * countries.length)];

  return `${randomStreetNumber} ${randomStreetName}, ${randomCity}, ${randomCountry}`;
};

/**
 * Generates a random charity event name by combining a random adjective and noun.
 * @returns {string} The generated charity event name.
 */
export const generateRandomCharityEventName = (): string => {
  const adjectives = [
    "Amazing",
    "Inspiring",
    "Heartwarming",
    "Impactful",
    "Empowering",
  ];
  const nouns = ["Hope", "Dreams", "Change", "Unity", "Compassion"];
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${randomAdjective} ${randomNoun} Charity Event`;
};

/**
 * Generates a random item name and its corresponding item type.
 * @returns An object containing the random item name and item type.
 */
export const generateRandomItem = () => {
  const itemTypes = ["FOOD", "DRINK", "OTHER"];
  const itemType = itemTypes[generateRandomNumber(0, itemTypes.length - 1)];
  let itemNames: string[];

  if (itemType.toLowerCase() === "food") {
    itemNames = ["Pizza", "Burger", "Pasta", "Salad", "Sushi", "Steak", "Tacos", "Ramen", "Curry", "Sandwich"];
  } else if (itemType.toLowerCase() === "drink") {
    itemNames = ["Coke", "Coffee", "Tea", "Juice", "Smoothie", "Milkshake", "Lemonade", "Iced Tea", "Hot Chocolate", "Mocktail"];
  } else {
    itemNames = ["Mug", "Coffee Bean", "Pen", "Notebook", "Keychain", "T-shirt", "Cap", "Sticker", "Tote Bag", "Phone Case"];
  }

  const randomItemName =
    itemNames[generateRandomNumber(0, itemNames.length - 1)];
  return { randomItemName, itemType };
};

/**
 * Generates a random image URL.
 * @returns {string} The generated image URL.
 */
export const generateRandomImageUrl = (): string => {
  const randomImageUrl = "https://source.unsplash.com/featured/300x201";
  return randomImageUrl;
};

/**
 * Generates a random event description.
 * @returns A string representing the randomly generated event description.
 */
export const generateRandomEventDescription = (): string => {
  const adjectives = [
    "Amazing",
    "Inspiring",
    "Heartwarming",
    "Impactful",
    "Empowering",
  ];
  const nouns = ["Hope", "Dreams", "Change", "Unity", "Compassion"];
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  return `Join us for an ${randomAdjective} ${randomNoun} event that aims to make a positive impact on the world.`;
};

/**
 * Generates a random food description based on the given food type.
 * @param {string} foodType - The type of food (FOOD, DRINK, or OTHER).
 * @returns {string} The generated food description.
 */
export const generateRandomFoodDescription = (foodType: string): string => {
  let foodDescription: string;
  if (foodType.toLowerCase() === "food") {
    const foodAdjectives = [
      "Delicious",
      "Tasty",
      "Savory",
      "Mouthwatering",
      "Flavorful",
    ];
    const foodNouns = ["Dish", "Meal", "Cuisine", "Specialty", "Recipe"];
    const randomFoodAdjective =
      foodAdjectives[Math.floor(Math.random() * foodAdjectives.length)];
    const randomFoodNoun =
      foodNouns[Math.floor(Math.random() * foodNouns.length)];
    foodDescription = `Try our ${randomFoodAdjective} ${randomFoodNoun}!`;
  } else if (foodType.toLowerCase() === "drink") {
    const drinkAdjectives = [
      "Refreshing",
      "Thirst-quenching",
      "Exhilarating",
      "Invigorating",
      "Revitalizing",
    ];
    const drinkNouns = [
      "Beverage",
      "Drink",
      "Refresher",
      "Cocktail",
      "Smoothie",
    ];
    const randomDrinkAdjective =
      drinkAdjectives[Math.floor(Math.random() * drinkAdjectives.length)];
    const randomDrinkNoun =
      drinkNouns[Math.floor(Math.random() * drinkNouns.length)];
    foodDescription = `Enjoy our ${randomDrinkAdjective} ${randomDrinkNoun}!`;
  } else {
    foodDescription = "Explore our unique selection of items!";
  }
  return foodDescription;
};

/**
 * Generates a random Google Maps URL with a shuffled ID.
 * @returns {string} The generated Google Maps URL.
 */
export const generateRandomGoogleMapsUrl = (): string => {
  const ids = [
    "yktwDDgod5eiJrBJA",
    "dodae5ZQi5o5GKT98",
    "rtJenPpEgNiyvvpKA",
    "deNkJ4qqZSwWJ2xa9",
    "tv9Dhui8UMxC1rh79",
    "F2Kati3Yb9ir3srV9",
    "Fwq3Lb2H1DsmfQvFA",
  ];
  const randomId = ids[Math.floor(Math.random() * ids.length)];
  return `https://maps.app.goo.gl/${randomId}`;
};
