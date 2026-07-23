import { faker } from "@faker-js/faker";

export const getRandomDateBetween = (
    from: Date,
    to: Date
) => {
    return faker.date.between({
        from,
        to,
    });
};